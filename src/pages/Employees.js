import EmployeeCard from "../components/EmployeeCard";
import ProgressLinear from "../components/ProgressLinear";
import useFetchData from "../hooks/useFetchData";

const Employees = () => {
  const {
    isFetching,
    isPaused,
    data: employees,
    isError,
  } = useFetchData("employees");

  if (isFetching) return <ProgressLinear />;

  if (isError)
    return <div className="page center-txt">Something went horribly wrong</div>;

  return (
    <div className="page home">
      {isPaused && !employees && (
        <p className="center-txt">Possible network connection failure</p>
      )}
      {employees && (
        <div className="employees">
          <div className="grid">
            {employees.map((employee) => (
              <EmployeeCard key={employee.uuid} employee={employee} />
            ))}
          </div>
        </div>
      )}
      {employees.length === 0 && <h1 className="center-txt">No Employees</h1>}
    </div>
  );
};

export default Employees;
