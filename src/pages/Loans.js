import { useEffect, useState } from "react";
import LoanCard from "../components/LoanCard";
import LoanTable from "../components/LoanTable";
import ProgressLinear from "../components/ProgressLinear";
import useFetchData from "../hooks/useFetchData";

const Loans = () => {
  const [loans, setLoans] = useState(null);
  const [paidLoans, setPaidLoans] = useState(null);
  const [owedLoans, setOwedLoans] = useState(null);
  const [displayView, setDisplayView] = useState(false);

  const {
    isFetching,
    isPaused,
    data: loanData = [],
    isError,
  } = useFetchData("loans");

  useEffect(() => {
    loanData && setLoans(loanData);
  }, [loanData]);

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

  const handleDisplay = () => {
    setDisplayView(!displayView);
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
      {console.log(loanData)}
      {isPaused && !loanData && (
        <p style={{ textAlign: "center" }}>Could not fetch the loans</p>
      )}
      {loans && (
        <div className="loans">
          <div className="filter-nav">
            {!displayView && (
              <div className="order-by">
                <p>Filter by:</p>
                <button onClick={() => filterLoans("All")}>All</button>
                <button onClick={() => filterLoans("owed")}>Owing</button>
                <button onClick={() => filterLoans("paid")}>Paid</button>
              </div>
            )}
            <div className="viewer">
              <i className="material-icons" onClick={handleDisplay}>
                {displayView ? "grid_view" : "view_list"}
              </i>
            </div>
          </div>
          {!displayView ? (
            <div className="grid">
              {paidLoans
                ? displayLoans(paidLoans)
                : owedLoans
                ? displayLoans(owedLoans)
                : displayLoans(loans)}
            </div>
          ) : (
            <LoanTable loans={loans} />
          )}
        </div>
      )}

      {loanData.length === 0 && <h1 className="center-txt">No Loans</h1>}
    </div>
  );
};

export default Loans;
