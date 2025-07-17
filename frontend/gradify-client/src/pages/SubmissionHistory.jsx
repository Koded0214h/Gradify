import { useState, useEffect } from 'react';
import { apiFetch } from '../api';
import '../styles/SubmissionHistory.css';

const SubmissionHistory = () => {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchSubmissions = async () => {
      try {
        setLoading(true);
        setError('');
        const data = await apiFetch('/api/submissions/');
        setSubmissions(data);
      } catch (err) {
        setError('Failed to load submission history.');
      } finally {
        setLoading(false);
      }
    };
    fetchSubmissions();
  }, []);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString();
  };

  return (
    <div className="submission-history-container">
      <h2 className="submission-history-title">Submission History</h2>
      {loading ? (
        <div className="submission-history-loading">Loading...</div>
      ) : error ? (
        <div className="submission-history-error">{error}</div>
      ) : submissions.length === 0 ? (
        <div className="submission-history-empty">No submissions yet.</div>
      ) : (
        <div className="submission-history-list">
          {submissions.map((sub) => (
            <div key={sub.id} className="submission-history-card">
              <div className="submission-history-header">
                <span className="submission-history-assignment">{sub.assignment.title}</span>
                <span className={`submission-history-status ${sub.status}`}>{sub.status}</span>
              </div>
              <div className="submission-history-details">
                <div><strong>Course:</strong> {sub.assignment.course.name} ({sub.assignment.course.code})</div>
                <div><strong>Submitted:</strong> {formatDate(sub.submitted_at)}</div>
                <div><strong>Score:</strong> {sub.score !== null ? sub.score : 'Not graded yet'}</div>
                <div><strong>Feedback:</strong> {sub.feedback || 'No feedback yet'}</div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SubmissionHistory; 