import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import supabase from "../config/supabaseClient";
import LoanCalculator from "../utils/loanCalc";

const loan_interest = 323.94;

const Apply = () => {
  const navigate = useNavigate();

  const [employee_id, setEmployeeId] = useState("");
  const [loan_amount, setLoanAmount] = useState("");
  const [payment_period, setPaymentPeriod] = useState("");
  const [payment_per_month, setPaymentPerMonth] = useState("");
  const [total_amount, setTotalAmount] = useState("");
  const [total_interest, setTotalInterest] = useState("");
  const [formError, setFormError] = useState(null);
  const [fetchError, setFetchError] = useState(null);
  const [employees, setEmployees] = useState(null);
  const [cleared, setCleared] = useState(null);

  useEffect(() => {
    console.log("employees' ID in apply is ", employee_id);

    const fetchLoans = async () => {
      const { data, error } = await supabase
        .from("loan_application")
        .select()
        .eq("employee_id", employee_id);

      if (error) {
        setCleared(null);
        console.error("error from app fetch", error);
      }
      if (data) setCleared(data);
    };
    fetchLoans();
  }, [employee_id]);

  useEffect(() => {
    const fetchEmployees = async () => {
      const { data, error } = await supabase.from("employee").select();

      if (error) {
        setFetchError("Could not fetch the employees");
        setEmployees(null);
      }
      if (data) {
        setEmployees(data);
        setFetchError(null);
      }
    };

    fetchEmployees();
  }, []);

  useEffect(() => {
    const [payment, total, totalInterest] = LoanCalculator(
      loan_amount,
      loan_interest,
      payment_period
    );

    setPaymentPerMonth(payment);
    setTotalAmount(total);
    setTotalInterest(totalInterest);
  }, [loan_amount, payment_period]);

  const setCoolOffDate = (numOfMonths = 6, date = new Date()) => {
    date.setMonth(date.getMonth() + numOfMonths);
    return date;
  };

  const newLoan = async (employee_name, employee_email) => {
    const { data, error } = await supabase
      .from("loan_application")
      .insert([
        {
          loan_amount,
          employee_id,
          employee_name,
          employee_email,
          payment_period,
          payment_per_month,
          total_amount,
          total_interest,
          remaining_payment: total_amount,
          cool_off_date: setCoolOffDate(),
        },
      ])
      .select();

    if (error) {
      setFormError(`some error`);
    }
    if (data) {
      setFormError(null);
      navigate("/pay");
    }
  };

  const CheckCoolOff = (loans) => {
    const outstanding = loans.find((loan) => loan.remaining_payment > 0);

    if (outstanding) {
      const today = new Date().toDateString;
      const coolOff = new Date(outstanding.cool_off_date).toDateString();

      return today === coolOff;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!employee_id || !loan_amount || !payment_period) {
      setFormError("Please fill in all the fields correctly.");
      return;
    }

    const employee = employees.find((e) => e.id === +employee_id);

    if (!employee) {
      setFormError("Employee Number does not exist.");
      return;
    }

    const loanLimit = employee["salary"] * 5;

    if (loan_amount > loanLimit) {
      setFormError(`Loan amount exceeded your limit of ${loanLimit}`);
      return;
    }

    setFormError(null);

    const employee_email = employee["email"];
    const employee_name = employee["name"];

    cleared.every((loan) => loan.remaining_payment <= 0) ||
    CheckCoolOff(cleared)
      ? newLoan(employee_name, employee_email)
      : setFormError(
          "Please finish paying off your current loan or wait 6 months to apply again."
        );
  };

  return (
    <div className="page create">
      {console.log("loan status", cleared)}
      {fetchError && <p>{fetchError}</p>}
      {employees && (
        <form onSubmit={handleSubmit}>
          <label htmlFor="employee_id">Employee Number:</label>
          <input
            type="number"
            id="employee_id"
            value={employee_id}
            onChange={(e) => setEmployeeId(e.target.value)}
          />

          <label htmlFor="loan_amount">Amount:</label>
          <input
            type="number"
            id="loan_amount"
            min={5000}
            value={loan_amount}
            onChange={(e) => setLoanAmount(e.target.value)}
          />

          <label htmlFor="payment_period">Period in Years:</label>
          <input
            type="number"
            id="payment_period"
            min={0.5}
            max={10}
            step={0.1}
            value={payment_period}
            onChange={(e) => setPaymentPeriod(e.target.value)}
          />

          <button>Submit</button>

          {formError && <p className="error">{formError}</p>}
        </form>
      )}
    </div>
  );
};

export default Apply;
