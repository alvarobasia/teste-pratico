import EmployeeManagement from "@/components/employee-management.tsx";
import EmployeeTable from "@/components/employee-table.tsx";
import EmployeeFilter from "@/components/employee-filter.tsx";
import { useEffect } from "react";
import { init } from "@/redux/employee-slice.ts";
import { useDispatch } from "react-redux";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(init());
  }, [dispatch]);

  return (
    <>
      <EmployeeFilter />
      <EmployeeManagement />
      <EmployeeTable />
    </>
  );
}

export default App;
