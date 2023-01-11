import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ProgressLinear from "../components/ProgressLinear";
import useFetchData from "../hooks/useFetchData";
import useInsertData from "../hooks/useInsertData";

const AddEmployee = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [salary, setSalary] = useState("");
  const [citizen_id, setCitizenId] = useState("");
  const [formError, setFormError] = useState(null);

  const {
    isFetching,
    isPaused,
    data: employees,
    isError,
  } = useFetchData("employees");

  const { data, isSuccess, mutate } = useInsertData(
    {
      name,
      email,
      salary,
      citizen_id,
    },
    "employees"
  );

  useEffect(() => {
    if (isSuccess) navigate("/Employees");
  }, [isSuccess, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !email || !salary || !citizen_id) {
      setFormError("Please fill in all the fields correctly.");
      return;
    }

    if (citizen_id.length !== 6 || isNaN(citizen_id)) {
      setFormError("Please fill in a six digit citizen number.");
      return;
    }

    if (employees.find((employee) => employee.email === email)) {
      setFormError("Email alreay exists.");
      return;
    }

    if (employees.find((employee) => employee.citizen_id === +citizen_id)) {
      setFormError("Citizen ID alreay exists.");
      return;
    }

    mutate();
  };

  if (isFetching) return <ProgressLinear />;

  if (isError)
    return <div className="page center-txt">Something went horribly wrong</div>;

  return (
    <div className="page create">
      {console.log("Insert Data: ", data)}
      {isPaused && !employees && (
        <p className="center-txt">Possible network connection failure</p>
      )}
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Employee Name:</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <label htmlFor="email">Employee Email:</label>
        <input
          type="email"
          placeholder="mail@mail.com"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label htmlFor="citizen_id">Citizen Identification Number:</label>
        <input
          type="text"
          placeholder="Please input 6 digit number"
          id="citizen_id"
          value={citizen_id}
          onChange={(e) => setCitizenId(e.target.value)}
        />

        <label htmlFor="salary">Salary:</label>
        <input
          type="number"
          id="salary"
          min={10000}
          value={salary}
          onChange={(e) => setSalary(e.target.value)}
        />

        <button>Submit</button>

        {formError && <p className="error">{formError}</p>}
      </form>
    </div>
  );
};

export default AddEmployee;
