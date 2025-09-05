import React, { useState } from "react";
import { StyleSheet, css } from "aphrodite";

function Login({ onSubmitLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [enableSubmit, setEnableSubmit] = useState(false);

  const handleLoginSubmit = (event) => {
    event.preventDefault();
    onSubmitLogin(email, password);
  };

  function handleChangeEmail(event) {
    setEmail(event.target.value);
    if (email !== "" && password !== "") {
      setEnableSubmit(true);
    }
  }

  function handleChangePassword(event) {
    setPassword(event.target.value);
    if (email !== "" && password !== "") {
      setEnableSubmit(true);
    }
  }

  return (
    <div className={css(styles["App-body"])}>
      <p className={css(styles.pAndLabelLogin)}>
        Login to access the full dashboard
      </p>
      <div className={css(styles["App-body-notification-container"])}>
        <form>
          <label className={css(styles.pAndLabelLogin)} htmlFor="email">
            Email:
          </label>
          <input
            className={css(styles.LoginInput)}
            type="email"
            id="email"
            value={email}
            onChange={handleChangeEmail}
          />
          <label className={css(styles.pAndLabelLogin)} htmlFor="password">
            Password:
          </label>
          <input
            className={css(styles.LoginInput)}
            type="password"
            id="password"
            value={password}
            onChange={handleChangePassword}
          />
          <button
            onClick={handleLoginSubmit}
            type="submit"
            className={css(styles.LoginButton)}
            disabled={!enableSubmit}
          >
            OK
          </button>
        </form>
      </div>
    </div>
  );
}

const styles = StyleSheet.create({
  "App-body": {
    padding: "10px",
  },
  "App-body-notification-container": {
    flexGrow: 1,
    display: "flex",
    flexDirection: "row",
    height: "20px",
    "@media (max-width: 600px)": {
      flexDirection: "column",
      alignItems: "flex-start",
      button: {
        display: "inline-block",
      },
    },
  },
  pAndLabelLogin: {
    marginLeft: "8%",
    "@media (max-width: 600px)": {
      marginTop: 0,
      marginLeft: 0,
    },
  },
  LoginInput: {
    marginLeft: "10px",
    border: "1px solid #ababab",
    borderRadius: "5%",
    "@media (max-width: 600px)": {
      marginLeft: 0,
    },
  },
  LoginButton: {
    marginLeft: "10px",
    cursor: "pointer",
    border: "1px solid #ababab",
    borderRadius: "10%",
    backgroundColor: "white",
  },
});

export default Login;
