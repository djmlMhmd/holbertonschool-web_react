import React from 'react';
import { StyleSheet, css } from 'aphrodite';

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoggedIn: false,
      email: '',
      password: '',
      enableSubmit: false,
    };

    this.handleLoginSubmit = this.handleLoginSubmit.bind(this);
    this.handleChangeEmail = this.handleChangeEmail.bind(this);
    this.handleChangePassword = this.handleChangePassword.bind(this);
  }

  updateSubmitState(email, password) {
    const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    const isValidPassword = password.length >= 8;

    this.setState({
      enableSubmit: Boolean(email && password && isValidEmail && isValidPassword),
    });
  }

  handleLoginSubmit(event) {
    event.preventDefault();
    this.setState({ isLoggedIn: true });
  }

  handleChangeEmail(event) {
    const email = event.target.value;

    this.setState({ email }, () => {
      this.updateSubmitState(this.state.email, this.state.password);
    });
  }

  handleChangePassword(event) {
    const password = event.target.value;

    this.setState({ password }, () => {
      this.updateSubmitState(this.state.email, this.state.password);
    });
  }

  render() {
    const { email, password, enableSubmit } = this.state;

    return (
      <div className={css(styles.appBody)}>
        <p>Login to access the full dashboard</p>
        <form className={css(styles.form)} onSubmit={this.handleLoginSubmit}>
          <label htmlFor="email" className={css(styles.label)}>
            Email:
          </label>
          <input
            id="email"
            name="email"
            type="email"
            value={email}
            onChange={this.handleChangeEmail}
          />

          <label htmlFor="password" className={css(styles.label)}>
            Password:
          </label>
          <input
            id="password"
            name="password"
            type="password"
            value={password}
            onChange={this.handleChangePassword}
          />

          <input
            type="submit"
            value="OK"
            disabled={!enableSubmit}
            className={css(styles.submit)}
          />
        </form>
      </div>
    );
  }
}

const styles = StyleSheet.create({
  appBody: {
    marginTop: '30px',
    marginLeft: '30px',
  },
  form: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    flexWrap: 'wrap',
  },
  label: {
    marginRight: '4px',
  },
  submit: {
    minWidth: '40px',
  },
});

export default Login;
