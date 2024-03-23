import React from "react";
import { useTheme, useMediaQuery } from "@mui/material";
import { AppBar, Toolbar, Typography } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import AppDrawer from "./Drawer";
import { Link } from "react-router-dom";

const Navbar = ({ children }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <React.Fragment>
      {isMobile ? (
        <AppDrawer>{children}</AppDrawer>
      ) : (
        <RegularNavbar>{children}</RegularNavbar>
      )}
    </React.Fragment>
  );
};

const RegularNavbar = ({ children }) => {
  const onLogout = () => {
    localStorage.setItem("role_access", "");
    window.location.reload();
  };
  return (
    <React.Fragment>
      <AppBar position="fixed">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Navbar
          </Typography>
          <div>
            <Link to="/" style={{ textDecoration: "none", color: "white" }}>
              Home
            </Link>
            <span
              onClick={onLogout}
              style={{ textDecoration: "none", color: "white", marginLeft: 20 }}
            >
              Log Out
            </span>
          </div>
        </Toolbar>
      </AppBar>
      <div style={{ marginTop: "64px" }}>{children}</div>
    </React.Fragment>
  );
};

export default Navbar;
