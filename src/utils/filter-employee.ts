import { Employee } from "@/types/employee.ts";

export const filterEmployee = (
  name: string,
  cpf: string,
  employee: Employee[],
) => {
  if (name === "" && cpf === "") {
    return employee;
  }
  const filteredEmployees = employee.filter((emp) => {
    const nameMatch = emp.name.toLowerCase().includes(name.toLowerCase());
    const cpfMatch = emp.cpf.includes(cpf);
    return nameMatch || cpfMatch;
  });

  return filteredEmployees;
};
