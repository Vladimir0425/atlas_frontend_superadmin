import React, { useEffect, useState } from "react";

import { CreateScheduleDialog } from "../../components/main/Calendar/CreateScheduleDialog";

import { styled } from "@mui/material/styles";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { PickersDay } from "@mui/x-date-pickers/PickersDay";
import moment from "moment";
import { HttpService } from "../../services";

const CustomPickersDay = styled(PickersDay, {
  shouldForwardProp: (prop) => prop !== "isSelected" && prop !== "isHovered",
})(({ theme, isSelected, isHovered, day }) => ({
  borderRadius: 0,
  ...(isSelected && {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    "&:hover, &:focus": {
      backgroundColor: theme.palette.primary.main,
    },
  }),
  ...(isHovered && {
    backgroundColor: theme.palette.primary[theme.palette.mode],
    "&:hover, &:focus": {
      backgroundColor: theme.palette.primary[theme.palette.mode],
    },
  }),
  ...(day.day() === 0 && {
    borderTopLeftRadius: "50%",
    borderBottomLeftRadius: "50%",
  }),
  ...(day.day() === 6 && {
    borderTopRightRadius: "50%",
    borderBottomRightRadius: "50%",
  }),
}));

const isInSameWeek = (dayA, dayB) => {
  if (dayB == null) {
    return false;
  }

  return dayA.isSame(dayB, "week");
};

function Day(props) {
  const { day, selectedDay, hoveredDay, ...other } = props;

  return (
    <CustomPickersDay
      {...other}
      day={day}
      sx={{ px: 2.5 }}
      disableMargin
      selected={false}
      isSelected={isInSameWeek(day, selectedDay)}
      isHovered={isInSameWeek(day, hoveredDay)}
    />
  );
}

export function Calendar() {
  const [hoveredDay, setHoveredDay] = React.useState(null);
  const [value, setValue] = React.useState(moment(new Date()));
  const [dlgOpen, setDlgOpen] = React.useState(false);
  const [schedules, setSchedules] = React.useState(null);

  const onScheduleCreate = (grade, schedules) => {
    const body = { grade, date: moment(value).format("YYYY-MM-DD"), schedules };
    HttpService.post(`/calendar`, body).then((res) => {
      setSchedules([...schedules, res.data]);
    });
  };

  const onScheduleUpdate = (schedule) => {
    const scheduleId = schedule._id;
    delete schedule._id;
    HttpService.put(`/calendar/${scheduleId}`, schedule).then(() => {
      setSchedules(
        schedules.map((item) => (item._id === scheduleId ? schedule : item))
      );
    });
  };

  useEffect(() => {
    const currentDay = moment(value).format("YYYY-MM-DD");
    HttpService.get(`/calendar?from=${currentDay}&to=${currentDay}`).then(
      (res) => {
        setSchedules(res.data);
      }
    );
  }, [value]);

  return (
    <div className="p-6">
      <h1 className="text-3xl mb-4">School Calendar</h1>
      <DateCalendar
        value={value}
        onChange={(newValue) => setValue(newValue)}
        showDaysOutsideCurrentMonth
        displayWeekNumber
        slots={{ day: Day }}
        slotProps={{
          day: (ownerState) => ({
            selectedDay: value,
            hoveredDay,
            onPointerEnter: () => setHoveredDay(ownerState.day),
            onPointerLeave: () => setHoveredDay(null),
            onPointerDown: () => {
              setValue(ownerState.day);
              setDlgOpen(true);
            },
          }),
        }}
      />
      <CreateScheduleDialog
        open={dlgOpen}
        onClose={() => setDlgOpen(false)}
        onCreate={onScheduleCreate}
        onUpdate={onScheduleUpdate}
        schedules={schedules}
        currentDay={value}
      />
    </div>
  );
}
