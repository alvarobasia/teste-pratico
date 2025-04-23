import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useDispatch } from "react-redux";
import { filter } from "@/redux/employee-slice.ts";

export default function EmployeeFilter() {
  const [nameFilter, setNameFilter] = useState("");
  const [cpfFilter, setCpfFilter] = useState("");
  const dispatch = useDispatch();

  const handleFilter = () => {
    dispatch(
      filter({
        name: nameFilter,
        cpf: cpfFilter,
      }),
    );
  };

  const handleClearFilter = () => {
    dispatch(
      filter({
        name: "",
        cpf: "",
      }),
    );
    setNameFilter("");
    setCpfFilter("");
  };

  return (
    <Card>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <Input
              placeholder="Filtrar por nome ou cpf"
              value={nameFilter}
              onChange={(e) => setNameFilter(e.target.value)}
            />
          </div>
          <div>
            <Input
              placeholder="Filtrar por CPF"
              value={cpfFilter}
              onChange={(e) => setCpfFilter(e.target.value)}
            />
          </div>
          <div className="flex space-x-2">
            <Button onClick={handleFilter} className="flex-1">
              Filtrar
            </Button>
            <Button onClick={handleClearFilter} className="flex-1">
              Limpar
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
