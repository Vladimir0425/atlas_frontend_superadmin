import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

import AlertDialog from "../../common/dialog/AlertDialog";

import moment from "moment";
import { Backdrop, Typography } from "@mui/material";

const ranges = [
  "8 AM - 10 AM",
  "10 AM - 12 AM",
  "12 AM - 14 AM",
  "14 AM - 16 AM",
  "16 AM - 17 AM",
];

const emptySchedules = Array(5).fill("");

export function CreateScheduleDialog({
  open,
  onClose,
  onCreate,
  onUpdate,
  schedules,
  currentDay,
}) {
  const [alertOpen, setAlertOpen] = React.useState(false);
  const [alertGrade, setAlertGrade] = React.useState(4);
  const [grade, setGrade] = React.useState(4);
  const [curSchedule, setCurSchedule] = React.useState({});
  const [gradeSchedules, setGradeSchedules] = React.useState(emptySchedules);
  const [isEdit, setIsEdit] = React.useState(false);
  const [isDirty, setIsDirty] = React.useState(false);

  const handleRefresh = () => {
    setAlertOpen(false);
    setAlertGrade(4);
    setGrade(4);
    setIsEdit(false);
    setIsDirty(false);
  };

  const handleClose = () => {
    onClose();
  };

  const handleSave = () => {
    if (isEdit) {
      onUpdate({ ...curSchedule, schedules: gradeSchedules });
    } else {
      onCreate(grade, gradeSchedules);
    }
  };

  const onGradeChange = (e) => {
    if (!isDirty) {
      setGrade(e.target.value);
    } else {
      setAlertGrade(e.target.value);
      setAlertOpen(true);
    }
  };

  const onGradeScheduleChange = (index) => (e) => {
    setIsDirty(true);
    setGradeSchedules(
      gradeSchedules.map((schedule, _index) =>
        _index === index ? e.target.value : schedule
      )
    );
  };

  const onGradeScheduleSave = (directGrade) => {
    handleSave();
    setAlertOpen(false);
    setGrade(directGrade);
  };

  const onGradeScheduleNotSave = (directGrade) => {
    setAlertOpen(false);
    setGrade(directGrade);
  };

  React.useEffect(() => {
    if (schedules === null) return;
    console.log(schedules);
    const item = schedules.find((item) => item.grade === grade);
    if (!item) {
      setIsEdit(false);
      setGradeSchedules(emptySchedules);
    } else {
      setIsEdit(true);
      setGradeSchedules(item.schedules);
      setCurSchedule(item);
    }
    setIsDirty(false);
  }, [schedules, grade]);

  return (
    <Dialog open={open} onClose={handleClose} fullWidth>
      <DialogTitle sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="span" fontSize={24}>
          Schedule{" "}
          <Typography variant="span" color="gray" fontSize={18}>
            {moment(currentDay).format("MM/DD/YYYY")}
          </Typography>
        </Typography>
        <FormControl>
          <InputLabel id="grade-select-label">Grade</InputLabel>
          <Select
            labelId="grade-select-label"
            id="grade-select"
            label="Grade"
            value={grade}
            onChange={onGradeChange}
            fullWidth
          >
            {[4, 5, 6, 7, 8].map((_grade) => (
              <MenuItem key={_grade} value={_grade}>
                {_grade}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </DialogTitle>
      <DialogContent>
        {ranges.map((range, index) => (
          <TextField
            key={range}
            label={range}
            value={gradeSchedules[index]}
            onChange={onGradeScheduleChange(index)}
            margin="dense"
            color={gradeSchedules[index] !== "" ? "success" : "primary"}
            focused={gradeSchedules[index] !== "" ? true : false}
            fullWidth
          />
        ))}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Close</Button>
        <Button
          onClick={handleSave}
          variant="contained"
          color="primary"
          disabled={!isDirty}
        >
          {isEdit ? "Update" : "Create"}
        </Button>
      </DialogActions>
      <AlertDialog
        open={alertOpen}
        onClose={() => setAlertOpen(false)}
        onIgnore={onGradeScheduleNotSave}
        onSubmit={onGradeScheduleSave}
        title={"Warning!"}
        description={"Do you want to save the changes?"}
        data={alertGrade}
      />
    </Dialog>
  );
}
