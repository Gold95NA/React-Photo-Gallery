export const getDayOfWeek = (isoDate: string) =>
  new Date(isoDate).toLocaleDateString('en-US', { weekday: 'short' });