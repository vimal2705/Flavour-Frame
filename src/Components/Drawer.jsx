import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { useNavigate } from "react-router-dom";
import { RiRobot2Line } from "react-icons/ri";
import LogoutIcon from "@mui/icons-material/Logout";
import FlavourFramelicon from "../assets/FlavourFrameIcon.jpeg";
import EikonifyIcon from "../assets/EikonifyIcon.png";
import probotic from "../assets/probotic.png";
import { Toolbar, Typography } from "@mui/material";

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const onLogout = () => {
  localStorage.setItem("role_access", "");
  window.location.reload();
};

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

const list = [
  {
    label: "Screen1",
    icon: (
      <img src={FlavourFramelicon} className="h-14 w-14 rounded-md shadow-md" />
    ),
    link: "/",
  },

  { label: "Log Out", icon: <LogoutIcon className="text-dark-grey" /> },
];

export default function AppDrawer({ children }) {
  const theme = useTheme();
  const navigation = useNavigate();
  const [open, setOpen] = React.useState(false); // Set the initial state of the drawer to false

  const handleDrawerOpen = () => {
    setOpen(true); // Open the drawer
  };

  const handleDrawerClose = () => {
    setOpen(false); // Close the drawer
  };

  return (
    <Box sx={{ display: "flex", flex: 1, width: "100%" }}>
      <CssBaseline />
      <AppBar open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ marginRight: "36px", ...(open && { display: "none" }) }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Navbar
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open} onClick={handleDrawerClose}>
        <DrawerHeader>
          <div className="flex flex-1 justify-center items-center">
            <RiRobot2Line size={35} color="blue" />
          </div>
        </DrawerHeader>
        <Divider />
        <List>
          {list.map(({ label, icon, link }, index) => (
            <ListItem key={index} disablePadding sx={{ display: "block" }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                }}
                onClick={() => {
                  if (link) {
                    navigation(link);
                  } else {
                    localStorage.setItem("role_access", "");
                    window.location.reload();
                  }
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                  }}
                >
                  {icon}
                </ListItemIcon>
                <ListItemText primary={label} sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
      </Drawer>
      <Box
        component="main"
        sx={{
          display: "flex",
          height: "100vh",
          width: "100vh",
          flex: 1,
          backgroundColor: "red",
        }}
      >
        {children}
      </Box>
    </Box>
  );
}
