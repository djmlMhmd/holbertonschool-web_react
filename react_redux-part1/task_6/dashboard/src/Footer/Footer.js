import React from 'react';
import { getFullYear, getFooterCopy } from "../utils/utils";
import {StyleSheet, css} from "aphrodite";

import {AppContext} from '../App/AppContext';

function Footer() {
    const {user} = React.useContext(AppContext);
    return (
        <AppContext.Provider value={{user: user.isLoggedIn}}>
            <div className="footer">
                {user.isLoggedIn ? 
                        <p className={css(styles.copyright)}><a href="#">Contact US</a></p>
                                : 
                        <p className={css(styles.copyright)}>Copyright {getFullYear()} - {getFooterCopy(true)}</p>
                }
                
            </div>
        </AppContext.Provider>
    );
}

const styles = StyleSheet.create({
    copyright: {
        fontSize: "18px",
        fontStyle: "italic",
        fontWeight: "bold"
      }
})

export default Footer;