import { addons } from '@storybook/manager-api';
import { create } from '@storybook/theming/create';

const theme = create({
  base: 'light',
  brandTitle: 'Axero Design System',
  brandImage: './axero-logo.png',
  brandTarget: '_self',
});

addons.setConfig({
  theme,
});
