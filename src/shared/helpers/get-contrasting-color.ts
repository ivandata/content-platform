/**
 * Determines if text should be light or dark based on background color
 * @param backgroundColor - RGB or Hex color string
 * @returns '#ffffff' for white or '#000000' for black text
 */
export const getContrastingColor = (backgroundColor: string): string => {
  // Convert hex to RGB if needed
  let r: number, g: number, b: number;

  if (backgroundColor.startsWith('#')) {
    const hex = backgroundColor.replace('#', '');

    // Handle 3-digit hex
    if (hex.length === 3) {
      r = parseInt(hex[0] + hex[0], 16);
      g = parseInt(hex[1] + hex[1], 16);
      b = parseInt(hex[2] + hex[2], 16);
    } else {
      r = parseInt(hex.substring(0, 2), 16);
      g = parseInt(hex.substring(2, 4), 16);
      b = parseInt(hex.substring(4, 6), 16);
    }
  } else if (backgroundColor.startsWith('rgb')) {
    [r, g, b] = backgroundColor
      .replace(/[^\d,]/g, '')
      .split(',')
      .map(Number);
  } else {
    return '#000000'; // Default to black if invalid color format
  }

  // Calculate relative luminance using WCAG formula
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;

  return luminance > 0.5 ? '#000000' : '#ffffff';
};