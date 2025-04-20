"use client";

import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Pencil, Trash2 } from "lucide-react";
import type { Employee } from "@/types/employee";
import { useState } from "react";
import { formatCurrency } from "@/utils/format-currency.ts";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store.ts";
import { remove } from "@/redux/employee-slice.ts";
import { useNavigate } from "react-router";

export default function EmployeeTable() {
  const { employees } = useSelector((state: RootState) => state.employee);
  const [employeeToDelete, setEmployeeToDelete] = useState<string | null>(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleDelete = () => {
    if (employeeToDelete) {
      dispatch(remove(employeeToDelete));
    }
  };

  const handleEdit = (employee: Employee) => {
    navigate(`/edit/${employee.id}`);
  };

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nome</TableHead>
            <TableHead>CPF</TableHead>
            <TableHead className="text-right">Salário Bruto</TableHead>
            <TableHead className="text-right">Desconto Previdência</TableHead>
            <TableHead className="text-right">Dependentes</TableHead>
            <TableHead className="text-right">Base de Cálculo IR</TableHead>
            <TableHead className="text-right">Desconto IRRF</TableHead>
            <TableHead className="text-center">Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {employees.length === 0 ? (
            <TableRow>
              <TableCell colSpan={8} className="text-center py-6">
                Nenhum funcionário encontrado
              </TableCell>
            </TableRow>
          ) : (
            employees.map((employee: Employee) => (
              <TableRow key={employee.id}>
                <TableCell>{employee.name}</TableCell>
                <TableCell>
                  {employee.cpf.replace(
                    /(\d{3})(\d{3})(\d{3})(\d{2})/,
                    "$1.$2.$3-$4",
                  )}
                </TableCell>
                <TableCell className="text-right">
                  {formatCurrency(employee.grossSalary)}
                </TableCell>
                <TableCell className="text-right">
                  {formatCurrency(employee.socialSecurityDiscount)}
                </TableCell>
                <TableCell className="text-right">
                  {employee.dependents}
                </TableCell>
                <TableCell className="text-right">
                  {formatCurrency(employee.irBaseValue)}
                </TableCell>
                <TableCell className="text-right">
                  {formatCurrency(employee.irrfDiscount)}
                </TableCell>
                <TableCell>
                  <div className="flex justify-center space-x-2">
                    <Button size="icon" onClick={() => handleEdit(employee)}>
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <AlertDialog
                      open={employeeToDelete === employee.id}
                      onOpenChange={(open) => {
                        if (!open) setEmployeeToDelete(null);
                      }}
                    >
                      <AlertDialogTrigger asChild>
                        <Button
                          size="icon"
                          className="text-destructive"
                          onClick={() => setEmployeeToDelete(employee.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>
                            Confirmar exclusão
                          </AlertDialogTitle>
                          <AlertDialogDescription>
                            Tem certeza que deseja excluir o funcionário{" "}
                            {employee.name}? Esta ação não pode ser desfeita.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancelar</AlertDialogCancel>
                          <AlertDialogAction onClick={handleDelete}>
                            Excluir
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
