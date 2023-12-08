import { useEffect, useState } from "react";

import { Button } from "@mui/material";

import moment from "moment";

import { ReusableTable } from "../../components/common";
import { CreateNewsletterDialog } from "../../components/main";

import { HttpService } from "../../services";

import { fileSaver } from "../../utils";

export function Newsletter() {
  const [subscribers, setSubscribers] = useState([]);
  const [newsletterTags, setNewsletterTags] = useState([]);
  const [dlgOpen, setDlgOpen] = useState(false);

  const subscriberColumns = [
    {
      title: "Subscriber",
      name: "email",
    },
  ];

  const tagColumns = [
    {
      title: "Description",
      name: "content",
    },
    {
      title: "Published At",
      name: "created_at",
    },
    {
      title: "Action",
      name: "action",
    },
  ];

  const onNewsletterAdd = (newsletter) => {
    const { content, image } = newsletter;
    const form = new FormData();
    form.append("content", content);
    form.append("image", image);
    HttpService.post("/newsletter", form).then((res) => {
      const { status, newsletter } = res.data;
      if (status === 200) {
        setNewsletterTags([
          ...newsletterTags,
          {
            ...newsletter,
            created_at: moment(newsletter.created_at).format(
              "MM/DD/YYYY HH:MM A"
            ),
            action: (
              <Button variant="contained" onClick={onTagSubmit(newsletter)}>
                Submit
              </Button>
            ),
          },
        ]);
      }
    });
  };

  const onTagSubmit = (tag) => () => {
    if (!tag._id) return;
    HttpService.post(`/newsletter/subscribe/${tag._id}`, {}).then((res) => {});
  };

  const onDownClick = () => {
    HttpService.get("/event/file").then((res) => {
      fileSaver(res.data);
    });
  };

  useEffect(() => {
    HttpService.get("/subscriber").then((res) => {
      setSubscribers(res.data);
    });

    HttpService.get("/newsletter").then((res) => {
      const tags = res.data.map((tag) => ({
        ...tag,
        created_at: moment(tag.created_at).format("MM/DD/YYYY HH:MM A"),
        action: (
          <Button variant="contained" onClick={onTagSubmit(tag)}>
            Submit
          </Button>
        ),
      }));
      setNewsletterTags(tags);
    });
  }, []);

  return (
    <div className="p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl mb-4">Newsletter</h1>
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
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <ReusableTable columns={subscriberColumns} rows={subscribers} />
        </div>
        <div className="md:col-span-2">
          <ReusableTable columns={tagColumns} rows={newsletterTags} />
        </div>
      </div>
      <CreateNewsletterDialog
        open={dlgOpen}
        onClose={() => setDlgOpen(false)}
        onCreate={onNewsletterAdd}
      />
    </div>
  );
}
