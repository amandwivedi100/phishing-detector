# 📧 AI-Powered Phishing Detection Dashboard

A web application that connects to a user’s Gmail account, fetches incoming emails, and classifies each email using a local AI-powered phishing detection model. Emails are labeled as **Green (Safe)**, **Orange (Suspicious)**, or **Red (Phishing)**, with classification reasons displayed in a user-friendly dashboard. All data is stored securely in MongoDB Atlas.

---

## 🚀 Features

- 🔐 **Login with Gmail** using Google OAuth2
- 📥 **Fetch latest emails** with Gmail API
- 🧠 **Real-time phishing detection** via a local AI model
- 🟢🟠🔴 **Color-coded classification** (Green = Safe, Orange = Suspicious, Red = Phishing)
- 📊 **React dashboard** to view emails and detection results
- 🗃️ **Email storage** in MongoDB Atlas
- 💡 **Explainable AI** results: see why an email was flagged

---

## 🧱 Tech Stack

| Layer        | Technology                      |
|--------------|---------------------------------|
| Frontend     | React + Tailwind CSS
| Backend      | Node.js + Express               |
| Auth         | Google OAuth2 (passport.js)     |
| Email Access | Gmail API                       |
| AI Server    | Python (Flask or FastAPI {TBD})       |
| Database     | MongoDB Atlas                   |
| Tunneling    | Ngrok

---

## 🧠 AI Model Classification

The AI model classifies emails into:

- 🟢 **Green** – No signs of phishing
- 🟠 **Orange** – Suspicious elements like spoofed domains or obfuscated links
- 🔴 **Red** – Confirmed phishing with malicious links or intent

Each classification includes a **reason** and **confidence score**.

---

## 🔧 Setup Instructions

### 1. Clone the repo

```bash
git clone https://github.com/amandwivedi100/phishing-detector.git
cd phishing-detector
