import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { apiFetch } from '../api';
import '../styles/Assignments.css';
import { useNavigate } from 'react-router-dom';

// AssignmentCard Component
const AssignmentCard = ({ assignment, onViewDetails, onSubmit }) => {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return '#101/ green';
      case 'pending':
        return '#f59e0b'; // amber
      default:
        return '#6b7280'; // gray
    }
  };

  const statusClass = `assignment-status-badge ${assignment.status}`;

  return (
    <div className="assignment-card">
      <div className="assignment-header">
        <div className="assignment-title-section">
          <h3 className="assignment-title">{assignment.title}</h3>
          <div className="assignment-course">
            {assignment.course.name} ({assignment.course.code})
          </div>
        </div>
        <div 
          className={statusClass}
        >
          {assignment.status}
        </div>
      </div>
      
      <div className="assignment-content">
        <p className="assignment-instructions">
          {assignment.instructions.length > 120
            ? `${assignment.instructions.substring(0, 120)}...` 
            : assignment.instructions
          }
        </p>
        
        <div className="assignment-meta">
          <div className="meta-item">
            <span className="meta-label">Total Marks:</span>
            <span className="meta-value">{assignment.total_marks}</span>
          </div>
          <div className="meta-item">
            <span className="meta-label">Due Date:</span>
            <span className="meta-value">{formatDate(assignment.due_date)}</span>
          </div>
        </div>
      </div>
      
      <div className="assignment-actions">
        <button 
          className="assignment-view-btn"
          onClick={() => onViewDetails(assignment)}
        >
          View Details
        </button>
        <button 
          className="assignment-submit-btn"
          onClick={() => onSubmit(assignment)}
          disabled={assignment.status === 'submitted' || assignment.status === 'graded'}
          style={assignment.status === 'submitted' || assignment.status === 'graded' ? { opacity: 0.5, cursor: 'not-allowed' } : {}}
        >
          Submit
        </button>
      </div>
    </div>
  );
};

const Assignments = () => {
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAssignments = async () => {
      try {
        setLoading(true);
        setError('');
        // Fetch all courses
        const response = await apiFetch('/api/courses/');
        const courses = response;
        // Fetch assignments for each course
        const allAssignments = [];
        for (const course of courses) {
          try {
            const courseAssignments = await apiFetch(`/api/assignments/${course.code}/`);
            allAssignments.push(...courseAssignments);
          } catch (err) {
            console.error(`Failed to fetch assignments for course ${course.code}:`, err);
          }
        }
        // Fetch student's submissions
        let submissions = [];
        try {
          submissions = await apiFetch('/api/submissions/');
        } catch (err) {
          console.error('Failed to fetch submissions:', err);
        }
        // Mark assignments as submitted if a submission exists
        const submittedAssignmentIds = new Set(submissions.map(s => s.assignment.id));
        const assignmentsWithStatus = allAssignments.map(a => {
          if (submittedAssignmentIds.has(a.id)) {
            return { ...a, status: 'submitted' };
          }
          return a;
        });
        setAssignments(assignmentsWithStatus);
      } catch (err) {
        setError('Failed to load assignments. Please try again.');
        console.error('Error fetching assignments:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchAssignments();
  }, []);

  const handleViewDetails = (assignment) => {
    // TODO: Navigate to assignment details page or show modal
    console.log('View details for assignment:', assignment);
  };

  const handleSubmit = (assignment) => {
    navigate(`/student/submit-assignment`, { state: { assignment } });
  };

  if (loading) {
    return (
      <div className="assignments-container">
        <h2 className="assignments-title">Assignments</h2>
        <div className="assignments-loading">Loading assignments...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="assignments-container">
        <h2 className="assignments-title">Assignments</h2>
        <div className="assignments-error">{error}</div>
      </div>
    );
  }

  return (
    <div className="assignments-container">
      <h2 className="assignments-title">Assignments</h2>
      
      {assignments.length === 0 ? (
        <div className="assignments-empty">
          <p>No assignments available at the moment.</p>
        </div>
      ) : (
        <div className="assignments-grid">
          {assignments.map((assignment) => (
            <AssignmentCard
              key={assignment.id}
              assignment={assignment}
              onViewDetails={handleViewDetails}
              onSubmit={handleSubmit}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Assignments;