import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function Features() {
    const navigate = useNavigate();
  const features = [
    {
      icon: "📊",
      title: "Dashboard Overview",
      description:
        "Monitor your balance, income, expenses, and recent transactions from one place.",
    },
    {
      icon: "💸",
      title: "Expense Tracking",
      description:
        "Quickly add, edit, and manage your daily expenses with ease.",
    },
    {
      icon: "📈",
      title: "Analytics",
      description:
        "Understand your spending habits with interactive charts and insights.",
    },
    {
      icon: "🎯",
      title: "Budget Planning",
      description:
        "Set monthly budgets and track your progress throughout the month.",
    },
    {
      icon: "🔒",
      title: "Secure Login",
      description:
        "JWT authentication keeps your account safe and secure.",
    },
    {
      icon: "⚡",
      title: "Fast & Responsive",
      description:
        "Optimized for desktop, tablet, and mobile devices.",
    },
  ];

  return (
    <>
      <Navbar />

      <main className="bg-gray-50 min-h-screen">
        <section className="max-w-7xl mx-auto px-8 py-16">
          {/* Heading */}
          <div className="text-center mb-14">
            <h1 className="text-5xl font-bold text-gray-800">
              Why Choose Expense Tracker?
            </h1>

            <p className="mt-5 text-lg text-gray-500 max-w-3xl mx-auto">
              Stay on top of your finances with powerful tools designed to
              simplify expense management and budgeting.
            </p>
          </div>

          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl hover:-translate-y-2 transition-all duration-300"
              >
                <div className="text-5xl mb-5">{feature.icon}</div>

                <h2 className="text-2xl font-semibold text-gray-800 mb-3">
                  {feature.title}
                </h2>

                <p className="text-gray-500 leading-7">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>

          {/* Bottom CTA */}
          <div className="mt-20 text-center">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Ready to take control of your finances?
            </h2>

            <p className="text-gray-500 mb-8">
              Join thousands of users managing their expenses smarter every day.
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