import { useEffect, useState } from "react";
import moment from "moment";

import Button from "@mui/material/Button";

import { ReusableTable } from "../../components/common";
import { CreateNewsDialog } from "../../components/main";

import { HttpService } from "../../services";
import { fileSaver } from "../../utils";

export function News() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [rowsData, setRowsData] = useState([]);
  const columns = [
    {
      title: "Post Format",
      name: "type",
    },
    {
      title: "Title",
      name: "title",
    },
    {
      title: "Description",
      name: "content",
    },
    {
      title: "Author",
      name: "posted_by",
    },
    {
      title: "Posted at",
      name: "created_at",
    },
  ];

  const onNewsCreate = (data, files) => {
    HttpService.post("/news", data).then((res) => {
      const news = res.data;

      console.log(files);
      if (!files) return;

      let formData = new FormData();
      for (let i = 0; i < files.length; i++) formData.append("files", files[i]);

      HttpService.post(`/news/image?id=${news._id}`, formData).then((res) => {
        const resData = res.data;
        setRowsData([...rowsData, resData]);
      });
    });
  };

  const onDownClick = () => {
    HttpService.get("/news/file").then((res) => {
      fileSaver(res.data);
    });
  };

  useEffect(() => {
    HttpService.get("/news").then((res) => {
      const data = res.data;
      const resData = data.map((item) => ({
        ...item,
        created_at: moment(new Date(item.created_at)).format(
          "MM/DD/YYYY HH:MM A"
        ),
      }));
      setRowsData(resData);
    });
  }, []);

  return (
    <div className="p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl mb-4">News</h1>
        <div className="flex gap-4">
          <Button
            color="primary"
            variant="contained"
            onClick={() => setDialogOpen(true)}
          >
            Add
          </Button>
          <Button color="secondary" variant="contained" onClick={onDownClick}>
            Download
          </Button>
        </div>
      </div>
      <ReusableTable columns={columns} rows={rowsData} />
      <CreateNewsDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(!dialogOpen)}
        onCreate={onNewsCreate}
      />
    </div>
  );
}
