export interface PokemonItems {
  name: string;
  url: string;
}

export interface EditableItem {
  name: string;
}

export interface EditableListProps {
  items: EditableItem[];
  onEdit: (item: EditableItem) => void;
  onDelete: (item: EditableItem) => void;
}

export interface EditDialogProps {
  open: boolean;
  initialName: string;
  onClose: () => void;
  onSave: (newName: string) => void;
}
