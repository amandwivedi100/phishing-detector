from transformers import AutoTokenizer, AutoModelForSequenceClassification
from flask import Flask, request, jsonify
import torch

app = Flask(__name__)

model_name = "cybersectony/phishing-email-detection-distilbert_v2.4.1"
tokenizer = AutoTokenizer.from_pretrained(model_name)
model = AutoModelForSequenceClassification.from_pretrained(model_name)

# Custom reason inference engine (heuristics)
def infer_reason(subject, body, sender, prediction):
    reasons = []

    # Heuristics
    content = (subject + " " + body).lower()

    if prediction == "phishing_url" or prediction == "phishing_url_alt":
        reasons.append("Contains a suspicious or shortened link")
    if "update" in content or "verify" in content or "suspend" in content:
        reasons.append("Contains urgent or suspicious language")
    if "http://" in content or "https://" in content:
        reasons.append("Contains hyperlinks")
    if sender and any(domain in sender for domain in ["@suspicious.com", "@fakebank.com"]):
        reasons.append("Sent from an untrusted domain")

    return reasons or ["No clear phishing patterns detected"]

@app.route("/classify", methods=["POST"])
def classify():
    data = request.json

    # Allow either a single dict or a list of dicts
    if isinstance(data, dict):
        email_list = [data]
    elif isinstance(data, list):
        email_list = data
    else:
        return jsonify({"error": "Invalid input format"}), 400

    results = []

    for item in email_list:
        subject = item.get("subject", "")
        body = item.get("snippet", "")
        # sender = item.get("from", "")
        text = subject + " " + body

        # Tokenize input
        inputs = tokenizer(
            text,
            return_tensors="pt",
            truncation=True,
            max_length=512
        )

        with torch.no_grad():
            outputs = model(**inputs)
            predictions = torch.nn.functional.softmax(outputs.logits, dim=-1)

        probs = predictions[0].tolist()

        labels = {
            "legitimate_email": probs[0],
            "phishing_url": probs[1],
            "legitimate_url": probs[2],
            "phishing_url_alt": probs[3]
        }

        max_label, confidence = max(labels.items(), key=lambda x: x[1])

        status = (
            "green" if "legitimate" in max_label
            else "red" if confidence > 0.9
            else "orange"
        )

        results.append({
            "status": status,
            "label": max_label,
            "confidence": round(confidence, 4),
            "all_probabilities": labels,
            "reason": infer_reason(subject, body, max_label)
        })

    return jsonify(results if len(results) > 1 else results[0])

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5001)
