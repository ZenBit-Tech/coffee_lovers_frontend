export interface ITheme {
  colors: {
    primary: string;
    secondary: string;
    success: string;
    danger: string;
    lightGrey: string;
    grey: string;
    lightBlue: string;
    white: string;

    button: {
      bg: string;
      hover: string;
      green: string;
      greenHover: string;
    };
  };

  media: {
    extraLarge: string;
    large: string;
    medium: string;
    small: string;
  };

  font: {
    primary: string;
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
    container: { width: string };
    button: { width: string; height: string };
    navigationBar: { height: string };
  };

  durations: {
    ms300: number;
  };

  order: {
    header: number;
    modal: number;
  };

  card: {
    borderColor: string;
    borderRadius: string;
  };
}
