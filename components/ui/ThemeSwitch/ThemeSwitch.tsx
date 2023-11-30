'use client'
import React from 'react';
import Switch, { switchClasses } from '@mui/joy/Switch';
import { Theme } from '@mui/joy';
import { useTheme } from '../../../contexts/ThemeContext';

const ThemeSwitch = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <Switch
      checked={theme === 'dark'}
      onChange={toggleTheme}
      sx={(theme: Theme) => ({
        display: 'inherit',
        '--Switch-thumbShadow': theme.vars.shadow.sm,
        '--Switch-thumbSize': '18px',
        '--Switch-trackWidth': '42px',
        '--Switch-trackHeight': '22px',
        '--Switch-trackBackground': '#E9E9EA',
        '&:hover': {
          '--Switch-trackBackground': '#E9E9EA',
        },
        [theme.getColorSchemeSelector('dark')]: {
          '--Switch-trackBackground': 'rgba(255 255 255 / 0.4)',
        },
        [`&.${switchClasses.checked}`]: {
          '--Switch-trackBackground': '#EC4899',
          '&:hover': {
            '--Switch-trackBackground': '#EC4899',
          },
        },
      })}
    >
      {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
    </Switch>
  );
};

export default ThemeSwitch;