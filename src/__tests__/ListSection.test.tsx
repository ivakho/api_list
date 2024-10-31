import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { act } from "react";
import PokemonStore from "../store/pokemonStore";
import ListSection from "../components/ListSection/ListSection";

jest.mock("../store/pokemonStore", () => ({
  items: [{ name: "pikachu" }, { name: "bulbasaur" }],
  loading: false,
  nextUrl: "random_test_url",
  fetchData: jest.fn(),
  editItem: jest.fn(),
  deleteItem: jest.fn(),
}));

describe("ListSection", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("отображение списка элементов", () => {
    render(<ListSection />);

    expect(screen.getByText("pikachu")).toBeInTheDocument();
    expect(screen.getByText("bulbasaur")).toBeInTheDocument();
  });

  test("редактирование элемента", async () => {
    render(<ListSection />);

    fireEvent.click(screen.getAllByLabelText("edit")[0]);

    const input = screen.getByLabelText(/New name/i);
    fireEvent.change(input, { target: { value: "raichu" } });

    fireEvent.click(screen.getByText(/Save/i));

    await waitFor(() => {
      expect(PokemonStore.editItem).toHaveBeenCalledWith("pikachu", "raichu");
    });
  });

  test("удаление элемента", async () => {
    render(<ListSection />);

    fireEvent.click(screen.getAllByLabelText("delete")[1]);

    await waitFor(() => {
      expect(PokemonStore.deleteItem).toHaveBeenCalledWith("bulbasaur");
    });
  });

  test("подгрузка данных при прокрутке вниз", async () => {
    render(<ListSection />);

    expect(PokemonStore.fetchData).toHaveBeenCalledTimes(1);

    act(() => {
      window.dispatchEvent(new Event("scroll"));
    });

    await waitFor(() => {
      expect(PokemonStore.fetchData).toHaveBeenCalledTimes(2);
    });
  });
});
