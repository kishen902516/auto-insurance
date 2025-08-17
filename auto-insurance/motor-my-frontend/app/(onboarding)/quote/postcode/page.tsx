'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { TextField } from '@/components/forms/TextField';
import { Button } from '@/components/common/Button';
import { StepHeader } from '@/components/layout/StepHeader';
import { StickyCTA } from '@/components/layout/StickyCTA';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import { useAutosave } from '@/lib/hooks/useAutosave';
import { createQuoteSession } from '@/lib/api/quote';

export default function PostcodePage() {
  const router = useRouter();
  const { t } = useLanguage();
  const [postcode, setPostcode] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [sessionId, setSessionId] = useState<string | null>(null);

  // Load saved session on mount
  useEffect(() => {
    const savedSessionId = localStorage.getItem('quote_session_id');
    const savedPostcode = localStorage.getItem('quote_postcode');
    if (savedSessionId) {
      setSessionId(savedSessionId);
    }
    if (savedPostcode) {
      setPostcode(savedPostcode);
    }
  }, []);

  // Autosave functionality
  useAutosave({
    value: postcode,
    onSave: (value) => {
      if (value) {
        localStorage.setItem('quote_postcode', value);
      }
    },
    delay: 500,
  });

  const validatePostcode = useCallback((value: string): boolean => {
    if (!value) {
      setError(t('quote.postcode.error.required'));
      return false;
    }
    if (!/^\d{5}$/.test(value)) {
      setError(t('quote.postcode.error.invalid'));
      return false;
    }
    setError('');
    return true;
  }, [t]);

  const handlePostcodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 5);
    setPostcode(value);
    if (error) {
      validatePostcode(value);
    }
  };

  const handleSubmit = useCallback(async (e?: React.FormEvent) => {
    e?.preventDefault();
    
    if (!validatePostcode(postcode)) {
      return;
    }

    setIsLoading(true);
    try {
      // Create or update quote session
      const session = await createQuoteSession({ postcode });
      setSessionId(session.id);
      localStorage.setItem('quote_session_id', session.id);
      localStorage.setItem('quote_postcode', postcode);
      
      // Navigate to next step
      router.push('/quote/driver');
    } catch (err) {
      console.error('Failed to create quote session:', err);
      setError('Failed to create quote session. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, [postcode, router, validatePostcode]);

  const isValid = postcode.length === 5 && !error;
  const buttonText = isLoading ? t('common.loading') : t('common.continue');

  return (
    <>
      <StepHeader
        title={t('quote.postcode.title')}
        currentStep={1}
        totalSteps={6}
      />

      <div className="container mx-auto px-4 py-8 max-w-lg">
        <form onSubmit={handleSubmit} className="space-y-6">
          <TextField
            label={t('quote.postcode.label')}
            placeholder={t('quote.postcode.placeholder')}
            value={postcode}
            onChange={handlePostcodeChange}
            error={error}
            helpText={t('quote.postcode.help')}
            required
            maxLength={5}
            inputMode="numeric"
            pattern="\d{5}"
            autoComplete="postal-code"
            disabled={isLoading}
          />

          {/* Desktop Continue Button */}
          <div className="hidden md:block">
            <Button
              type="submit"
              disabled={!isValid}
              isLoading={isLoading}
              className="w-full"
            >
              {buttonText}
            </Button>
          </div>
        </form>
      </div>

      {/* Mobile Sticky CTA */}
      <StickyCTA>
        <Button
          onClick={() => handleSubmit()}
          disabled={!isValid}
          isLoading={isLoading}
          className="w-full"
        >
          {buttonText}
        </Button>
      </StickyCTA>
    </>
  );
}