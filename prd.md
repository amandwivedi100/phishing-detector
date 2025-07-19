
````markdown
# AI-Powered Phishing Detection Dashboard with Gmail Integration

## 1. Overview

This web application allows users to log in via Gmail and view a dashboard of their latest emails. Each email is automatically analyzed by a local AI phishing detection model hosted on the developer’s own machine. The model classifies each email as **green (safe)**, **orange (suspicious)**, or **red (phishing)** and displays the result with reasons on the dashboard. All email data and classifications are stored in MongoDB Atlas.

## 2. Goals

- Allow secure user authentication using **Google OAuth2**
- Access and display a user’s **latest Gmail messages**
- Automatically **analyze emails** with a self-hosted AI model
- Provide clear **color-coded classification** and reasoning
- Persist all data in a secure **MongoDB Atlas database**
- Ensure the system is **scalable, private, and explainable**

## 3. Core Features

### 🔐 Gmail Login & Google Verification

- Use **OAuth2** via Google Cloud Console
- Enable **Gmail API** with `https://www.googleapis.com/auth/gmail.readonly` scope
- Implement login with `passport-google-oauth20`
- No Google verification needed if the app is for internal/private use only

### 📨 Email Access

- Use Gmail API to:
  - Fetch latest messages
  - Parse subject, sender, timestamp, body, and attachments
- Use polling or Gmail push notifications to detect new emails

### 🧠 AI Model Classification

- Each email is sent to the local AI model hosted on the developer’s machine:
  - Endpoint: `http://your-local-ai-server.com/classify`
- The server returns:
  ```json
  {
    "status": "red",
    "reason": "Malicious link: http://fake-bank.com",
    "confidence": 92
  }
````

#### Classification Labels:

* 🟢 **Green**: No phishing signals detected
* 🟠 **Orange**: Suspicious elements (e.g., obfuscated links, spoofed domains), but not confidently phishing
* 🔴 **Red**: Confirmed phishing, malicious content or links detected

### 🖥️ React Dashboard

* User interface shows:

  * Gmail profile information
  * Table or grid view of emails
  * Color-coded phishing status (green/orange/red)
  * Explanation/reason for flagged emails
  * Detailed email view on click

### 🛢️ MongoDB Atlas Storage

* Collections:

  * `users`: stores Gmail ID, profile name, etc.
  * `emails`: stores subject, sender, body, timestamp, phishing status, reason
  * (Optional) `logs`: for audit trails, alerts, or monitoring

## 4. Non-Functional Requirements

* Classification time per email: < 1 second
* Secure handling of OAuth tokens and user data
* Scales to 1000+ emails per user
* Reasonable and explainable phishing judgments

## 5. Tech Stack

| Component    | Stack                                     |
| ------------ | ----------------------------------------- |
| Frontend     | React + Tailwind CSS or Material UI       |
| Backend API  | Node.js + Express                         |
| Auth & Gmail | Google OAuth2 + Gmail API                 |
| AI Model     | Python (Flask or FastAPI), hosted locally |
| Database     | MongoDB Atlas                             |
| Tunneling    | Ngrok / LocalTunnel / Dynamic DNS         |

## 6. Success Metrics

* ✅ Login success rate: ≥ 95%
* ✅ Email fetch accuracy: ≥ 98%
* ✅ Phishing classification accuracy: ≥ 90%
* ✅ AI model response time: ≤ 1 second
* ✅ False positive rate on clean emails: < 5%

```

```
