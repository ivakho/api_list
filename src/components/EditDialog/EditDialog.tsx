import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
} from "@mui/material";
import { EditDialogProps } from "../../types";

const EditDialog: React.FC<EditDialogProps> = ({
  open,
  initialName,
  onClose,
  onSave,
}) => {
  const [name, setName] = useState(initialName);

  useEffect(() => {
    if (open) setName(initialName);
  }, [open, initialName]);

  const handleSave = () => {
    onSave(name);
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Edit name</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="New name"
          type="text"
          fullWidth
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleSave} color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditDialog;
