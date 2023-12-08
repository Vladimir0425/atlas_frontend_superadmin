import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { DateField } from "@mui/x-date-pickers/DateField";
import { SingleInputTimeRangeField } from "@mui/x-date-pickers-pro/SingleInputTimeRangeField";

import moment from "moment";

const initialEvent = {
  name: "",
  price: 0,
  date: moment(new Date()),
  time: [moment(new Date()), moment(new Date())],
  address: "",
  author: "",
};

const eventItems = [
  {
    label: "Event Name",
    field: "name",
  },
  {
    label: "Price",
    field: "price",
    type: "number",
  },
  {
    label: "Address",
    field: "address",
  },
  {
    label: "Author",
    field: "author",
  },
];

export function CreateEventDialog({ open, onClose, onCreate }) {
  const [event, setEvent] = React.useState(initialEvent);

  const handleClose = () => {
    onClose();
  };

  const handleCreate = () => {
    onCreate(event);
    setEvent(initialEvent);
    onClose();
  };

  const onEventChange = (field) => (e) => {
    setEvent({
      ...event,
      [field]: e.target.value,
    });
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth>
      <DialogTitle>Add Event</DialogTitle>
      <DialogContent>
        <DialogContentText></DialogContentText>
        {eventItems.map(({ label, field, type }) => (
          <TextField
            key={field}
            autoFocus
            margin="dense"
            id="name"
            label={label}
            type={!type ? "text" : "number"}
            value={event[field]}
            onChange={onEventChange(field)}
            fullWidth
          />
        ))}
        <DateField
          label="Date"
          value={event.date}
          onChange={onEventChange("date")}
          margin="dense"
          fullWidth
        />
        <SingleInputTimeRangeField
          label="Time Range"
          value={event.time}
          onChange={onEventChange("time")}
          margin="dense"
          format="HH:MM A"
          fullWidth
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
