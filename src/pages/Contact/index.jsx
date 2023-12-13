import { useEffect, useState } from "react";

import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import { ReusableTable } from "../../components/common";

import { HttpService } from "../../services";
import { Button } from "@mui/material";

const globalColumns = [
  {
    title: "Name",
    name: "name",
  },
  {
    title: "Email",
    name: "email",
  },
  {
    title: "Phone",
    name: "phone",
  },
  {
    title: "Class",
    name: "class",
  },
  {
    title: "Message",
    name: "message",
  },
];

const contactTypes = [
  { name: "general", title: "General", columns: ["name", "email", "message"] },
  // {
  //   name: "brochure",
  //   title: "Brochure",
  //   columns: ["name", "email", "message"],
  // },
  {
    name: "spotting",
    title: "Secure Spot",
    columns: ["name", "email", "phone", "message"],
  },
  {
    name: "joining",
    title: "Join Class",
    columns: ["name", "email", "class", "message"],
  },
];

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`contact-tabpanel-${index}`}
      aria-labelledby={`contact-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

export function Contact() {
  const [contactType, setContactType] = useState("general");
  const [rowsData, setRowsData] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);

  const onDeleteClick = () => {
    HttpService.post("/message/delete/multiple", {
      ids: JSON.stringify(panelSelectedRows()),
    }).then((res) => {
      const message = res.data;
      if (message === "success") {
        const result = rowsData.filter(
          (item) => !panelSelectedRows().includes(item._id)
        );
        const selectedResult = selectedRows.filter(
          (item) => !panelSelectedRows().includes(item)
        );
        setRowsData(result);
        setSelectedRows(selectedResult);
      }
    });
  };

  const panelSelectedRows = () => {
    return selectedRows.filter((id) => {
      const contact = rowsData
        .filter((item) => item.type === contactType)
        .find((item) => item._id === id);
      return contact && contact.type === contactType;
    });
  };

  useEffect(() => {
    HttpService.get("/message").then((res) => {
      setRowsData(res.data);
    });
  }, []);

  return (
    <div className="p-6">
      <div className="flex justify-between items-end">
        <h1 className="text-3xl mb-4">Contact</h1>
        <Button
          color="primary"
          variant="contained"
          onClick={onDeleteClick}
          disabled={!panelSelectedRows().length}
        >
          Remove
        </Button>
      </div>

      <Box sx={{ width: "100%" }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={contactType}
            onChange={(_, newValue) => setContactType(newValue)}
            variant="scrollable"
            scrollButtons="auto"
            aria-label="scrollable auto tabs example"
          >
            {contactTypes.map((type) => (
              <Tab label={type.title} value={type.name} />
            ))}
          </Tabs>
        </Box>
        {contactTypes.map((type) => (
          <CustomTabPanel key={type.name} value={contactType} index={type.name}>
            <ReusableTable
              rows={rowsData.filter((row) => row.type === type.name)}
              columns={globalColumns.filter((column) =>
                type.columns.includes(column.name)
              )}
              selectedRows={selectedRows}
              setSelectedRows={setSelectedRows}
            />
          </CustomTabPanel>
        ))}
      </Box>
    </div>
  );
}
