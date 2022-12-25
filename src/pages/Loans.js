import { useEffect, useState } from "react";
import LoanCard from "../components/LoanCard";
import ProgressLinear from "../components/ProgressLinear";
import useFetchData from "../hooks/useFetchData";

const Loans = () => {
  const [loans, setLoans] = useState(null);
  const [paidLoans, setPaidLoans] = useState(null);
  const [owedLoans, setOwedLoans] = useState(null);

  const { isFetching, isPaused, data, isError } = useFetchData("loans");

  useEffect(() => {
    data && setLoans(data);
  }, [data]);

  const filterLoans = (filterType) => {
    switch (filterType) {
      case "owed":
        setOwedLoans(loans.filter((loan) => loan.remaining_payment > 0));
        setPaidLoans(null);
        break;
      case "paid":
        setPaidLoans(loans.filter((loan) => loan.remaining_payment <= 0));
        setOwedLoans(null);
        break;
      default:
        setPaidLoans(null);
        setOwedLoans(null);
    }
  };

  const handleDelete = (id) => {
    setLoans((prevLoans) => prevLoans.filter((loan) => loan.id !== id));
  };

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

  if (isFetching) return <ProgressLinear />;

  if (isError)
    return <div className="page center-txt">Something went horribly wrong</div>;

  return (
    <div className="page home">
      {isPaused && !data && (
        <p style={{ textAlign: "center" }}>Could not fetch the loans</p>
      )}
      {loans && (
        <div className="loans">
          <div className="order-by">
            <p>Filter by:</p>
            <button onClick={() => filterLoans('All')}>All</button>
            <button onClick={() => filterLoans('owed')}>Owing</button>
            <button onClick={() => filterLoans('paid')}>Paid</button>
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
      {data.length === 0 && <h1 className="center-txt">No Loans</h1>}
    </div>
  );
};

export default Loans;
