import React from 'react';
import holbertonLogo from '../assets/holberton-logo.jpg';

function Header() {
    return (
        <header className="flex flex-col items-center border-b-0 border-main-color px-4 pb-5 pt-2 text-center min-[520px]:border-b-4 min-[520px]:pb-6 min-[912px]:flex-row min-[912px]:justify-start min-[912px]:text-left">
            <img className="h-44 min-[520px]:h-52 min-[912px]:h-60" src={holbertonLogo} alt="holberton logo" />
            <h1 className="whitespace-nowrap text-[1.75rem] font-bold tracking-wide text-main-color min-[520px]:text-5xl min-[912px]:text-6xl">
                School Dashboard
            </h1>
        </header>
    );
}

export default Header;
