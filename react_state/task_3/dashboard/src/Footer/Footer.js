import React from "react";
import "./Footer.css";
import { getFullYear, getFooterCopy } from "../utils/utils";
import { AppContext, userLogout } from "../App/AppContext";

function Footer() {
  const isIndex = true;

  const currentYear = getFullYear();
  const footerText = getFooterCopy(isIndex);

  return (
    <AppContext.Consumer>
      {(props) => (
        <footer className="App-footer">
          <p className="Copyright">
            Copyright {currentYear} - {footerText}
          </p>
          {props.user.isLoggedIn && <p className="ContactUs">Contact us</p>}
        </footer>
      )}
    </AppContext.Consumer>
  );
}

export default Footer;
