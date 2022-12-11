import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

// pages
import Home from "./pages/Home";
import Apply from "./pages/Apply";
import Employees from "./pages/Employees";
import Loans from "./pages/Loans";
import Update from "./pages/Update";
import Pay from "./pages/Pay";
import AddEmployee from "./pages/AddEmployee";

function App() {
  return (
    <BrowserRouter>
      <nav>
        <h1 className="title">Loan App</h1>
        <Link to="/">Home</Link>
        <Link to="/apply">Apply</Link>
        <Link to="pay">Pay</Link>
        <Link to="/employees">Employees</Link>
        <Link to="/loans">Loans</Link>
        <Link to="/new">New Employee</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/apply" element={<Apply />} />
        <Route path="/pay" element={<Pay />} />
        <Route path="/employees" element={<Employees />} />
        <Route path="/loans" element={<Loans />} />
        <Route path="/:id" element={<Update />} />
        <Route path="/new" element={<AddEmployee />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
