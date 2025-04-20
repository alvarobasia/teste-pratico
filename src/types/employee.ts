export interface EmployeeFormData {
  name: string;
  cpf: string;
  grossSalary: number;
  socialSecurityDiscount: number;
  dependents: number;
}

export interface Employee extends EmployeeFormData {
  id: string;
  irBaseValue: number;
  irrfDiscount: number;
}
