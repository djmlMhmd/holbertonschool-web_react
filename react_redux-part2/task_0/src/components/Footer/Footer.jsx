// External libraries.
import { useSelector } from 'react-redux';

// Components.
import { getCurrentYear, getFooterCopy } from '../../utils/utils';

function Footer() {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  return (
    <footer className='App-footer' style={{ textAlign: 'center' }}>
      {isLoggedIn && (
        <a href="#" aria-label="Contact us link">
          Contact us
        </a>
      )}

      <p style={{ marginTop: '0.5rem' }}>Copyright {getCurrentYear()} - {getFooterCopy(true)}</p>
    </footer>
  );
}

export default Footer;
