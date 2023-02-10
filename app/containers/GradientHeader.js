import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import { NAV_BAR_END, NAV_BAR_START } from '../constants/colors';

export const GradientHeader = () => (
  <LinearGradient colors={[NAV_BAR_START, NAV_BAR_END]} style={{ flex: 1 }} />
);
