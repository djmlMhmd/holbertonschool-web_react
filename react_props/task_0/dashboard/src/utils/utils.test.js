import { getFullYear, getFooterCopy, getLatestNotification } from './utils';

describe('utils', () => {
  it('getFullYear returns current year', () => {
    expect(getFullYear()).toBe(new Date().getFullYear());
  });

  it('getFooterCopy returns school name when isIndex is true', () => {
    expect(getFooterCopy(true)).toBe('Holberton School');
  });

  it('getFooterCopy returns main dashboard when isIndex is false', () => {
    expect(getFooterCopy(false)).toBe('Holberton School main dashboard');
  });

  it('getLatestNotification returns a string with HTML', () => {
    expect(getLatestNotification()).toContain('strong');
  });
});
