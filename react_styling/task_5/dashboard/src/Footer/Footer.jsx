import React from 'react';
import { getFooterCopy } from '../utils/utils'

function Footer() {
    return (
        <footer className="App-footer mt-auto border-t-4 border-main-color py-1 text-center text-xs italic min-[520px]:py-2 min-[520px]:text-sm">
            <p>Copyright 2025 - {getFooterCopy(false)}</p>
        </footer>
    )
}

export default Footer;
