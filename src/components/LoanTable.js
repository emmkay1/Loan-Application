import { useState, useMemo, useEffect } from "react";
import { useTable } from "react-table";
import useDeleteData from "../hooks/useDeleteData";
import "../styles/loanTable.css";

const LoanTable = ({ loans: loanData }) => {
  const [id, setId] = useState(null);
  const tableData = useMemo(() => loanData, [loanData]);
  const { mutate } = useDeleteData("loans", "id", id);
  // const { data, isSuccess, mutate } = useDeleteData("loans", "id", loan.id);

  const columns = useMemo(
    () => [
      {
        Header: "Employee ID",
        accessor: "employee_id",
      },
      {
        Header: "Employee Name",
        accessor: "employee_name",
      },
      {
        Header: "Amount Loaned",
        accessor: "loan_amount",
      },
      {
        Header: "Repayment(per month)",
        accessor: "payment_per_month",
      },
      {
        Header: "Total Amount Payable",
        accessor: "total_amount",
      },
      {
        Header: "Total Interest",
        accessor: "total_interest",
      },
      {
        Header: "Tenure (years)",
        accessor: "payment_period",
      },
      {
        Header: "Remaining Payment",
        accessor: (row) =>
          row.remaining_payment <= 0 ? 0 : row.remaining_payment,
      },
      {
        Header: "Application Date",
        accessor: (row) => new Date(row.created_at).toDateString(),
      },
      {
        Header: "Cool Off Date",
        accessor: (row) => new Date(row.cool_off_date).toDateString(),
      },
      {
        Header: "Delete",
        accessor: "delete",
        Cell: ({ row }) => (
          <div className="table">
            <i
              className="material-icons"
              onClick={() => handleDelete(row.original)}
            >
              delete
            </i>
          </div>
        ),
      },
    ],
    []
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data: tableData });

  useEffect(() => {
    setId();
  }, []);

  function handleDelete(row) {
    console.log(row.id, id);
    setId(row.id);
    console.log(id);
    mutate();
  }

  return (
    <div>
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()}>{column.render("Header")}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default LoanTable;
