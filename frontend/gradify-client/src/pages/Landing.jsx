import { useNavigate } from 'react-router-dom';
import { FaCloudUploadAlt, FaCalendarAlt, FaChartBar } from 'react-icons/fa';
import Footer from '../components/Footer';

function Landing() {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-blue-50 via-blue-100 to-blue-200 dark:from-blue-950 dark:via-blue-900 dark:to-blue-800 transition-colors duration-500">
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center flex-1 min-h-[90vh] text-center px-4 relative">
        <h1 className="text-4xl md:text-6xl font-extrabold text-blue-700 dark:text-blue-300 mb-4 drop-shadow-sm transition-colors">Welcome to Gradify</h1>
        <p className="text-lg md:text-2xl text-blue-900 dark:text-blue-200 mb-8 max-w-2xl mx-auto transition-colors">
          Finally, a better way for students and lecturers to manage assignments.
        </p>
        <button
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full shadow-lg transition-all duration-200 text-lg"
          onClick={() => navigate('/register')}
        >
          Get Started
        </button>
      </section>

      {/* Problem Section */}
      <section className="w-full py-12 px-4 bg-white dark:bg-blue-950 transition-colors">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-blue-700 dark:text-blue-200 mb-3">Assignment chaos is real.</h2>
          <p className="text-base md:text-lg text-blue-900 dark:text-blue-300">
            From missed deadlines to disorganized submissions, traditional systems fail students and lecturers alike. Gradify fixes that.
          </p>
        </div>
      </section>

      {/* Features Section */}
      <section className="w-full py-14 px-4 bg-gradient-to-r from-blue-100 via-blue-50 to-blue-200 dark:from-blue-900 dark:via-blue-950 dark:to-blue-800 transition-colors">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="rounded-2xl shadow-lg bg-white dark:bg-blue-950 p-8 flex flex-col items-center text-center hover:scale-105 hover:shadow-xl transition-all duration-200">
            <FaCloudUploadAlt className="text-4xl text-blue-500 mb-3" />
            <h3 className="font-bold text-lg text-blue-700 dark:text-blue-200 mb-2">Instant Uploads</h3>
            <p className="text-blue-900 dark:text-blue-300">No more email attachments. Just click and submit.</p>
          </div>
          <div className="rounded-2xl shadow-lg bg-white dark:bg-blue-950 p-8 flex flex-col items-center text-center hover:scale-105 hover:shadow-xl transition-all duration-200">
            <FaCalendarAlt className="text-4xl text-blue-500 mb-3" />
            <h3 className="font-bold text-lg text-blue-700 dark:text-blue-200 mb-2">Deadline Tracker</h3>
            <p className="text-blue-900 dark:text-blue-300">Visual timeline of all assignments and due dates.</p>
          </div>
          <div className="rounded-2xl shadow-lg bg-white dark:bg-blue-950 p-8 flex flex-col items-center text-center hover:scale-105 hover:shadow-xl transition-all duration-200">
            <FaChartBar className="text-4xl text-blue-500 mb-3" />
            <h3 className="font-bold text-lg text-blue-700 dark:text-blue-200 mb-2">Smart Feedback</h3>
            <p className="text-blue-900 dark:text-blue-300">Lecturers can comment, grade, and return in one interface.</p>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="w-full py-14 px-4 bg-white dark:bg-blue-950 transition-colors">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-10">
          {/* Left: Steps */}
          <div className="flex-1 flex flex-col gap-6">
            <h2 className="text-2xl md:text-3xl font-bold text-blue-700 dark:text-blue-200 mb-2">How It Works</h2>
            <ol className="list-decimal list-inside text-blue-900 dark:text-blue-300 text-lg space-y-2">
              <li><span className="font-semibold text-blue-700 dark:text-blue-200">Create an account</span></li>
              <li><span className="font-semibold text-blue-700 dark:text-blue-200">Submit or view assignments</span></li>
              <li><span className="font-semibold text-blue-700 dark:text-blue-200">Get feedback instantly</span></li>
            </ol>
          </div>
          {/* Right: Illustration */}
          <div className="flex-1 flex justify-center items-center">
            {/* SVG Placeholder */}
            <svg width="180" height="180" viewBox="0 0 180 180" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="180" height="180" rx="32" fill="#3B82F6" fillOpacity="0.12" />
              <rect x="40" y="60" width="100" height="60" rx="12" fill="#3B82F6" fillOpacity="0.25" />
              <rect x="60" y="80" width="60" height="20" rx="6" fill="#3B82F6" fillOpacity="0.5" />
              <rect x="75" y="90" width="30" height="6" rx="3" fill="#3B82F6" fillOpacity="0.8" />
            </svg>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="w-full py-12 px-4 bg-blue-700 dark:bg-blue-900 text-white text-center transition-colors">
        <h2 className="text-2xl md:text-3xl font-bold mb-4">Start your journey with Gradify — built for the modern student.</h2>
        <div className="flex flex-col md:flex-row gap-4 justify-center items-center mt-4">
          <button
            className="bg-white text-blue-700 font-bold py-3 px-8 rounded-full shadow-md hover:bg-blue-100 transition-all duration-200"
            onClick={() => navigate('/register')}
          >
            Register
          </button>
          <button
            className="bg-blue-600 hover:bg-blue-800 text-white font-bold py-3 px-8 rounded-full shadow-md transition-all duration-200"
            onClick={() => navigate('/login')}
          >
            Login
          </button>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default Landing;
