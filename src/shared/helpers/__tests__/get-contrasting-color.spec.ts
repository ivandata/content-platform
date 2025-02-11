import { describe, it, expect } from 'vitest';

import { getContrastingColor } from '../get-contrasting-color';

describe('getContrastingColor', () => {
  describe('hex color inputs', () => {
    it('returns black (#000000) for light colors', () => {
      expect(getContrastingColor('#FFFFFF')).toBe('#000000'); // White
      expect(getContrastingColor('#FFEB3B')).toBe('#000000'); // Yellow
      expect(getContrastingColor('#90CAF9')).toBe('#000000'); // Light Blue
    });

    it('returns white (#ffffff) for dark colors', () => {
      expect(getContrastingColor('#000000')).toBe('#ffffff'); // Black
      expect(getContrastingColor('#1A237E')).toBe('#ffffff'); // Dark Blue
      expect(getContrastingColor('#1B5E20')).toBe('#ffffff'); // Dark Green
    });

    it('handles lowercase hex colors', () => {
      expect(getContrastingColor('#ffffff')).toBe('#000000');
      expect(getContrastingColor('#000000')).toBe('#ffffff');
    });

    it('handles 3-digit hex colors', () => {
      expect(getContrastingColor('#fff')).toBe('#000000');
      expect(getContrastingColor('#000')).toBe('#ffffff');
    });
  });

  describe('rgb color inputs', () => {
    it('returns black for light rgb colors', () => {
      expect(getContrastingColor('rgb(255, 255, 255)')).toBe('#000000'); // White
      expect(getContrastingColor('rgb(255, 235, 59)')).toBe('#000000'); // Yellow
      expect(getContrastingColor('rgb(144, 202, 249)')).toBe('#000000'); // Light Blue
    });

    it('returns white for dark rgb colors', () => {
      expect(getContrastingColor('rgb(0, 0, 0)')).toBe('#ffffff'); // Black
      expect(getContrastingColor('rgb(26, 35, 126)')).toBe('#ffffff'); // Dark Blue
      expect(getContrastingColor('rgb(27, 94, 32)')).toBe('#ffffff'); // Dark Green
    });

    it('handles rgb colors with spaces', () => {
      expect(getContrastingColor('rgb(255,255,255)')).toBe('#000000');
      expect(getContrastingColor('rgb(0, 0, 0)')).toBe('#ffffff');
    });
  });

  describe('edge cases', () => {
    it('returns black for invalid color formats', () => {
      expect(getContrastingColor('invalid')).toBe('#000000');
      expect(getContrastingColor('')).toBe('#000000');
    });

    it('handles border cases for luminance threshold', () => {
      // Using the WCAG formula: (0.299 * R + 0.587 * G + 0.114 * B) / 255
      // For all equal RGB values (gray), the threshold of 0.5 occurs at:
      // (0.299 * x + 0.587 * x + 0.114 * x) / 255 = 0.5
      // x = 0.5 * 255 = 127.5

      // Just below threshold (gray 127) - should return white
      expect(getContrastingColor('rgb(127, 127, 127)')).toBe('#ffffff');

      // Just above threshold (gray 128) - should return black
      expect(getContrastingColor('rgb(128, 128, 128)')).toBe('#000000');

      // Exact middle gray in hex
      expect(getContrastingColor('#7F7F7F')).toBe('#ffffff');
      expect(getContrastingColor('#808080')).toBe('#000000');
    });
  });

  describe('luminance calculation', () => {
    it('correctly weighs RGB components according to WCAG formula', () => {
      // Pure Red (R:255, G:0, B:0)
      // Luminance = (0.299 * 255 + 0.587 * 0 + 0.114 * 0) / 255 = 0.299
      expect(getContrastingColor('rgb(255, 0, 0)')).toBe('#ffffff');

      // Pure Green (R:0, G:255, B:0)
      // Luminance = (0.299 * 0 + 0.587 * 255 + 0.114 * 0) / 255 = 0.587
      expect(getContrastingColor('rgb(0, 255, 0)')).toBe('#000000');

      // Pure Blue (R:0, G:0, B:255)
      // Luminance = (0.299 * 0 + 0.587 * 0 + 0.114 * 255) / 255 = 0.114
      expect(getContrastingColor('rgb(0, 0, 255)')).toBe('#ffffff');
    });
  });
});