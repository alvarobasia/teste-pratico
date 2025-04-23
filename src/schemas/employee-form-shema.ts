import * as z from "zod";

export const employeeFormSchema = z.object({
  name: z.string().min(3, { message: "Nome deve ter pelo menos 3 caracteres" }),
  cpf: z
    .string()
    .length(11, { message: "CPF deve ter 11 dígitos" })
    .regex(/^\d+$/, { message: "CPF deve conter apenas números" }),
  grossSalary: z.coerce
    .number()
    .positive({ message: "Salário deve ser maior que zero" }),
  socialSecurityDiscount: z.coerce
    .number()
    .min(0, { message: "Desconto não pode ser negativo" }),
  dependents: z.coerce
    .number()
    .int({ message: "Número de dependentes deve ser um número inteiro" })
    .min(0, { message: "Número de dependentes não pode ser negativo" }),
});

export type EmployeeFormData = z.infer<typeof employeeFormSchema>;
