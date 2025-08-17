export const translations = {
  en: {
    common: {
      home: 'Home',
      signIn: 'Sign In',
      changeLanguage: 'Change Language',
      continue: 'Continue',
      back: 'Back',
      loading: 'Loading...',
      error: 'Error',
      required: 'This field is required',
    },
    welcome: {
      hero: "Let's get your car covered",
      subtitle: 'Get a quote in minutes, protect what matters most',
      startQuote: 'Start Quote',
      existingCustomer: 'Already have a policy?',
    },
    quote: {
      postcode: {
        title: 'Where are you located?',
        label: 'Postcode',
        placeholder: 'Enter your 5-digit postcode',
        help: 'This helps us fetch local pricing',
        error: {
          required: 'Postcode is required',
          invalid: 'Please enter a valid 5-digit postcode',
        },
      },
    },
    footer: {
      company: 'Company',
      about: 'About Us',
      contact: 'Contact',
      support: 'Support',
      help: 'Help Center',
      faq: 'FAQ',
      legal: 'Legal',
      privacy: 'Privacy Policy',
      terms: 'Terms of Service',
      rights: 'All rights reserved',
    },
  },
  bm: {
    common: {
      home: 'Laman Utama',
      signIn: 'Log Masuk',
      changeLanguage: 'Tukar Bahasa',
      continue: 'Teruskan',
      back: 'Kembali',
      loading: 'Memuatkan...',
      error: 'Ralat',
      required: 'Medan ini diperlukan',
    },
    welcome: {
      hero: 'Mari lindungi kereta anda',
      subtitle: 'Dapatkan sebut harga dalam beberapa minit, lindungi apa yang penting',
      startQuote: 'Mula Sebut Harga',
      existingCustomer: 'Sudah ada polisi?',
    },
    quote: {
      postcode: {
        title: 'Di manakah lokasi anda?',
        label: 'Poskod',
        placeholder: 'Masukkan poskod 5 digit anda',
        help: 'Ini membantu kami mendapatkan harga tempatan',
        error: {
          required: 'Poskod diperlukan',
          invalid: 'Sila masukkan poskod 5 digit yang sah',
        },
      },
    },
    footer: {
      company: 'Syarikat',
      about: 'Tentang Kami',
      contact: 'Hubungi',
      support: 'Sokongan',
      help: 'Pusat Bantuan',
      faq: 'Soalan Lazim',
      legal: 'Undang-undang',
      privacy: 'Dasar Privasi',
      terms: 'Terma Perkhidmatan',
      rights: 'Hak cipta terpelihara',
    },
  },
} as const;

export type Language = keyof typeof translations;
export type TranslationKey = string;