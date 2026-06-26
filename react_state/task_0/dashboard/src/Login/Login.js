import React from 'react';
import './Login.css';
import { StyleSheet, css } from 'aphrodite';

function Login() {
  return (
    <div className={css(styles.appBody)}>
      <p>Login to access the full dashboard</p>
      <div className={css(styles.login)}>
        <label htmlFor="username" className={css(styles.labelStyle)}>
          Email:
          <input id="username" />
        </label>
        <label htmlFor="password" className={css(styles.labelStyle)}>
          Password:
          <input id="password" />
        </label>
        <button className={css(styles.appBodyButton)}>Ok</button>
      </div>
    </div>
  );
}

const styles = StyleSheet.create({
  appBody: {
    marginTop: '30px',
    marginLeft: '30px',
    '@media (max-width: 900px)': {
      minHeight: 0,
      margin: 0,
    },
  },
  login: {
    textAlign: 'center',
    '@media (max-width: 900px)': {
      display: 'block',
    },
  },
  labelStyle: {
    marginRight: '10px',
    '@media (max-width: 900px)': {
      display: 'block',
      marginBottom: '10px',
    },
  },
  appBodyButton: {
    textAlign: 'center',
    minHeight: '22px',
    minWidth: '30px',
    '@media (max-width: 900px)': {
      display: 'block',
    },
  },
});

export default Login;
