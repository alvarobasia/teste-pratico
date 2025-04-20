import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Employee } from "@/types/employee.ts";
import { filterEmployee } from "@/utils/filter-employee.ts";
type INITIAL_STATE = {
  employees: Employee[];
  filteredEmployees: Employee[];
};

const initialState: INITIAL_STATE = {
  employees: [],
  filteredEmployees: [],
};

const employeeSlice = createSlice({
  name: "employee",
  initialState,
  reducers: {
    add: (state, action: PayloadAction<Employee>) => {
      console.log(action.payload);
      return {
        ...state,
        employees: [...state.employees, action.payload],
      };
    },
    edit: (state, action: PayloadAction<Employee>) => {
      const index = state.employees.findIndex(
        (emp) => emp.id === action.payload.id,
      );
      if (index !== -1) {
        return {
          ...state,
          employees: state.employees.map((emp, i) =>
            i === index ? { ...emp, ...action.payload } : emp,
          ),
        };
      }
    },
    remove: (state, action: PayloadAction<string>) => {
      return {
        ...state,
        employees: state.employees.filter((emp) => emp.id !== action.payload),
      };
    },
    filter: (state, action: PayloadAction<{ name: string; cpf: string }>) => {
      const result = filterEmployee(
        action.payload.name,
        action.payload.cpf,
        state.employees,
      );
      return {
        ...state,
        filteredEmployees: result,
      };
    },
  },
});

export const { add, remove, edit, filter } = employeeSlice.actions;
export default employeeSlice.reducer;
