import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import Header from './Header';

const userTest = {
  email: 'fallen.albaz@gmail.com',
  password: 'azertyuiop',
  isLoggedIn: true,
}

const defaultUser = {
  email: '',
  password: '',
  isLoggedIn: false,
}

describe('Header component', () => {
  test('Vérification texte h1 App-header', () => {
    render(<Header user={defaultUser} logOut={() => {}} />);
    const headerh1 = screen.getByRole('heading', { level: 1, name: /School dashboard/i });
    expect(headerh1).toBeInTheDocument();
  });

  test('Vérification alt image App-header', () => {
    render(<Header user={defaultUser} logOut={() => {}} />);
    const headerImgAlt = screen.getByAltText(/holberton logo/i);
    expect(headerImgAlt).toBeInTheDocument();
  });

  // Tests avec le contexte
  test("Vérification de l'absence de la section #logoutSection par défaut", () => {
    render(<Header user={defaultUser} logOut={() => {}} />);
    const section = document.querySelector('#logoutSection');
    expect(section).not.toBeInTheDocument();
  });

  test("Vérification de la présence de la section #logoutSection quand le contexte de l'user a isLoggedIn à true.", () => {
    render(<Header user={userTest} logOut={() => {}} />);
    const section = document.querySelector('#logoutSection');
    expect(section).toBeInTheDocument();
  });

  test("Vérification de l'appel à la fonction logOut quand on clique sur '(logout)' quand le contexte de l'user a isLoggedIn à true", async () => {
    const user = userEvent.setup();

    const logOutSpy = jest.fn();
    render(<Header user={userTest} logOut={logOutSpy} />);
    const section = document.querySelector('#logoutSection');
    expect(section).toBeInTheDocument();

    const logoutLink = screen.getByRole('link', { name: /logout/i });
    await user.click(logoutLink);

    expect(logOutSpy).toHaveBeenCalledTimes(1);
  });
});
