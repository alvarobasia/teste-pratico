import { DEPENDENCY_DEDUCTION } from "@/utils/constants.ts";

export const getIRBase = (
  grossSalary: number,
  socialSecurityDiscount: number,
  dependents: number,
) => {
  const dependency = DEPENDENCY_DEDUCTION * dependents;

  return grossSalary - socialSecurityDiscount - dependency;
};
