import { ITheme } from './interfaces/styled';

export const baseTheme: ITheme = {
  colors: {
    primary: '#2e38b3',
    secondary: '#2b2b2b',
    success: '#4caf50',
    danger: '#f44336 ',
    lightGrey: '#d6d6d6',
    grey: '#bfbfbf',
    white: '#fff',

    button: {
      bg: '#2e38b3',
      hover: '#2249b3',
      green: '#439c46',
      greenHover: '#5cbf60',
    },
  },

  media: {
    extraLarge: '1920px',
    large: '1280px',
    medium: '768px',
    small: '320px',
  },

  font: {
    primary: "'Poppins', sans-serif",
  },

  fontSize: {
    extraLarge: '24px',
    large: '20px',
    medium: '16px',
    normal: '14px',
    small: '12px',
  },

  weight: { bold: 700, medium: 500, regular: 400 },

  sizes: {
    container: { width: '1200px' },
    header: { minHeight: '80px' },
    button: { width: '120px', height: '50px' },
  },

  // in ms
  durations: {
    ms300: 300,
  },

  // z-index
  order: {
    header: 50,
    modal: 100,
  },

  card: {
    borderColor: '#d6d6d6',
    borderRadius: '5px',
  },
};
