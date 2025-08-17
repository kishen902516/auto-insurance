import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Home from './page';

// Mock the useLanguage hook
jest.mock('@/lib/i18n/LanguageContext', () => ({
  useLanguage: () => ({
    language: 'en',
    t: (key: string) => {
      const translations: Record<string, string> = {
        'welcome.hero': "Let's get your car covered",
        'welcome.subtitle': 'Get a quote in minutes, protect what matters most',
        'welcome.startQuote': 'Start Quote',
        'welcome.existingCustomer': 'Already have a policy?',
        'common.signIn': 'Sign In',
      };
      return translations[key] || key;
    },
    toggleLanguage: jest.fn(),
    setLanguage: jest.fn(),
  }),
}));

describe('Home Page', () => {
  it('renders the welcome hero text', () => {
    render(<Home />);
    const heroText = screen.getByText("Let's get your car covered");
    expect(heroText).toBeInTheDocument();
  });

  it('renders the start quote button', () => {
    render(<Home />);
    const startButton = screen.getByText('Start Quote');
    expect(startButton).toBeInTheDocument();
    expect(startButton.closest('a')).toHaveAttribute('href', '/quote/postcode');
  });

  it('renders the sign in link', () => {
    render(<Home />);
    const signInLink = screen.getByText('Sign In');
    expect(signInLink).toBeInTheDocument();
    expect(signInLink.closest('a')).toHaveAttribute('href', '/signin');
  });

  it('renders feature cards', () => {
    render(<Home />);
    expect(screen.getByText('Instant Quotes')).toBeInTheDocument();
    expect(screen.getByText('NCD Verification')).toBeInTheDocument();
    expect(screen.getByText('JPJ Compliant')).toBeInTheDocument();
  });
});