import { useEffect, useState } from "react";

import { Button } from "@mui/material";

import { ReusableTable } from "../../components/common";
import { CreateEventDialog } from "../../components/main";

import { HttpService } from "../../services";

import { fileSaver } from "../../utils";

import moment from "moment";

export function Events() {
  const [rowsData, setRowsData] = useState([]);
  const [dlgOpen, setDlgOpen] = useState(false);
  const columns = [
    {
      title: "Name",
      name: "name",
    },
    {
      title: "Author",
      name: "author",
    },
    {
      title: "Address",
      name: "address",
    },
    {
      title: "Duration",
      name: "duration",
    },
    {
      title: "Price",
      name: "price",
    },
  ];

  const onAddEvent = (event) => {
    const body = {
      ...event,
      date: event.date.toISOString(),
      start_time: event.time[0].toISOString(),
      end_time: event.time[1].toISOString(),
    };
    HttpService.post("/event", body).then((res) => {
      const date = event.date.toISOString().slice(0, 10);
      const data = {
        ...event,
        duration: date,
      };
      setRowsData([...rowsData, data]);
    });
  };

  const onDownClick = () => {
    HttpService.get("/event/file").then((res) => {
      fileSaver(res.data);
    });
  };

  useEffect(() => {
    HttpService.get("/event").then((res) => {
      const data = res.data;
      const resData = data.map((item) => ({
        ...item,
        duration: `${moment(item.start_time).format("MM/DD/YYYY")} ${moment(
          item.start_time
        ).format("HHA")} to ${moment(item.end_date).format("HHA")}`,
      }));
      setRowsData(resData);
    });
  }, []);

  return (
    <div className="p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl mb-4">Events</h1>
        <div className="flex gap-4">
          <Button
            color="primary"
            variant="contained"
            onClick={() => setDlgOpen(true)}
          >
            Add
          </Button>
          <Button color="secondary" variant="contained" onClick={onDownClick}>
            Download
          </Button>
        </div>
      </div>
      <ReusableTable columns={columns} rows={rowsData} />
      <CreateEventDialog
        open={dlgOpen}
        onClose={() => setDlgOpen(false)}
        onCreate={onAddEvent}
      />
    </div>
  );
}
