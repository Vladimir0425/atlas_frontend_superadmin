import { saveAs } from "file-saver";

export const fileSaver = (data) => {
  const blob = new Blob([data], {
    type: "text/csv",
  });
  saveAs(blob, "download.csv");
};
