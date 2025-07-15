import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

// Mock Data
const courses = [
  { id: 1, title: 'Introduction to Algorithms', code: 'COS 106' },
  { id: 2, title: 'Linear Algebra', code: 'MTH 201' },
  { id: 3, title: 'Modern Physics', code: 'PHY 210' },
];

// Mocked student submissions per assignment
const mockSubmissions = {
  'Sorting Algorithms Report': [
    { student: 'Alice Smith', file: 'alice_sorting.pdf' },
    { student: 'Bob Lee', file: 'bob_sorting.docx' },
  ],
  'Matrix Transformations HW': [
    { student: 'Dana Fox', file: 'dana_matrix.pdf' },
    { student: 'Eli Zhang', file: 'eli_matrix.docx' },
  ],
};

function LecturerDashboard() {
  const { logout, user } = useAuth();
  const [assignments, setAssignments] = useState([
    { title: 'Sorting Algorithms Report', deadline: '2025-04-20', course: 'COS 106' },
    { title: 'Matrix Transformations HW', deadline: '2025-04-22', course: 'MTH 201' },
  ]);
  const [form, setForm] = useState({ title: '', deadline: '', course: '' });
  const [selectedAssignment, setSelectedAssignment] = useState(null);
  const [markingScheme, setMarkingScheme] = useState({ file: null, assignment: '' });
  const [markingSchemes, setMarkingSchemes] = useState([]);

  // Assignment creation
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };
  const handleAssignmentSubmit = (e) => {
    e.preventDefault();
    if (!form.title || !form.deadline) {
      alert('Title and deadline required');
      return;
    }
    setAssignments((prev) => [
      { title: form.title, deadline: form.deadline, course: form.course },
      ...prev,
    ]);
    setForm({ title: '', deadline: '', course: '' });
  };

  // Marking scheme upload
  const handleMarkingChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'file') {
      setMarkingScheme((prev) => ({ ...prev, file: files[0] }));
    } else {
      setMarkingScheme((prev) => ({ ...prev, [name]: value }));
    }
  };
  const handleMarkingSubmit = (e) => {
    e.preventDefault();
    if (!markingScheme.file || !markingScheme.assignment) {
      alert('Select assignment and upload a file');
      return;
    }
    setMarkingSchemes((prev) => [
      { ...markingScheme, fileName: markingScheme.file.name },
      ...prev,
    ]);
    setMarkingScheme({ file: null, assignment: '' });
    e.target.reset();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-blue-100 to-blue-200 dark:from-blue-950 dark:via-blue-900 dark:to-blue-800 transition-colors px-4 py-8 flex flex-col items-center">
      {/* Welcome Header */}
      <div className="w-full max-w-2xl text-center mb-8">
        <h1 className="text-3xl font-bold text-blue-700 dark:text-blue-200 mb-2">
          Welcome, {user?.name || "Lecturer"}
        </h1>
        <p className="text-blue-600 dark:text-blue-300">Role: {user?.role}</p>
      </div>

      {/* Assignment Creation */}
      <div className="w-full max-w-md bg-white dark:bg-blue-950 rounded-2xl shadow-lg p-8 mb-8">
        <h2 className="text-xl font-bold mb-4 text-blue-700 dark:text-blue-200">Create Assignment</h2>
        <form onSubmit={handleAssignmentSubmit} className="flex flex-col gap-4">
          <label>Title</label>
          <input
            type="text"
            name="title"
            value={form.title}
            onChange={handleFormChange}
            required
            className="rounded-lg border border-blue-200 dark:border-blue-800 px-4 py-2"
          />
          <label>Deadline</label>
          <input
            type="date"
            name="deadline"
            value={form.deadline}
            onChange={handleFormChange}
            required
            className="rounded-lg border border-blue-200 dark:border-blue-800 px-4 py-2"
          />
          <label>Course (optional)</label>
          <select
            name="course"
            value={form.course}
            onChange={handleFormChange}
            className="rounded-lg border border-blue-200 dark:border-blue-800 px-4 py-2"
          >
            <option value="">-- Select Course --</option>
            {courses.map((c) => (
              <option key={c.code} value={c.code}>{c.title} ({c.code})</option>
            ))}
          </select>
          <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 rounded-lg transition-colors">Create</button>
        </form>
            </div>

      {/* Uploaded Submissions Viewer */}
      <div className="w-full max-w-2xl bg-white dark:bg-blue-950 rounded-2xl shadow-lg p-8 mb-8">
        <h2 className="text-xl font-bold mb-4 text-blue-700 dark:text-blue-200">Uploaded Submissions</h2>
        <div className="mb-4">
          <label>Select Assignment: </label>
          <select
            value={selectedAssignment || ''}
            onChange={e => setSelectedAssignment(e.target.value)}
            className="rounded-lg border border-blue-200 dark:border-blue-800 px-2 py-1"
          >
            <option value="">-- Select Assignment --</option>
            {assignments.map((a) => (
              <option key={a.title} value={a.title}>{a.title}</option>
            ))}
          </select>
        </div>
        {selectedAssignment && mockSubmissions[selectedAssignment] ? (
          <table className="w-full text-left">
            <thead>
              <tr className="text-blue-700 dark:text-blue-200 text-sm">
                <th className="py-2 px-2">Student Name</th>
                <th className="py-2 px-2">File Name</th>
              </tr>
            </thead>
            <tbody>
              {mockSubmissions[selectedAssignment].map((sub, idx) => (
                <tr key={idx} className="border-t border-blue-100 dark:border-blue-900 text-blue-900 dark:text-blue-100 text-sm">
                  <td className="py-2 px-2 font-medium">{sub.student}</td>
                  <td className="py-2 px-2">{sub.file}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="text-blue-900 dark:text-blue-100">No submissions for this assignment.</div>
        )}
        </div>

      {/* Upload Marking Scheme */}
      <div className="w-full max-w-md bg-white dark:bg-blue-950 rounded-2xl shadow-lg p-8 mb-8">
        <h2 className="text-xl font-bold mb-4 text-blue-700 dark:text-blue-200">Upload Marking Scheme</h2>
        <form onSubmit={handleMarkingSubmit} className="flex flex-col gap-4">
          <label>Assignment</label>
          <select
            name="assignment"
            value={markingScheme.assignment}
            onChange={handleMarkingChange}
            required
            className="rounded-lg border border-blue-200 dark:border-blue-800 px-4 py-2"
          >
            <option value="">-- Select Assignment --</option>
            {assignments.map((a) => (
              <option key={a.title} value={a.title}>{a.title}</option>
            ))}
          </select>
          <label>Upload File (.doc, .pdf)</label>
                      <input
            type="file"
            name="file"
            accept=".pdf,.doc,.docx"
            onChange={handleMarkingChange}
            required
            className="rounded-lg border border-blue-200 dark:border-blue-800 px-4 py-2"
          />
          <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 rounded-lg transition-colors">Upload</button>
        </form>
        {/* List uploaded marking schemes (mock) */}
        {markingSchemes.length > 0 && (
          <div className="mt-4">
            <h4 className="font-bold mb-2 text-blue-700 dark:text-blue-200">Uploaded Marking Schemes</h4>
            <ul className="list-disc pl-5">
              {markingSchemes.map((ms, idx) => (
                <li key={idx} className="text-blue-900 dark:text-blue-100">
                  {ms.assignment}: {ms.fileName}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Logout Button */}
      <button
        className="self-end mb-4 bg-blue-600 hover:bg-blue-800 text-white font-bold py-2 px-6 rounded-lg shadow-md transition-colors"
        onClick={logout}
      >
        Logout
      </button>

      {/* Page Heading */}
      <h1 className="text-3xl md:text-4xl font-extrabold text-blue-700 dark:text-blue-200 mb-2 text-center">Lecturer Dashboard</h1>
      <div className="text-lg text-blue-900 dark:text-blue-100 mb-8 text-center w-full">Welcome back, <span className="font-bold text-blue-700 dark:text-blue-200">{role ? role.charAt(0).toUpperCase() + role.slice(1) : ''}</span></div>
    </div>
  );
}

export default LecturerDashboard;
   