import { useState, useEffect } from "react";

import { HttpService } from "../../services";
import { ReusableTable } from "../../components";
import { Button } from "@mui/material";

import { fileSaver } from "../../utils";

export function AtlasQuiz() {
  const [rowsData, setRowsData] = useState([]);
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
        <Button color="secondary" variant="contained" onClick={onDownClick}>
          Download
        </Button>
      </div>
      <ReusableTable columns={columns} rows={rowsData} />
    </div>
  );
}
