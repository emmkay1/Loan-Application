import { useEffect, useState } from "react";
import LoanCard from "../components/LoanCard";
import supabase from "../config/supabaseClient";

const Pay = () => {
  const [formError, setFormError] = useState(null);
  const [loan, setLoan] = useState(null);
  const [employee_id, setEmployeeId] = useState("");

  useEffect(() => {
    setLoan(null);
    setFormError(null);
  }, [employee_id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (employee_id) {
      const { data, error } = await supabase
        .from("loan_application")
        .select()
        .eq("employee_id", employee_id);

      if (error) setFormError("Loan not found");
      if (data) {
        setLoan(data.filter((loan) => loan.remaining_payment > 0));
        data.length > 0
          ? setFormError(null)
          : setFormError("No outstanding loans to show.");
      }
    } else setFormError("Please input your employee ID");
  };

  return (
    <div className="page home">
      {console.log(loan)}
      <form onSubmit={handleSubmit}>
        <label htmlFor="employee_id">Employee Number:</label>
        <input
          type="number"
          id="employee_id"
          value={employee_id}
          onChange={(e) => setEmployeeId(e.target.value)}
        />
        <button>Submit</button>
      </form>

      {formError && <h1>{formError}</h1>}
      {loan && (
        <div className="loan-grid">
          {loan.map((loan) => (
            <LoanCard key={loan.id} loan={loan} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Pay;
