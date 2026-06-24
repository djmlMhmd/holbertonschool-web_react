import React from 'react';
import holbertonLogo from '../assets/holberton-logo.jpg';

function Header() {
    return (
        <header className="flex items-center border-b-4 border-main-color">
            <img className="h-60" src={holbertonLogo} alt="holberton logo" />
            <h1 className="text-5xl font-bold tracking-wide text-main-color md:text-6xl">
                School Dashboard
            </h1>
        </header>
    );
}

export default Header;
