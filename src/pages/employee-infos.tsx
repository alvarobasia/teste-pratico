import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button.tsx";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form.tsx";
import { Input } from "@/components/ui/input.tsx";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card.tsx";
import { useDispatch, useSelector } from "react-redux";
import { add, edit } from "@/redux/employee-slice.ts";
import { getIRBase } from "@/utils/get-IR-base.ts";
import { getIRDiscount } from "@/utils/get-IR-discount.ts";
import { useNavigate, useLocation } from "react-router";
import { useEffect, useState } from "react";
import { RootState } from "@/redux/store.ts";
import { Employee } from "@/types/employee.ts";

const formSchema = z.object({
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

export default function EmployeeInfos() {
  const navigate = useNavigate();
  const location = useLocation();
  const { employees } = useSelector((state: RootState) => state.employee);
  const [isOnEditMode, setIsOnEditMode] = useState(false);
  const [id, setId] = useState<string | null>(null);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      cpf: "",
      grossSalary: 0,
      socialSecurityDiscount: 0,
      dependents: 0,
    },
  });
  const dispatch = useDispatch();
  useEffect(() => {
    if (location.pathname.includes("edit")) {
      const id = location.pathname.split("/")[2];
      setId(id);
      const employeeToEdit = employees.find((emp) => emp.id === id);

      if (!employeeToEdit) navigate("/");

      setIsOnEditMode(true);
      form.setValue("name", employeeToEdit!.name);
      form.setValue("cpf", employeeToEdit!.cpf);
      form.setValue("grossSalary", employeeToEdit!.grossSalary);
      form.setValue(
        "socialSecurityDiscount",
        employeeToEdit!.socialSecurityDiscount,
      );
    }
  }, [employees, form, location.pathname, navigate]);
  const handleSubmit = (values: z.infer<typeof formSchema>) => {
    const { grossSalary, socialSecurityDiscount, dependents } = values;

    const irBaseValue = getIRBase(
      grossSalary,
      socialSecurityDiscount,
      dependents,
    );
    if (isOnEditMode) {
      editEmployee(values, irBaseValue);
      return;
    }
    addEmployee(values, irBaseValue);
  };

  const editEmployee = (
    values: z.infer<typeof formSchema>,
    irBaseValue: number,
  ) => {
    dispatch(
      edit({
        ...values,
        id,
        irBaseValue,
        irrfDiscount: getIRDiscount(irBaseValue),
      } as Employee),
    );
    navigate("/");
  };

  const addEmployee = (
    values: z.infer<typeof formSchema>,
    irBaseValue: number,
  ) => {
    dispatch(
      add({
        ...values,
        id: crypto.randomUUID(),
        irBaseValue,
        irrfDiscount: getIRDiscount(irBaseValue),
      }),
    );
    navigate("/");
  };

  return (
    <Card>
      <CardHeader>
        {!isOnEditMode && <CardTitle>Adicionar Funcionário</CardTitle>}
        {isOnEditMode && <CardTitle>Editar Funcionário</CardTitle>}
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-4"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome</FormLabel>
                  <FormControl>
                    <Input placeholder="Nome do funcionário" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="cpf"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>CPF</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="CPF (apenas números)"
                      maxLength={11}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="grossSalary"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Salário Bruto</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      step="0.01"
                      placeholder="0.00"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="socialSecurityDiscount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Desconto da Previdência</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      step="0.01"
                      placeholder="0.00"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="dependents"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Número de Dependentes</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      min="0"
                      step="1"
                      placeholder="0"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end space-x-2 pt-4">
              <Button type="button" onClick={() => navigate("/")}>
                Voltar
              </Button>
              <Button type="submit">
                {isOnEditMode ? "Editar" : "Adicionar"}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
