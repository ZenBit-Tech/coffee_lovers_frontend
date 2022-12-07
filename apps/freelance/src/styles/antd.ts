import { ThemeConfig } from 'antd/es/config-provider/context';

import { baseTheme } from './theme';

const theme: ThemeConfig = {
  token: {
    colorPrimary: baseTheme.colors.primary,
    fontFamily: baseTheme.font.primary,
  },
};

export default theme;
