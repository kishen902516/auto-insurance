import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { LanguageProvider, useLanguage } from './LanguageContext';

// Mock js-cookie
jest.mock('js-cookie', () => ({
  get: jest.fn(),
  set: jest.fn(),
}));

// Test component that uses the hook
function TestComponent() {
  const { language, toggleLanguage, t } = useLanguage();
  
  return (
    <div>
      <span data-testid="language">{language}</span>
      <span data-testid="translation">{t('welcome.hero')}</span>
      <button onClick={toggleLanguage} data-testid="toggle">
        Toggle Language
      </button>
    </div>
  );
}

describe('LanguageContext', () => {
  it('provides default language as English', () => {
    render(
      <LanguageProvider>
        <TestComponent />
      </LanguageProvider>
    );
    
    expect(screen.getByTestId('language')).toHaveTextContent('en');
  });

  it('translates text correctly', () => {
    render(
      <LanguageProvider>
        <TestComponent />
      </LanguageProvider>
    );
    
    expect(screen.getByTestId('translation')).toHaveTextContent("Let's get your car covered");
  });

  it('toggles language when toggle function is called', () => {
    render(
      <LanguageProvider>
        <TestComponent />
      </LanguageProvider>
    );
    
    const toggleButton = screen.getByTestId('toggle');
    fireEvent.click(toggleButton);
    
    expect(screen.getByTestId('language')).toHaveTextContent('bm');
  });

  it('returns fallback for missing translation keys', () => {
    function TestMissingKey() {
      const { t } = useLanguage();
      return <span data-testid="missing">{t('missing.key')}</span>;
    }

    render(
      <LanguageProvider>
        <TestMissingKey />
      </LanguageProvider>
    );
    
    expect(screen.getByTestId('missing')).toHaveTextContent('missing.key');
  });

  it('throws error when used outside provider', () => {
    const consoleError = jest.spyOn(console, 'error').mockImplementation(() => {});
    
    expect(() => render(<TestComponent />)).toThrow('useLanguage must be used within a LanguageProvider');
    
    consoleError.mockRestore();
  });
});