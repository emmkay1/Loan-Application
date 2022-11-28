import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import supabase from "../config/supabaseClient";

const Update = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [salary, setSalary] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [citizen_id, setCitizenId] = useState("");
  const [formError, setFormError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!salary || !email || !name || !citizen_id) {
      setFormError("Please fill in all the fields correctly.");
      return;
    }

    if (citizen_id.toString().length !== 6 || isNaN(citizen_id)) {
      console.log(typeof citizen_id);
      setFormError("Please fill in a six digit citizen number.");
      return;
    }

    const { data, error } = await supabase
      .from("employee")
      .update({ salary, email, name, citizen_id })
      .eq("id", id)
      .select();

    if (error) {
      setFormError("Please fill in all the fields correctly.");
    }
    if (data) {
      setFormError(null);
      navigate("/employees");
    }
  };

  useEffect(() => {
    const fetchEmployees = async () => {
      const { data, error } = await supabase
        .from("employee")
        .select()
        .eq("id", id)
        .single();

      if (error) {
        navigate("/", { replace: true });
      }
      if (data) {
        setSalary(data.salary);
        setEmail(data.email);
        setName(data.name);
        setCitizenId(data.citizen_id);
      }
    };

    fetchEmployees();
  }, [id, navigate]);

  return (
    <div className="page create">
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
    </div>
  );
};

export default Update;
