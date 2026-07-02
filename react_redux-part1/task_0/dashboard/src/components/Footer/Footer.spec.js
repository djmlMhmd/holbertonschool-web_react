import { render, screen } from '@testing-library/react';
import Footer from './Footer';

describe('Footer component', () => {
  test("Vérification que le texte de Copyright s'affiche, mais pas le link quand isLoggedIn est false.", () => {
    render(
      <Footer user={{ isLoggedIn: false }} />
    );
    const footerp = screen.getByText(/Copyright \d{4} - holberton School/i);
    expect(footerp).toBeInTheDocument();

    const footerLink = screen.queryByRole('link', { name: /Contact us/i });
    expect(footerLink).not.toBeInTheDocument();
  });

  test("Vérification que le texte de Copyright et le link s'affichent quand isLoggedIn est true.", () => {
    render(
        <Footer user= {{ isLoggedIn: true }} />
    );
    const footerp = screen.getByText(/Copyright \d{4} - holberton School/i);
    expect(footerp).toBeInTheDocument();

    const footerLink = screen.queryByRole('link', { name: /Contact us/i });
    expect(footerLink).toBeInTheDocument();
  });
});
