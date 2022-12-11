import { Link } from "react-router-dom";

const EmployeeCard = ({ employee }) => {
  return (
    <div className="card">
      <p className="value">
        <span className="label">Name</span> {employee.name}
      </p>
      <p className="value">
        <span className="label">Salary</span>K {employee.salary}
      </p>
      <p className="value">
        <span className="label">Email</span> {employee.email}
      </p>
      <p className="value">
        <span className="label">Citizen Number</span> {employee.citizen_id}
      </p>
      <div className="amount">{employee.id}</div>
      <div className="buttons">
        <Link to={"/" + employee.id}>
          <i className="material-icons">edit</i>
        </Link>
      </div>
    </div>
  );
};

export default EmployeeCard;
