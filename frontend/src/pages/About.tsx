import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function About() {
    const navigate = useNavigate();
  return (
    <>
      <Navbar />

      <main className="bg-gray-50 min-h-screen">
        <section className="max-w-7xl mx-auto px-8 py-16">

          {/* Heading */}
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold text-gray-800">
              About Expense Tracker
            </h1>

            <p className="mt-5 text-lg text-gray-500 max-w-3xl mx-auto">
              Expense Tracker is designed to make personal finance management
              simple, intuitive, and efficient. Whether you're tracking daily
              expenses or planning your monthly budget, we've got you covered.
            </p>
          </div>

          {/* About Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

            <div className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl hover:-translate-y-2 transition-all duration-300">
              <div className="text-5xl mb-5">🎯</div>

              <h2 className="text-2xl font-semibold text-gray-800 mb-3">
                Our Mission
              </h2>

              <p className="text-gray-500 leading-7">
                Help people develop better financial habits by making expense
                tracking simple, organized, and accessible.
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl hover:-translate-y-2 transition-all duration-300">
              <div className="text-5xl mb-5">💡</div>

              <h2 className="text-2xl font-semibold text-gray-800 mb-3">
                Why We Built It
              </h2>

              <p className="text-gray-500 leading-7">
                Managing finances shouldn't be complicated. Expense Tracker
                helps users monitor spending, save more, and make smarter
                financial decisions.
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl hover:-translate-y-2 transition-all duration-300">
              <div className="text-5xl mb-5">🚀</div>

              <h2 className="text-2xl font-semibold text-gray-800 mb-3">
                Future Vision
              </h2>

              <p className="text-gray-500 leading-7">
                We're continuously improving the platform with analytics,
                budgeting tools, reports, and AI-powered financial insights.
              </p>
            </div>

          </div>

          {/* Stats */}
          <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">

            <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
              <h2 className="text-4xl font-bold text-blue-600">100%</h2>
              <p className="mt-3 text-gray-600">Secure Authentication</p>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
              <h2 className="text-4xl font-bold text-blue-600">24/7</h2>
              <p className="mt-3 text-gray-600">Expense Tracking</p>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
              <h2 className="text-4xl font-bold text-blue-600">∞</h2>
              <p className="mt-3 text-gray-600">Unlimited Transactions</p>
            </div>

          </div>

          {/* CTA */}
          <div className="mt-20 text-center">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Take Control of Your Money Today
            </h2>

            <p className="text-gray-500 mb-8">
              Start tracking your expenses, build better financial habits,
              and achieve your goals with Expense Tracker.
            </p>

            <button onClick={()=>{navigate("/")}} className="cursor-pointer bg-blue-600 hover:bg-blue-700 transition text-white px-8 py-3 rounded-xl font-semibold shadow-lg">
              Get Started
            </button>
          </div>

        </section>
      </main>
    </>
  );
}