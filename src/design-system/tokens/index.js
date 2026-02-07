export const colors = {
  brand: {
    25: '#fff9eb',
    50: '#fff4d6',
    100: '#ffeab3',
    200: '#ffdd80',
    300: '#ffcf4d',
    400: '#ffbf1a',
    500: '#EFB708', // Main Gold
    600: '#d6a200',
    700: '#b38a00',
    800: '#917100',
    900: '#6f5800',
    950: '#402f00',
  },
  gray: {
    25: '#fafafa',
    50: '#f4f4f5',
    100: '#e4e4e7',
    200: '#d4d4d8',
    300: '#a1a1aa',
    400: '#71717a',
    500: '#52525b',
    600: '#3f3f46',
    700: '#27272a',
    800: '#18181b',
    900: '#09090b',
    950: '#020202',
  },
  success: {
    25: '#f6fef9',
    50: '#ecfdf3',
    100: '#d1fadf',
    200: '#a6f4c5',
    300: '#6ce9a6',
    400: '#32d583',
    500: '#12b76a',
    600: '#039855',
    700: '#027a48',
    800: '#05603a',
    900: '#054f31',
    950: '#053321',
  },
  error: {
    25: '#fffbfa',
    50: '#fef3f2',
    100: '#fee4e2',
    200: '#fecdca',
    300: '#fda29b',
    400: '#f97066',
    500: '#f04438',
    600: '#d92d20',
    700: '#b42318',
    800: '#912018',
    900: '#7a271a',
    950: '#55160c',
  },
  warning: {
    25: '#fffcf5',
    50: '#fffaeb',
    100: '#fef0c7',
    200: '#fedf89',
    300: '#fec84b',
    400: '#fdb022',
    500: '#f79009',
    600: '#dc6803',
    700: '#b54708',
    800: '#93370d',
    900: '#7a2e0e',
    950: '#4e1d09',
  },
  base: {
    white: '#ffffff',
    black: '#000000',
    transparent: 'transparent',
  },
  accent: {
    pink: '#ee46bc',
    purple: '#7a5af8',
  }
};

export const typography = {
  fontFamily: {
    sans: ['Outfit', 'sans-serif'],
  },
  fontSize: {
    'title-2xl': ['72px', '90px'],
    'title-xl': ['60px', '72px'],
    'title-lg': ['48px', '60px'],
    'title-md': ['36px', '44px'],
    'title-sm': ['30px', '38px'],
    'theme-xl': ['20px', '30px'],
    'theme-sm': ['14px', '20px'],
    'theme-xs': ['12px', '18px'],
  },
};

export const spacing = {
  // Mapping tailwind defaults if needed, but assuming standard tailwind usage
  container: 'p-4 sm:p-6 lg:p-8',
};

export const shadows = {
  'theme-xs': '0px 1px 2px 0px rgba(0, 0, 0, 0.2)',
  'theme-sm': '0px 1px 3px 0px rgba(0, 0, 0, 0.3), 0px 1px 2px 0px rgba(0, 0, 0, 0.2)',
  'theme-md': '0px 4px 8px -2px rgba(0, 0, 0, 0.3), 0px 2px 4px -2px rgba(0, 0, 0, 0.2)',
  'theme-lg': '0px 12px 16px -4px rgba(0, 0, 0, 0.4), 0px 4px 6px -2px rgba(0, 0, 0, 0.2)',
  'theme-xl': '0px 20px 24px -4px rgba(0, 0, 0, 0.5), 0px 8px 8px -4px rgba(0, 0, 0, 0.3)',
};

export const zIndex = {
  1: 1,
  9: 9,
  99: 99,
  999: 999,
  9999: 9999,
  99999: 99999,
};
