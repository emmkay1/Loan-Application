import { BrowserRouter, Routes, Route } from "react-router-dom";

// pages
import Home from "./pages/Home";
import Apply from "./pages/Apply";
import Employees from "./pages/Employees";
import Loans from "./pages/Loans";
import Update from "./pages/Update";
import Pay from "./pages/Pay";
import AddEmployee from "./pages/AddEmployee";
import NavBar from "./components/NavBar";

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      {/* <nav>
        <h1 className="title">Loan App</h1>
        <Link to="/">Home</Link>
        <Link to="/Apply">Apply</Link>
        <Link to="/Pay">Pay</Link>
        <Link to="/Employees">Employees</Link>
        <Link to="/Loans">Loans</Link>
        <Link to="/New">New Employee</Link>
      </nav> */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Apply" element={<Apply />} />
        <Route path="/Pay" element={<Pay />} />
        <Route path="/Employees" element={<Employees />} />
        <Route path="/Loans" element={<Loans />} />
        <Route path="/:id" element={<Update />} />
        <Route path="/New" element={<AddEmployee />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
