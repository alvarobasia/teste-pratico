import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import {
  legacy_configureStore as configureStore,
  MockStoreEnhanced,
} from "redux-mock-store";
import EmployeeFilter from "../employee-filter";

const mockStore = configureStore([]);

describe("EmployeeFilter", () => {
  let store: MockStoreEnhanced<unknown>;

  beforeEach(() => {
    store = mockStore({
      employees: {
        filters: {
          name: "",
          cpf: "",
        },
      },
    });

    store.dispatch = jest.fn();
  });

  it("deve renderizar os campos de entrada e botões", () => {
    render(
      <Provider store={store}>
        <EmployeeFilter />
      </Provider>,
    );

    expect(
      screen.getByPlaceholderText("Filtrar por nome ou cpf"),
    ).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Filtrar por CPF")).toBeInTheDocument();
    expect(screen.getByText("Filtrar")).toBeInTheDocument();
    expect(screen.getByText("Limpar")).toBeInTheDocument();
  });

  it("deve despachar a ação de filtro ao clicar no botão 'Filtrar'", () => {
    render(
      <Provider store={store}>
        <EmployeeFilter />
      </Provider>,
    );

    fireEvent.change(screen.getByPlaceholderText("Filtrar por nome ou cpf"), {
      target: { value: "João" },
    });
    fireEvent.change(screen.getByPlaceholderText("Filtrar por CPF"), {
      target: { value: "12345678900" },
    });

    fireEvent.click(screen.getByText("Filtrar"));

    expect(store.dispatch).toHaveBeenCalledWith({
      type: "employee/filter",
      payload: { name: "João", cpf: "12345678900" },
    });
  });

  it("deve limpar os filtros ao clicar no botão 'Limpar'", () => {
    render(
      <Provider store={store}>
        <EmployeeFilter />
      </Provider>,
    );

    fireEvent.change(screen.getByPlaceholderText("Filtrar por nome ou cpf"), {
      target: { value: "João" },
    });
    fireEvent.change(screen.getByPlaceholderText("Filtrar por CPF"), {
      target: { value: "12345678900" },
    });

    fireEvent.click(screen.getByText("Limpar"));

    expect(store.dispatch).toHaveBeenCalledWith({
      type: "employee/filter",
      payload: { name: "", cpf: "" },
    });
    expect(screen.getByPlaceholderText("Filtrar por nome ou cpf")).toHaveValue(
      "",
    );
    expect(screen.getByPlaceholderText("Filtrar por CPF")).toHaveValue("");
  });
});
