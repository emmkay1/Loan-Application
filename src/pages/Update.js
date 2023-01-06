import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ProgressLinear from "../components/ProgressLinear";
import useUpdateData from "../hooks/useUpdateData";
import useFetchSingle from "../hooks/useFetchSingle";

const Update = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [salary, setSalary] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [citizen_id, setCitizenId] = useState("");
  const [formError, setFormError] = useState(null);

  const [updateInfo, varObj] = [
    { salary, email, name, citizen_id },
    { tbl: "employee", id },
  ];

  const {
    isPaused,
    isFetching,
    data: employee,
    isError,
  } = useFetchSingle("employees", "id", varObj);

  const {
    isLoading,
    isSuccess,
    data: updateData,
    mutate,
  } = useUpdateData(updateInfo, "employees", "id", id, varObj);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!salary || !email || !name || !citizen_id) {
      setFormError("Please fill in all the fields correctly.");
      return;
    }

    if (citizen_id.toString().length !== 6 || isNaN(citizen_id)) {
      setFormError("Please fill in a six digit citizen number.");
      return;
    }

    mutate();
  };

  useEffect(() => {
    if (isError) navigate("/", { replace: true });
    if (isSuccess) navigate("/Employees");
  }, [isError, isSuccess, navigate]);

  useEffect(() => {
    if (employee) {
      setSalary(employee[0].salary);
      setEmail(employee[0].email);
      setName(employee[0].name);
      setCitizenId(employee[0].citizen_id);
    }
  }, [employee]);

  if (isFetching || isLoading) return <ProgressLinear />;

  return (
    <div className="page create">
      {/* {console.log(updateData, employee, isError)} */}
      {isPaused && (
        <p style={{ textAlign: "center" }}>
          Possible network connection failure
        </p>
      )}
      {employee && (
        <form onSubmit={handleSubmit}>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <label htmlFor="email">Email:</label>
          <input
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label htmlFor="salary">Salary:</label>
          <input
            type="number"
            id="salary"
            min={10000}
            value={salary}
            onChange={(e) => setSalary(e.target.value)}
          />

          <label htmlFor="citizen_id">Citizen ID:</label>
          <input
            type="number"
            id="citizen_id"
            value={citizen_id}
            onChange={(e) => setCitizenId(e.target.value)}
          />

          <button>Update Employee Info</button>

          {formError && <p className="error">{formError}</p>}
        </form>
      )}
    </div>
  );
};

export default Update;
