import { useState, useEffect } from 'react';
import { apiFetch, BASE_URL } from '../api';
import '../styles/CheckAssignment.css';

const CheckAssignment = () => {
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [grading, setGrading] = useState({}); // { [submissionId]: { score, feedback, loading, error, success } }
  const [viewingCode, setViewingCode] = useState(null); // { code, student }

  useEffect(() => {
    const fetchAssignmentsAndSubmissions = async () => {
      try {
        setLoading(true);
        setError('');
        // Fetch all courses
        const courses = await apiFetch('/api/courses/');
        // Fetch assignments for each course
        const allAssignments = [];
        for (const course of courses) {
          try {
            const courseAssignments = await apiFetch(`/api/assignments/${course.code}/`);
            allAssignments.push(...courseAssignments);
          } catch (err) {}
        }
        // For each assignment, fetch submissions
        const assignmentsWithSubs = await Promise.all(
          allAssignments.map(async (a) => {
            let submissions = [];
            try {
              submissions = await apiFetch(`/api/submissions/by-assignment/?assignment=${a.id}`);
            } catch {}
            return { ...a, submissions };
          })
        );
        setAssignments(assignmentsWithSubs);
      } catch (err) {
        setError('Failed to load assignments or submissions.');
      } finally {
        setLoading(false);
      }
    };
    fetchAssignmentsAndSubmissions();
  }, []);

  const formatDate = (dateString) => new Date(dateString).toLocaleString();

  const handleGrade = async (submissionId, assignmentId, useAI = false) => {
    setGrading((prev) => ({
      ...prev,
      [submissionId]: { ...prev[submissionId], loading: true, error: '', success: '' },
    }));
    try {
      let payload;
      if (useAI) {
        payload = { use_ai: true };
      } else {
        const { score, feedback } = grading[submissionId] || {};
        payload = { score, feedback };
      }
      const res = await apiFetch(`/api/grade/${submissionId}/`, {
        method: 'POST',
        body: JSON.stringify(payload),
      });
      setGrading((prev) => ({
        ...prev,
        [submissionId]: { ...prev[submissionId], loading: false, error: '', success: 'Graded!' },
      }));
      // Refetch assignments/submissions after grading
      setTimeout(() => window.location.reload(), 900);
    } catch (err) {
      let msg = 'Failed to grade.';
      try {
        const data = JSON.parse(err.message);
        if (typeof data === 'object') {
          msg = Object.entries(data).map(([k, v]) => `${k}: ${Array.isArray(v) ? v.join(', ') : v}`).join(' | ');
        }
      } catch {}
      setGrading((prev) => ({
        ...prev,
        [submissionId]: { ...prev[submissionId], loading: false, error: msg, success: '' },
      }));
    }
  };

  const handleInputChange = (submissionId, field, value) => {
    setGrading((prev) => ({
      ...prev,
      [submissionId]: { ...prev[submissionId], [field]: value },
    }));
  };

  return (
    <div className="check-assignment-container">
      <h2 className="check-assignment-title">Check Assignments</h2>
      {loading ? (
        <div className="check-assignment-loading">Loading...</div>
      ) : error ? (
        <div className="check-assignment-error">{error}</div>
      ) : assignments.length === 0 ? (
        <div className="check-assignment-empty">No assignments found.</div>
      ) : (
        <div className="check-assignment-list">
          {assignments.map((a) => (
            <div key={a.id} className="check-assignment-card">
              <div className="check-assignment-header">
                <span className="check-assignment-title-main">{a.title}</span>
                <span className="check-assignment-course">{a.course.name} ({a.course.code})</span>
              </div>
              <div className="check-assignment-instructions">{a.instructions}</div>
              <div className="check-assignment-submissions">
                <strong>Submissions:</strong>
                {a.submissions.length === 0 ? (
                  <div className="check-assignment-no-subs">No submissions yet.</div>
                ) : (
                  <div className="check-assignment-sub-list">
                    {a.submissions.map((s) => (
                      <div key={s.id} className="check-assignment-sub-card">
                        <div className="check-assignment-sub-row">
                          <span className="check-assignment-sub-student">{s.student}</span>
                          <span className={`check-assignment-sub-status ${s.status}`}>{s.status}</span>
                          <span className="check-assignment-sub-date">{formatDate(s.submitted_at)}</span>
                          {s.code_file && (
                            <a
                              className="check-assignment-view-btn"
                              href={s.code_file.startsWith('http') ? s.code_file : `${BASE_URL}${s.code_file}`}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              View File
                            </a>
                          )}
                          {s.code_text && (
                            <button
                              className="check-assignment-view-btn"
                              type="button"
                              onClick={() => setViewingCode({ code: s.code_text, student: s.student })}
                            >
                              View Code
                            </button>
                          )}
                        </div>
                        {s.is_graded ? (
                          <div className="check-assignment-graded">
                            <div><strong>Score:</strong> {s.score}</div>
                            <div><strong>Feedback:</strong> {s.feedback}</div>
                            <div><strong>Graded By:</strong> {s.status === 'graded' ? 'Lecturer/AI' : '-'}</div>
                          </div>
                        ) : (
                          <form
                            className="check-assignment-grade-form"
                            onSubmit={e => {
                              e.preventDefault();
                              handleGrade(s.id, a.id, false);
                            }}
                          >
                            <input
                              type="number"
                              min="0"
                              max={a.total_marks}
                              placeholder={`Score (max ${a.total_marks})`}
                              value={grading[s.id]?.score || ''}
                              onChange={e => handleInputChange(s.id, 'score', e.target.value)}
                              className="check-assignment-grade-input"
                              required
                            />
                            <input
                              type="text"
                              placeholder="Feedback"
                              value={grading[s.id]?.feedback || ''}
                              onChange={e => handleInputChange(s.id, 'feedback', e.target.value)}
                              className="check-assignment-grade-input"
                              required
                            />
                            <button
                              type="submit"
                              className="check-assignment-grade-btn"
                              disabled={grading[s.id]?.loading}
                            >
                              {grading[s.id]?.loading ? 'Grading...' : 'Grade'}
                            </button>
                            <button
                              type="button"
                              className="check-assignment-ai-btn"
                              onClick={() => handleGrade(s.id, a.id, true)}
                              disabled={grading[s.id]?.loading}
                            >
                              {grading[s.id]?.loading ? 'AI Grading...' : 'AI Grade'}
                            </button>
                            {grading[s.id]?.error && <div className="check-assignment-grade-error">{grading[s.id].error}</div>}
                            {grading[s.id]?.success && <div className="check-assignment-grade-success">{grading[s.id].success}</div>}
                          </form>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
      {viewingCode && (
        <div className="check-assignment-modal" onClick={() => setViewingCode(null)}>
          <div className="check-assignment-modal-content" onClick={e => e.stopPropagation()}>
            <h4>Code Submission ({viewingCode.student})</h4>
            <pre className="check-assignment-modal-pre">{viewingCode.code}</pre>
            <button className="check-assignment-modal-close" onClick={() => setViewingCode(null)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CheckAssignment; 