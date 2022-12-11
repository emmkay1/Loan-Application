import supabase from "../config/supabaseClient";
import { useEffect, useState } from "react";
import EmployeeCard from "../components/EmployeeCard";

const Employees = () => {
  const [fetchError, setFetchError] = useState(null);
  const [employees, setEmployees] = useState(null);
  const [formError, setFormError] = useState(null);

  useEffect(() => {
    const fetchEmployee = async () => {
      const { data, error } = await supabase.from("employee").select();

      if (error) {
        setFetchError("Could not fetch the employee");
        setEmployees(null);
      }
      if (data) {
        setEmployees(data);
        setFetchError(null);
      }
      if (data.length === 0) {
        setFormError("No Employees");
      }
    };
    fetchEmployee();
  }, []);

  return (
    <div className="page home">
      {fetchError && <p>{fetchError}</p>}
      {employees && (
        <div className="employees">
          <div className="grid">
            {employees.map((employee) => (
              <EmployeeCard key={employee.uuid} employee={employee} />
            ))}
          </div>
        </div>
      )}
      {formError && <h1>{formError}</h1>}
    </div>
  );
};

export default Employees;
