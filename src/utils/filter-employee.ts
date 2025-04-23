import { Employee } from "@/types/employee.ts";
import fuse from "fuse.js";

export const filterEmployee = (
  name: string,
  cpf: string,
  employee: Employee[],
) => {
  let resultName: Employee[] = employee;
  let resultCpf: Employee[] = employee;
  if (name !== "") {
    const fuseSearchName = new fuse(employee, {
      keys: ["name"],
      threshold: 0.3,
      includeScore: true,
    });
    resultName = fuseSearchName.search(name).map((result) => result.item);
  }
  if (cpf !== "") {
    const fuseSearchCpf = new fuse(employee, {
      keys: ["cpf"],
      threshold: 0.3,
      includeScore: true,
    });
    resultCpf = fuseSearchCpf.search(cpf).map((result) => result.item);
  }
  const isNotFilteredByName = employee.length === resultName.length;
  const isNotFilteredByCpf = employee.length === resultCpf.length;

  if (isNotFilteredByName && isNotFilteredByCpf) {
    return employee;
  }
  if (isNotFilteredByName && !isNotFilteredByCpf) {
    return resultCpf;
  }
  if (isNotFilteredByCpf && !isNotFilteredByName) {
    return resultName;
  }
  const uniqueResults = new Set<Employee>([
    ...resultName,
    ...resultCpf,
  ]).values();
  return Array.from(uniqueResults) as Employee[];
};
