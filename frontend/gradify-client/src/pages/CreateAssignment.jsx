import { useState, useEffect } from 'react';
import { apiFetch } from '../api';
import '../styles/CreateAssignment.css';

const CreateAssignment = () => {
  const [form, setForm] = useState({ title: '', instructions: '', total_marks: '', due_date: '', course: '' });
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const data = await apiFetch('/api/courses/');
        setCourses(data);
      } catch (err) {
        setCourses([]);
      }
    };
    fetchCourses();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess('');
    setError('');
    setLoading(true);
    try {
      const payload = {
        title: form.title,
        instructions: form.instructions,
        total_marks: parseInt(form.total_marks, 10),
        due_date: form.due_date,
        course: parseInt(form.course, 10),
      };
      await apiFetch('/api/assignments/create/', {
        method: 'POST',
        body: JSON.stringify(payload),
      });
      setSuccess('Assignment created successfully!');
      setForm({ title: '', instructions: '', total_marks: '', due_date: '', course: '' });
    } catch (err) {
      let msg = 'Failed to create assignment.';
      try {
        const data = JSON.parse(err.message);
        if (typeof data === 'object') {
          msg = Object.entries(data).map(([k, v]) => `${k}: ${Array.isArray(v) ? v.join(', ') : v}`).join(' | ');
        }
      } catch {}
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="create-assignment-container">
      <h2 className="create-assignment-title">Create Assignment</h2>
      <form onSubmit={handleSubmit} className="create-assignment-form">
        <div className="form-group">
          <label>Title</label>
          <input
            type="text"
            name="title"
            value={form.title}
            onChange={handleChange}
            required
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label>Instructions</label>
          <textarea
            name="instructions"
            value={form.instructions}
            onChange={handleChange}
            required
            className="form-input"
            rows={4}
          />
        </div>
        <div className="form-group">
          <label>Total Marks</label>
          <input
            type="number"
            name="total_marks"
            value={form.total_marks}
            onChange={handleChange}
            required
            className="form-input"
            min="1"
          />
        </div>
        <div className="form-group">
          <label>Due Date</label>
          <input
            type="datetime-local"
            name="due_date"
            value={form.due_date}
            onChange={handleChange}
            required
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label>Course</label>
          <select
            name="course"
            value={form.course}
            onChange={handleChange}
            required
            className="form-input"
          >
            <option value="">Select a course</option>
            {courses.map((c) => (
              <option key={c.id} value={c.id}>{c.name} ({c.code})</option>
            ))}
          </select>
        </div>
        {error && <div className="form-error">{error}</div>}
        {success && <div className="form-success">{success}</div>}
        <button type="submit" className="form-submit-btn" disabled={loading}>
          {loading ? 'Creating...' : 'Create'}
        </button>
      </form>
    </div>
  );
};

export default CreateAssignment; 