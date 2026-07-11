
import './App.css'
// import Navbar from './components/Navbar'
import { Routes } from "react-router-dom"
import { Route } from "react-router-dom"
import Login from './pages/login'
import Signup from './pages/Signup'
import Home from './pages/home'
import AddExpense from './pages/ADDExpense'
import Features from './pages/features'
import About from './pages/About'


import Transactions from './pages/transactions'
import Dashboard from './components/Dashboard'
import Budget from './components/Budget'
import EditExpenseForm from './components/Editexpense'
import ProtectedRoute from './ProtectedRoute'
import Analytics from './pages/analytics'

function App() {


  return (
    <>

      <Routes >
        <Route path="/about" element={<About />} />
        <Route path="/features" element={<Features />} ></Route>
        <Route path="/signup" element={<Signup />} />
        <Route index element={<Login />} />
        <Route path="/home" element={<Home />} />


        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/transactions"
          element={
            <ProtectedRoute>
              <Transactions />
            </ProtectedRoute>
          }
        />

        <Route
          path="/budget"
          element={
            <ProtectedRoute>
              <Budget />
            </ProtectedRoute>
          }
        />

        <Route
          path="/addexpense"
          element={
            <ProtectedRoute>
              <AddExpense />
            </ProtectedRoute>
          }
        />

        <Route
          path="/editexpense/:id"
          element={
            <ProtectedRoute>
              <EditExpenseForm />
            </ProtectedRoute>
          }
        />
        <Route
          path="/analytics"
          element={
            <ProtectedRoute>
              <Analytics />
            </ProtectedRoute>
          }
        />

      </Routes>
    </>
  )
}

export default App
