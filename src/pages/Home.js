import { useEffect, useState } from "react";
import "../styles/Home.css";
import Chart from "chart.js/auto";
import { Doughnut } from "react-chartjs-2";
import LoanCalculator from "../utils/loanCalc";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const [loan_amount, setLoanAmount] = useState("5000");
  const [payment_period, setPaymentPeriod] = useState("0.5");
  const [loan_interest, setLoanInterest] = useState("323.94");
  const [payment, setPayment] = useState("");
  const [total, setTotal] = useState("");
  const [total_interest, setTotalInterest] = useState("");

  const data = {
    labels: ["Total Interest", "Principal Loan Amount"],
    datasets: [
      {
        data: [total_interest, loan_amount],
        backgroundColor: ["#3F51B5", "#FF4081"],
        borderWidth: 0,
        hoverOffset: 4,
      },
    ],
  };

  useEffect(() => {
    const [payment, total, totalInterest] = LoanCalculator(
      loan_amount,
      loan_interest,
      payment_period
    );

    if (loan_amount && loan_interest && payment_period) {
      setPayment(payment);
      setTotal(total);
      setTotalInterest(totalInterest);
    }
  }, [loan_amount, loan_interest, payment_period]);

  const toApplicationPage = () => {
    navigate("/Apply");
  };

  return (
    <div>
      <div className="loan-calculator">
        <div className="top">
          <h2>Loan Calculator</h2>

          <div action="#" className="calc-form">
            <div className="group">
              <div className="title">Amount</div>
              <input
                type="text"
                id="loan_amount"
                value={loan_amount}
                onChange={(e) => setLoanAmount(e.target.value)}
              />
            </div>

            <div className="group">
              <div className="title">Interest Rate</div>
              <input
                type="text"
                id="loan_interest"
                value={loan_interest}
                onChange={(e) => setLoanInterest(e.target.value)}
              />
            </div>

            <div className="group">
              <div className="title">Period (In Years)</div>
              <input
                type="text"
                id="payment_period"
                value={payment_period}
                onChange={(e) => setPaymentPeriod(e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className="result">
          <div className="left">
            <div className="loan-emi">
              <h3>Loan EMI</h3>
              <div className="value">
                {!isNaN(payment) && isFinite(payment) ? payment : ""}
              </div>
            </div>
            <div className="total-interest">
              <h3>Total Amount</h3>
              <div className="value">{!isNaN(total) ? total : ""}</div>
            </div>

            <div className="total-amount">
              <h3>Total Interest</h3>
              <div className="value">
                {!isNaN(total_interest) ? total_interest : ""}
              </div>
            </div>

            <button className="apply-btn" onClick={toApplicationPage}>
              APPLY
            </button>
          </div>

          <div className="right">
            <Doughnut data={data} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
