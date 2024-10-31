import styles from "./ListSection.module.css";
import { useState, useEffect, useCallback } from "react";
import { observer } from "mobx-react";
import PokemonStore from "../../store/pokemonStore";
import EditableList from "../../components/EditableList/EditableList";
import EditDialog from "../../components/EditDialog/EditDialog";
import pokeballIcon from "../../assets/images/pokeball.svg";

const ListSection = observer(() => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState<{ name: string } | null>(null);

  const loadMoreData = useCallback(() => {
    if (
      !PokemonStore.loading &&
      PokemonStore.nextUrl &&
      (window.innerHeight >= document.documentElement.scrollHeight ||
        window.innerHeight + document.documentElement.scrollTop + 100 >=
          document.documentElement.offsetHeight)
    ) {
      PokemonStore.fetchData();
    }
  }, []);

  useEffect(() => {
    PokemonStore.fetchData();
  }, []);

  useEffect(() => {
    const handleScroll = () => loadMoreData();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loadMoreData]);

  const handleEditClick = (item: { name: string }) => {
    setCurrentItem(item);
    setDialogOpen(true);
  };

  const handleDelete = (item: { name: string }) => {
    PokemonStore.deleteItem(item.name);
    setTimeout(() => loadMoreData(), 0);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
    setCurrentItem(null);
  };

  const handleDialogSave = (newName: string) => {
    if (currentItem) {
      PokemonStore.editItem(currentItem.name, newName);
    }
    handleDialogClose();
  };

  return (
    <section className={styles.list}>
      <div className={styles.list__title}>
        <img
          className={styles.list__titleImage}
          src={pokeballIcon}
          alt="title_icon"
        />
        <h3 className={styles.list__titleText}>Pokemons List</h3>
      </div>
      <EditableList
        items={PokemonStore.items}
        onEdit={handleEditClick}
        onDelete={handleDelete}
      />
      {PokemonStore.loading && <div>Loading...</div>}
      {!PokemonStore.nextUrl && !PokemonStore.loading && (
        <div>No more items to load</div>
      )}

      {currentItem && (
        <EditDialog
          open={dialogOpen}
          initialName={currentItem.name}
          onClose={handleDialogClose}
          onSave={handleDialogSave}
        />
      )}
    </section>
  );
});

export default ListSection;
