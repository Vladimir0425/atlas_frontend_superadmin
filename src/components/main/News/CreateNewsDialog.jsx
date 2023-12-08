import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

import moment from "moment";
import { InputBase } from "@mui/material";

const formatItems = [
  "Standard",
  "Without Image",
  "Gallery",
  "Video",
  "Audio",
  "Chat",
  "Status",
];

const imgHiddenLists = ["Without Image", "Audio", "Video"];

const mediaLists = ["Audio", "Video"];

export function CreateNewsDialog({ open, onClose, onCreate }) {
  const [format, setFormat] = React.useState(formatItems[0]);
  const [newsData, setNewsData] = React.useState({});
  const [postImage, setPostImage] = React.useState(null);
  const [mediaFile, setMediaFile] = React.useState(null);

  const handleClose = () => {
    onClose();
  };

  const handleCreate = () => {
    let filesToUpload = [];

    if (!imgHiddenLists.includes(format)) filesToUpload = postImage;
    else if (mediaLists.includes(format)) filesToUpload = mediaFile;

    onCreate(
      {
        title: newsData.title,
        content: newsData.description,
        posted_by: "Admin",
        type: format,
      },
      filesToUpload
    );
    onClose();
  };

  const onImageChange = (e) => {
    if (e.target.files.length === 0) return;
    console.log(e.target.files);
    setPostImage(e.target.files);
  };

  const onMediaChange = (e) => {
    if (e.target.files.length === 0) return;
    console.log(e.target.files);
    setMediaFile(e.target.files);
  };

  const onInputChange = (field) => (e) => {
    setNewsData({
      ...newsData,
      [field]: e.target.value,
    });
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth>
      <DialogTitle>
        <div className="flex items-center justify-between gap-x-4">
          <Typography component="p" fontSize={24} sx={{ flexShrink: 0 }}>
            Add News
          </Typography>
          <FormControl fullWidth>
            <InputLabel id="format-select-label">Format</InputLabel>
            <Select
              id="format-select"
              label="Format"
              labelId="format-select-label"
              margin="dense"
              value={format}
              onChange={(e) => setFormat(e.target.value)}
              fullWidth
            >
              {formatItems.map((item) => (
                <MenuItem key={item} value={item}>
                  {item}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
      </DialogTitle>
      <DialogContent>
        {["Title", "Description"].map((item) => (
          <TextField
            key={item}
            id={`${item.toLowerCase()}-input`}
            label={item}
            margin="dense"
            onChange={onInputChange(item.toLowerCase())}
            multiline={item === "Description" ? true : false}
            rows={item === "Description" ? 3 : 1}
            fullWidth
          />
        ))}
        {!imgHiddenLists.includes(format) && (
          <TextField
            id="image-input"
            type="file"
            label={`${format !== "Gallery" ? "Post" : "Gallery"} Image`}
            margin="dense"
            onChange={onImageChange}
            inputProps={{
              multiple: "multiple",
            }}
            fullWidth
            focused
          />
        )}
        {mediaLists.includes(format) && (
          <TextField
            id={`${format.toLowerCase()}-input`}
            type="file"
            label={`${format} File`}
            margin="dense"
            onChange={onMediaChange}
            inputProps={{
              multiple: "multiple",
            }}
            fullWidth
            focused
          />
        )}
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
