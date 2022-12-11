import supabase from "../config/supabaseClient";
import { useEffect, useState } from "react";
import LoanCard from "../components/LoanCard";

const Loans = () => {
  const [loans, setLoans] = useState(null);
  const [paidLoans, setPaidLoans] = useState(null);
  const [owedLoans, setOwedLoans] = useState(null);
  const [fetchError, setFetchError] = useState(null);
  const [formError, setFormError] = useState(null);

  const handleDelete = (id) => {
    setLoans((prevLoans) => prevLoans.filter((loan) => loan.id !== id));
  };

  const handleOwing = () => {
    setOwedLoans(loans.filter((loan) => loan.remaining_payment > 0));
    setPaidLoans(null);
  };

  const handlePaid = () => {
    setPaidLoans(loans.filter((loan) => loan.remaining_payment <= 0));
    setOwedLoans(null);
  };

  const handleAll = () => {
    setPaidLoans(null);
    setOwedLoans(null);
  };

  useEffect(() => {
    const fetchLoans = async () => {
      const { data, error } = await supabase
        .from("loan_application")
        .select()
        .order("created_at", { ascending: false });

      if (error) {
        setFetchError("Could not fetch the loans");
        setLoans(null);
      }
      if (data) {
        setLoans(data);
        setFetchError(null);
      }
      if (data.length === 0) {
        setFormError("No Loans");
      }
    };

    fetchLoans();
  }, []);

  const displayLoans = (loanType) => {
    return loanType.map((loan) => (
      <LoanCard
        key={loan.uuid}
        loan={loan}
        onDelete={handleDelete}
        onPay={false}
      />
    ));
  };

  return (
    <div className="page home">
      {fetchError && <p>{fetchError}</p>}
      {loans && (
        <div className="loans">
          <div className="order-by">
            <p>Filter by:</p>
            <button onClick={() => handleAll()}>All</button>
            <button onClick={() => handleOwing()}>Owing</button>
            <button onClick={() => handlePaid()}>Paid</button>
          </div>
          <div className="grid">
            {paidLoans
              ? displayLoans(paidLoans)
              : owedLoans
              ? displayLoans(owedLoans)
              : displayLoans(loans)}
          </div>
        </div>
      )}
      {formError && <h1>{formError}</h1>}
    </div>
  );
};

export default Loans;
