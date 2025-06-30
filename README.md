# ⛪ Churchbot Frontend


This is the **frontend interface** for the [Churchbot](https://church-bot-mu.vercel.app/) – an intelligent chatbot designed to answer questions about your church. Built using [Next.js](https://nextjs.org) and styled with [shadcn/ui](https://ui.shadcn.dev), it communicates with a backend hosted on Hugging Face.

---

## 🚀 Features

- 💬 Chat interface styled like messaging apps
- 📥 "Import New Data" button to reload FAQ vector data
- 🧠 Connects to a Hugging Face-hosted chatbot backend
- 🔒 Secure API calls using environment variables
- ⚡ Optimized for both desktop and mobile views

---

## 🧰 Technologies Used

| Layer          | Tech Stack                                   |
|----------------|-----------------------------------------------|
| Framework      | [Next.js](https://nextjs.org)                |
| UI Components  | [shadcn/ui](https://ui.shadcn.dev)           |
| Styling        | Tailwind CSS                                 |
| HTTP Requests  | Axios                                         |
| Deployment     | [Vercel](https://vercel.com)                 |
| Backend API    | Hosted on Hugging Face Spaces (Docker SDK)   |

---
## 🌐 Live Demo
  👉 Try Churchbot Live [LIVE](https://church-bot-mu.vercel.app/)
## 🛠️ Getting Started

Clone this repo:

```bash
git clone https://github.com/YOUR_USERNAME/churchbot-frontend.git
cd churchbot-frontend
Install dependencies:
npm install
# or
yarn

Create a .env.local

npm run dev
