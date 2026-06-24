import React from 'react';
import { getCurrentYear, getFooterCopy } from '../utils/utils';

function Footer() {
    return (
        <footer className="App-footer mt-auto border-t-4 border-main-color py-4 text-center text-[0.8rem] italic">
            <p>Copyright {getCurrentYear()} - {getFooterCopy(true)}</p>
        </footer>
    );
}

export default Footer;
