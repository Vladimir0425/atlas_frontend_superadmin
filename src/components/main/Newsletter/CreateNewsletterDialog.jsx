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

const initialNewsletter = {
  name: "",
  period: "",
};

const initialPeriods = ["Daily", "Weekly", "Monthly"];

export function CreateNewsletterDialog({ open, onClose, onCreate }) {
  const [newsletter, setNewsletter] = React.useState(initialNewsletter);

  const handleClose = () => {
    onClose();
  };

  const handleCreate = () => {
    onCreate(newsletter);
    setNewsletter(initialNewsletter);
    onClose();
  };

  const onNewsletterChange = (field) => (e) => {
    setNewsletter({
      ...newsletter,
      [field]: e.target.value,
    });
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
          label="Name"
          type="text"
          value={newsletter.name}
          onChange={onNewsletterChange("name")}
          fullWidth
        />
        <FormControl fullWidth margin="dense">
          <InputLabel id="tag-select-label">Tag</InputLabel>
          <Select
            id="tag-select"
            labelId="tag-select-label"
            label="Tag"
            margin="dense"
            value={newsletter.period}
            onChange={onNewsletterChange("period")}
            fullWidth
          >
            {initialPeriods.map((period) => (
              <MenuItem key={period} value={period}>
                {period}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
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
