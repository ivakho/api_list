import { makeAutoObservable, runInAction } from "mobx";
import { PokemonItems } from "../types";

class PokemonStore {
  items: PokemonItems[] = [];
  nextUrl: string | null =
    "https://pokeapi.co/api/v2/pokemon/?offset=0&limit=20";
  loading: boolean = false;

  constructor() {
    makeAutoObservable(this);
  }

  async fetchData() {
    if (this.loading || !this.nextUrl) return;

    this.loading = true;
    try {
      const response = await fetch(this.nextUrl);
      const result = await response.json();

      runInAction(() => {
        this.items = [...this.items, ...result.results];
        this.nextUrl = result.next;
      });
    } catch (error) {
      console.error("Error loading data", error);
    } finally {
      runInAction(() => {
        this.loading = false;
      });
    }
  }

  editItem(name: string, newName: string) {
    runInAction(() => {
      const item = this.items.find((item) => item.name === name);
      if (item) item.name = newName;
    });
  }

  deleteItem(name: string) {
    runInAction(() => {
      this.items = this.items.filter((item) => item.name !== name);
    });
  }
}

export default new PokemonStore();
