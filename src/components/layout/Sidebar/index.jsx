import * as React from "react";
import { useNavigate } from "react-router-dom";

import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Toolbar from "@mui/material/Toolbar";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

const drawerWidth = 240;

const primaryNavItems = [
  {
    title: "Admission",
    path: "/admission",
  },
  {
    title: "Events",
    path: "/events",
  },
  {
    title: "Calendar",
    path: "/calendar",
  },
  {
    title: "News",
    path: "/news",
  },
  {
    title: "Newsletter",
    path: "/newsletter",
  },
  {
    title: "Atlas Quiz",
    path: "/atlas-quiz",
  },
];

const secondNavItems = [
  {
    title: "Contact",
    path: "/contact",
  },
];

export function Sidebar({ mobileOpen, handleOpenToggle }) {
  const navigate = useNavigate();

  const drawer = (
    <div className="h-full">
      <Toolbar />
      <Divider />
      <List>
        {primaryNavItems.map(({ title, path }) => (
          <ListItem key={title} disablePadding onClick={() => navigate(path)}>
            <ListItemButton>
              <ListItemIcon></ListItemIcon>
              <ListItemText primary={title} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {secondNavItems.map(({ title, path }) => (
          <ListItem key={title} disablePadding onClick={() => navigate(path)}>
            <ListItemButton>
              <ListItemIcon></ListItemIcon>
              <ListItemText primary={title} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    <Box
      component="nav"
      sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
      aria-label="mailbox folders"
    >
      {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleOpenToggle}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          display: { xs: "block", sm: "none" },
          height: "100%",
          "& .MuiDrawer-docked": {
            height: "100%",
          },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: drawerWidth,
            height: "100%",
            position: "relative",
          },
        }}
      >
        {drawer}
      </Drawer>
      <Drawer
        variant="permanent"
        sx={{
          height: "100%",
          display: { xs: "none", sm: "block" },
          "& .MuiDrawer-docked": {
            height: "100%",
          },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: drawerWidth,
            height: "100%",
            position: "relative",
          },
        }}
        open
      >
        {drawer}
      </Drawer>
    </Box>
  );
}
