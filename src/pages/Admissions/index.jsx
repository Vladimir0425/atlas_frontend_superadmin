import { useEffect, useState } from "react";

import { ReusableTable } from "../../components/common";

import { HttpService } from "../../services";

import { fileSaver } from "../../utils";

import moment from "moment/moment";
import { Button } from "@mui/material";

export function Admissions() {
  const [rowsData, setRowsData] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const columns = [
    {
      title: "Student name",
      name: "student_name",
    },
    {
      title: "Parent name",
      name: "parent_name",
    },
    {
      title: "Date of birth",
      name: "birth_date",
    },
    {
      title: "Grade level 2023-2024",
      name: "grade_level",
    },
    {
      title: "Email",
      name: "email",
    },
    {
      title: "Phone Number",
      name: "phone_number",
    },
    {
      title: "Zipcode",
      name: "zipcode",
    },
    {
      title: "About student",
      name: "about",
    },
    {
      title: "Supply Fee",
      name: "fee_type",
    },
  ];

  const onDownClick = () => {
    HttpService.get("/admission/file").then((res) => {
      fileSaver(res.data);
    });
  };

  const onDeleteClick = () => {
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
    HttpService.get("/admission").then((res) => {
      const data = res.data.map((item) => ({
        ...item,
        student_name: `${item.student_last_name} ${item.student_first_name}`,
        parent_name: `${item.parent_last_name} ${item.parent_first_name}`,
        birth_date: moment(item.birth_date).format("MM/DD/YYYY"),
      }));
      setRowsData(data);
    });
  }, []);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl mb-4">Admissions</h1>
        <div className="flex gap-x-2">
          <Button
            color="error"
            variant="contained"
            onClick={onDeleteClick}
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
