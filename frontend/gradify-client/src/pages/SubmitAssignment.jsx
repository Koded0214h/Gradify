import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { apiFetch } from '../api';
import '../styles/SubmitAssignment.css';

const SubmitAssignment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const assignment = location.state?.assignment;
  const assignmentId = assignment?.id || '';
  const [file, setFile] = useState(null);
  const [codeText, setCodeText] = useState('');
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess('');
    setError('');
    if (!assignmentId) {
      setError('No assignment selected.');
      return;
    }
    if (!file && !codeText) {
      setError('Please upload a file or enter code text.');
      return;
    }
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('assignment', assignmentId);
      if (file) formData.append('code_file', file);
      if (codeText) formData.append('code_text', codeText);
      await apiFetch('/api/submit/', {
        method: 'POST',
        body: formData,
      });
      setSuccess('Assignment submitted successfully!');
      setFile(null);
      setCodeText('');
      setTimeout(() => {
        navigate('/student/assignments');
      }, 1200);
    } catch (err) {
      let msg = 'Submission failed.';
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
    <div className="submit-assignment-container">
      <h2 className="submit-assignment-title">Submit Assignment</h2>
      {assignment && (
        <div className="assignment-details-box">
          <h3 className="assignment-details-title">{assignment.title}</h3>
          <p className="assignment-details-desc">{assignment.instructions}</p>
        </div>
      )}
      <form className="submit-assignment-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Upload File</label>
          <input
            className="form-input"
            name="file"
            type="file"
            onChange={handleFileChange}
            accept=".txt,.py,.js,.java,.cpp,.c,.md,.json,.csv"
          />
        </div>
        <div className="form-group">
          <label>Or Paste Code</label>
          <textarea
            className="form-input"
            name="codeText"
            placeholder="Paste your code here..."
            value={codeText}
            onChange={e => setCodeText(e.target.value)}
            rows={7}
          />
        </div>
        {error && <div className="form-error">{error}</div>}
        {success && <div className="form-success">{success}</div>}
        <button className="form-submit-btn" type="submit" disabled={loading}>
          {loading ? 'Submitting...' : 'Submit Assignment'}
        </button>
      </form>
    </div>
  );
};

export default SubmitAssignment; 