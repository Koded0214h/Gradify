# Gradify Backend

Gradify is a Django-based backend for a course management and assignment grading platform. It provides RESTful APIs for user registration, authentication, course management, assignment creation, and AI-powered code grading.

## Features

- **User Registration & Authentication** (Student & Lecturer roles)
- **Course Management** (Create, list, and manage courses)
- **Assignment Management** (Create, list, and manage assignments)
- **Submission Handling** (Students can submit code for assignments)
- **AI Grading Integration** (Integrate with Google Generative AI for code grading)
- **Token-based Authentication** (DRF Token Auth)
- **CORS Support** (for frontend integration)
- **Production-ready** (Configured for Render deployment with Neon Postgres)

---

## Tech Stack

- **Backend:** Django 5, Django REST Framework
- **Database:** Neon Postgres (via `DATABASE_URL`)
- **AI Integration:** Google Generative AI
- **Deployment:** Render.com
- **Other:** Gunicorn, dj-database-url

---

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/gradify-backend.git
cd gradify-backend/backend
```

### 2. Install Dependencies

It’s recommended to use a virtual environment:

```bash
python -m venv env
source env/bin/activate
pip install -r requirements.txt
```

### 3. Environment Variables

Create a `.env` file or set these variables in your Render dashboard:

- `DATABASE_URL` (Neon Postgres connection string)
- `GEMINI_API_KEY` (Google Generative AI API key)
- `DEBUG` (set to `False` in production)
- `ALLOWED_HOSTS` (comma-separated, e.g. `your-app-name.onrender.com`)

### 4. Run Migrations

```bash
python manage.py migrate
```

### 5. Create a Superuser (optional)

```bash
python manage.py createsuperuser
```

### 6. Run the Development Server

```bash
python manage.py runserver
```

---

## API Endpoints

### Authentication

- `POST /register/` — Register a new user
- `POST /login/` — Obtain auth token

### Courses

- `GET /courses/` — List all courses

### Assignments

- `GET /assignments/<course_code>/` — List assignments for a course
- `POST /assignments/create/` — Create a new assignment (lecturer only)

### Submissions

- `GET /submissions/` — List submissions for the logged-in user
- `POST /submit/` — Submit an assignment

---

## Deployment on Render

1. **Push your code to GitHub.**
2. **Create a new Web Service on [Render](https://render.com/):**
   - Connect your repo.
   - Set environment variables (`DATABASE_URL`, `GEMINI_API_KEY`, etc.).
   - Render will use the included `Procfile` and `render.yaml` for build/start commands.
3. **After deployment, run migrations from the Render shell:**
   ```bash
   python manage.py migrate
   ```

---

## Static Files

- Static files are collected to `/staticfiles` for production.
- Media uploads are stored in `/media`.

---

## License

This project is licensed under the MIT License.

---

## Acknowledgements

- [Django](https://www.djangoproject.com/)
- [Django REST Framework](https://www.django-rest-framework.org/)
- [Render](https://render.com/)
- [Neon](https://neon.tech/)
- [Google Generative AI](https://ai.google.dev/)
