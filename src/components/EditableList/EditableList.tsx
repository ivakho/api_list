import React from "react";
import { List, ListItem, ListItemText, IconButton, Box } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { EditableListProps } from "../../types";

const EditableList: React.FC<EditableListProps> = ({
  items,
  onEdit,
  onDelete,
}) => {
  return (
    <List>
      {items.map((item, index) => (
        <ListItem key={index} divider>
          <ListItemText
            primary={item.name}
            primaryTypographyProps={{
              style: {
                whiteSpace: "normal",
                wordBreak: "break-word",
              },
            }}
          />
          <Box display="flex" alignItems="center" ml={2}>
            <IconButton aria-label="edit" onClick={() => onEdit(item)}>
              <EditIcon />
            </IconButton>
            <IconButton aria-label="delete" onClick={() => onDelete(item)}>
              <DeleteIcon />
            </IconButton>
          </Box>
        </ListItem>
      ))}
    </List>
  );
};

export default EditableList;
