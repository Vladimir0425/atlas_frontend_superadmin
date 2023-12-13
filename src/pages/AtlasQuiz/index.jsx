import { useState, useEffect } from "react";

import { HttpService } from "../../services";
import { ReusableTable } from "../../components";
import { Button } from "@mui/material";

import { fileSaver } from "../../utils";

export function AtlasQuiz() {
  const [rowsData, setRowsData] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);

  const columns = [
    {
      title: "Email",
      name: "email",
    },
    {
      title: "Like Choice",
      name: "likeItem",
    },
    {
      title: "Distinction",
      name: "distinction",
    },
    {
      title: "Dislike Choice",
      name: "dislikeItem",
    },
  ];

  const onDownClick = () => {
    HttpService.get("/isright/file").then((res) => {
      fileSaver(res.data);
    });
  };

  const onDelClick = () => {
    HttpService.post("/admission/delete/multiple", {
      ids: JSON.stringify(selectedRows),
    }).then((res) => {
      const message = res.data;
      if (message === "success") {
        const result = rowsData.filter(
          (item) => !selectedRows.includes(item._id)
        );
        setRowsData(result);
        setSelectedRows([]);
      }
    });
  };

  useEffect(() => {
    HttpService.get("/isright").then((res) => {
      const data = res.data;
      setRowsData(data);
    });
  }, []);

  return (
    <div className="p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl mb-4">Atlas Quiz</h1>
        <div className="flex gap-x-4">
          <Button
            color="error"
            variant="contained"
            onClick={onDelClick}
            disabled={!selectedRows.length}
          >
            Remove
          </Button>
          <Button color="info" variant="contained" onClick={onDownClick}>
            Download
          </Button>
        </div>
      </div>
      <ReusableTable
        columns={columns}
        rows={rowsData}
        selectedRows={selectedRows}
        setSelectedRows={setSelectedRows}
      />
    </div>
  );
}
