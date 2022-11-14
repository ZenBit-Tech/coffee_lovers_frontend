export interface ITheme {
  colors: {
    primary: string;
    secondary: string;

    button: { bg: string; hover: string };
  };

  media: {
    extraLarge: string;
    large: string;
    medium: string;
    small: string;
  };

  fontSize: {
    extraLarge: string;
    large: string;
    medium: string;
    normal: string;
    small: string;
  };

  weight: { bold: number; medium: number; regular: number };

  sizes: {
    header: { minHeight: string };

    button: { width: string; height: string };
  };

  durations: {
    ms300: number;
  };

  order: {
    header: number;
    modal: number;
  };
}
