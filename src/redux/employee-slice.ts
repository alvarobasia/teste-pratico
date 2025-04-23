import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Employee } from "@/types/employee.ts";
import { filterEmployee } from "@/utils/filter-employee.ts";
type INITIAL_STATE = {
  employees: Employee[];
  allEmployees: Employee[];
};

const initialState: INITIAL_STATE = {
  employees: [],
  allEmployees: [],
};

const employeeSlice = createSlice({
  name: "employee",
  initialState,
  reducers: {
    init: (state) => {
      return {
        ...state,
        employees: state.allEmployees,
      };
    },
    add: (state, action: PayloadAction<Employee>) => {
      return {
        ...state,
        allEmployees: [...state.allEmployees, action.payload],
      };
    },
    edit: (state, action: PayloadAction<Employee>) => {
      const index = state.allEmployees.findIndex(
        (emp) => emp.id === action.payload.id,
      );
      if (index !== -1) {
        return {
          ...state,
          allEmployees: state.allEmployees.map((emp, i) =>
            i === index ? { ...emp, ...action.payload } : emp,
          ),
        };
      }
    },
    remove: (state, action: PayloadAction<string>) => {
      return {
        ...state,
        allEmployees: state.allEmployees.filter(
          (emp) => emp.id !== action.payload,
        ),
        employees: state.employees.filter((emp) => emp.id !== action.payload),
      };
    },
    filter: (state, action: PayloadAction<{ name: string; cpf: string }>) => {
      const { cpf, name } = action.payload;

      return {
        ...state,
        employees: filterEmployee(name, cpf, state.allEmployees),
      };
    },
  },
});

export const { add, remove, edit, filter, init } = employeeSlice.actions;
export default employeeSlice.reducer;
