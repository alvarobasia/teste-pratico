import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router";
export default function EmployeeManagement() {
  const navigate = useNavigate();
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center justify-center w-full my-3">
        <Button onClick={() => navigate("/new")}>Adicionar Funcionário</Button>
      </div>
    </div>
  );
}
