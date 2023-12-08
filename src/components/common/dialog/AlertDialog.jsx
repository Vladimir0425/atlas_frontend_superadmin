import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

export default function AlertDialog({
  open,
  onClose,
  onIgnore,
  onSubmit,
  title,
  description,
  data,
}) {
  const [tempData, setTempData] = React.useState(data);

  const handleClose = () => {
    onClose();
  };

  const handleSubmit = () => {
    onSubmit(tempData);
  };

  const handleIgnore = () => {
    onIgnore(tempData);
  };

  React.useEffect(() => {
    setTempData(data);
  }, [data]);

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {description}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleIgnore}>Don't Save</Button>
        <Button onClick={handleClose}>Discard</Button>
        <Button onClick={handleSubmit} variant="contained" autoFocus>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}
