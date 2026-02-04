# Watan Logistics 🚛
**Mastering the Art of Seamless Transportation.**

Watan Logistics Inc is a premier provider of dispatch and freight management services. This platform is a comprehensive full-stack solution designed to streamline fleet operations, driver management, and logistics visibility.

---

## 🚀 Key Features
* **Fleet Management Dashboard:** Real-time visibility into all fleet assets, including truck details, plates, and VIN tracking.
* **Driver Portfolio:** Dedicated pages for driver management and identity verification.
* **Modern UI/UX:** Responsive landing page with clear "Join Us" and "Services" calls-to-action.
* **Cloud Media Storage:** Professional handling of truck and driver images using Amazon S3.
* **Secure Operations:** Role-based access for admins and team members.

---

## 🛠️ Tech Stack
This project is built using a modern full-stack architecture:

### **Frontend**
* **Framework:** Next.js (React)
* **Styling:** Tailwind CSS & Framer Motion for animations
* **Language:** TypeScript
* **Deployment:** Vercel

### **Backend**
* **Framework:** Django (Python)
* **API:** Django Rest Framework (DRF)
* **Database:** PostgreSQL (deployed via Railway)
* **File Storage:** Amazon S3 (or Cloudinary)

---

## ⚙️ Getting Started

### Prerequisites
* Python 3.x
* Node.js (v18+)
* PostgreSQL

### Local Development Setup

#### 1. Backend Setup
```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
