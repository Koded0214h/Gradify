# Gradify

A modern, full-stack platform for managing academic assignments, submissions, and grading for students and lecturers.

---

## 🚀 What is Gradify?

**Gradify** is a web application designed to streamline the process of assignment distribution, submission, and grading in academic environments. It provides role-based dashboards for students and lecturers, supports file/code uploads, AI-assisted grading, and offers a clean, mobile-friendly user experience.

---

## 🛠️ Tech Stack

- **Backend:** Django (Python 3), Django REST Framework
- **Frontend:** React (Vite), JavaScript (ES6+), CSS Modules
- **Database:** PostgreSQL (Neon)
- **Authentication:** Token-based (DRF Token Auth)
- **AI Grading:** Google Gemini API (optional, for AI grading)
- **Deployment:** Backend on Render, Frontend on Vercel

---

## ✨ Features

- Student and Lecturer role-based authentication
- Dynamic dashboards for each role
- Assignment creation, submission, and grading
- File and code text uploads for assignments
- AI-assisted grading (for lecturers)
- Submission history and assignment status tracking
- Responsive, modern UI/UX
- Secure token authentication

---

## 📦 Project Structure

```
Gradify/
├── backend/                # Django backend
│   ├── core/               # Main app (models, views, serializers)
│   ├── backend/            # Django project settings
│   └── ...
├── frontend/
│   └── gradify-client/     # React frontend (Vite)
├── README.md
└── ...
```

---

## ⚡ Quickstart

### 1. Clone the Repository

```sh
git clone https://github.com/yourusername/gradify.git
cd gradify
```

### 2. Backend Setup (Django)

#### a. Create and activate a virtual environment
```sh
cd backend
python3 -m venv venv
source venv/bin/activate
```

#### b. Install dependencies
```sh
pip install -r requirements.txt
```

#### c. Set up environment variables
Create a `.env` file in `backend/` with:
```
SECRET_KEY=your-django-secret-key
DEBUG=False
DATABASE_URL=your-neon-postgres-url
GEMINI_API_KEY=your-gemini-api-key (optional, for AI grading)
```

#### d. Run migrations
```sh
python manage.py makemigrations
python manage.py migrate
```

#### e. Create a superuser (for admin access)
```sh
python manage.py createsuperuser
```

#### f. Start the backend server (for local dev)
```sh
python manage.py runserver
```

---

### 3. Frontend Setup (React)

```sh
cd frontend/gradify-client
npm install
```

#### a. Set up environment variables
Create a `.env` file in `frontend/gradify-client/` with:
```
VITE_API_BASE_URL=http://localhost:8000
```
(Or your deployed backend URL)

#### b. Start the frontend dev server
```sh
npm run dev
```

---

## 🌐 Deployment

- **Backend:** Deploy to [Render](https://render.com/) or any cloud provider supporting Django and PostgreSQL.
- **Frontend:** Deploy to [Vercel](https://vercel.com/) or [Netlify](https://www.netlify.com/).
- **Database:** Use [Neon](https://neon.tech/) for managed Postgres.

**Production Notes:**
- Set `DEBUG=False` and configure `ALLOWED_HOSTS` in Django settings.
- Use secure, production-ready environment variables.
- Configure CORS in Django to allow your frontend domain.
- Collect static files for Django (`python manage.py collectstatic`).

---

## 🔑 Environment Variables

### Backend (`backend/.env`)
- `SECRET_KEY` — Django secret key
- `DEBUG` — Set to `False` in production
- `DATABASE_URL` — Neon Postgres connection string
- `GEMINI_API_KEY` — (Optional) for AI grading

### Frontend (`frontend/gradify-client/.env`)
- `VITE_API_BASE_URL` — URL of your backend API

---

## 🧑‍💻 Contributing

1. Fork the repo and create a feature branch.
2. Make your changes and add tests if needed.
3. Open a pull request with a clear description.

---

## 📝 License

MIT License. See [LICENSE](LICENSE) for details.

---

## 🙋 FAQ / Troubleshooting

- **Registration/login issues?**
  - Ensure your backend is running and accessible from the frontend.
  - Check that your database schema matches the custom user model (no `username` column).
  - Make sure environment variables are set correctly.

- **AI grading not working?**
  - Ensure your Gemini API key is set in the backend `.env`.
  - Check backend logs for errors.

- **Static files not loading in production?**
  - Run `python manage.py collectstatic` and configure your static file host (e.g., Render static files, AWS S3).

---

## 📬 Contact

For questions, suggestions, or support, open an issue or contact the maintainer at [your-email@example.com]. 