import React from "react";
import logo from "../assets/holberton-logo.jpg";
import { StyleSheet, css } from "aphrodite";
import { useContext } from "react";
import { AppContext } from "../App/AppContext";

function Header() {
  const { user, logOut } = useContext(AppContext);

  return (
    <header className={css(styles.appHeader)}>
      <img src={logo} className={css(styles.img)} alt="logo" />
      <h1 className={css(styles.h1)}>School dashboard</h1>
      {user.isLoggedIn && (
        <div id="logoutSection">
          Welcome {user.email} (
          <a href="#logout" onClick={logOut}>
            {" "}
            logout{" "}
          </a>
          )
        </div>
      )}
    </header>
  );
}

const styles = StyleSheet.create({
  appHeader: {
    display: "flex",
    alignItems: "center",
    borderBottom: "3px solid #E0354B",
  },

  h1: {
    color: "#E0354B",
    "@media (max-width: 600px)": {
      fontSize: "22px",
    },
  },

  img: {
    width: "200px",
    height: "200px",
    "@media (max-width: 600px)": {
      width: "100px",
      height: "100px",
    },
  },
});

export default Header;
