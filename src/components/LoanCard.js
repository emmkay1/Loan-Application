import { useState } from "react";
import { useNavigate } from "react-router-dom";
import supabase from "../config/supabaseClient";

const LoanCard = ({ loan, onDelete = null, onPay = true }) => {
  const navigate = useNavigate();

  const [remaining_payment, setRemainingPayment] = useState(
    loan.remaining_payment
  );

  const handleDelete = async () => {
    const { data, error } = await supabase
      .from("loans")
      .delete()
      .eq("id", loan.id)
      .select();

    if (error) {
      console.log(error);
    }
    if (data) {
      console.log(data);
      onDelete(loan.id);
    }
  };

  const handlePay = async () => {
    const remainder = remaining_payment - loan.payment_per_month;

    const { data, error } = await supabase
      .from("loans")
      .update({ remaining_payment: remainder < 0 ? 0 : remainder })
      .eq("id", loan.id)
      .select();

    if (error) {
      console.log(error);
    }
    if (data) {
      setRemainingPayment(remainder);
      navigate("/");
    }
  };

  return (
    <div className="card">
      <p className="value">
        <span className="label">Employee Name</span> {loan.employee_name}
      </p>
      <p className="value">
        <span className="label">Employee ID</span> {loan.employee_id}
      </p>
      <p className="value">
        <span className="label">Amount Loaned</span> K{loan.loan_amount}
      </p>
      <p className="value">
        <span className="label">Repayment (per month)</span> K
        {loan.payment_per_month}
      </p>
      <p className="value">
        <span className="label">Total Amount Payable</span> K{loan.total_amount}
      </p>
      <p className="value">
        <span className="label">Total Interest</span> K{loan.total_interest}
      </p>
      <p className="value">
        <span className="label">Tenure (years)</span> {loan.payment_period}
      </p>
      <p className="value">
        <span className="label">Remaining Payment</span> K
        {loan.remaining_payment <= 0 ? 0 : loan.remaining_payment}
      </p>
      <p className="value">
        <span className="label">Application Date</span>{" "}
        {new Date(loan.created_at).toDateString()}
      </p>
      <p className="value">
        <span className="label">Cool Off Date</span>{" "}
        {new Date(loan.cool_off_date).toDateString()}
      </p>
      <div className="amount">
        {loan.remaining_payment <= 0 ? "Paid" : "Owing"}
      </div>
      {
        <div className="buttons">
          {onDelete && (
            <i className="material-icons" onClick={handleDelete}>
              delete
            </i>
          )}
          {onPay && remaining_payment > 0 && (
            <i className="material-icons" onClick={handlePay}>
              paid
            </i>
          )}
        </div>
      }
    </div>
  );
};

export default LoanCard;
