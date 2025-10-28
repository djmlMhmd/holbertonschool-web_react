import React, { useContext } from 'react';
import logo from "../assets/logo.jpg"
import { StyleSheet, css } from "aphrodite";
import { AppContext } from "../App/AppContext";

function Header() {
    const context = useContext(AppContext);
    return (
        <>
            <div className={css(styles.header)} id="Header">
                <img className={css(styles.image)} src={logo} alt="" />
                <h1 className={css(styles.h1)}>School dashboard</h1>
            </div>

            {context.user.isLoggedIn && (
                <div id="logoutSection">
                    <h1>Welcome {context.user.email} 
                        <a onClick={context.logOut}>
                            <em>(logOut)</em>
                        </a>
                    </h1>
                </div>
            )}
        </>
    )
}

const styles = StyleSheet.create({
    header: {
        display: "flex",
        margin: "0 2%",
        alignItems: "center",
    },

    image: {
        width: "220px",
    },
    h1: {
        color: "#E0344B",
        fontSize: "35px",

    }
})

export default Header