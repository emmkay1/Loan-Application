import { useState } from "react";
import { useNavigate } from "react-router-dom";
import supabase from "../config/supabaseClient";

const AddEmployee = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [salary, setSalary] = useState("");
  const [citizen_id, setCitizenId] = useState("");
  const [formError, setFormError] = useState(null);

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

    const { data, error } = await supabase
      .from("employee")
      .insert([
        {
          name,
          email,
          salary,
          citizen_id,
        },
      ])
      .select("*");
    console.log(name, email, salary, citizen_id);
    console.log(data, error);

    if (error) {
      console.log(error);
      setFormError("Please fill in all the fields.");
    }
    if (data) {
      console.log(data);
      setFormError(null);
      navigate("/employees");
    }
  };

  return (
    <div className="page create">
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Employee Names:</label>
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
