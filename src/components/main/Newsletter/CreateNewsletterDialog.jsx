import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";

import moment from "moment";

export function CreateNewsletterDialog({ open, onClose, onCreate }) {
  const [content, setContent] = React.useState("");
  const [image, setImage] = React.useState("");

  const handleClose = () => {
    onClose();
  };

  const handleCreate = () => {
    onCreate({ content, image });
    setContent("");
    setImage("");
    onClose();
  };

  const onImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth>
      <DialogTitle>Add Newsletter Tag</DialogTitle>
      <DialogContent>
        <DialogContentText></DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Description"
          type="text"
          value={content}
          multiline={true}
          rows={3}
          onChange={(e) => setContent(e.target.value)}
          fullWidth
        />
        <TextField
          id="image-input"
          type="file"
          label="Image"
          margin="dense"
          onChange={onImageChange}
          inputProps={{
            multiple: "multiple",
          }}
          fullWidth
          focused
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleCreate} variant="contained" color="primary">
          Create
        </Button>
      </DialogActions>
    </Dialog>
  );
}
