import { describe, expect, it } from 'vitest';
import { isMobileUserAgentString } from './is-mobile-user-agent';

describe('isMobileUserAgentString', () => {
  it('detects common mobile user agents', () => {
    expect(isMobileUserAgentString('Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X)')).toBe(
      true,
    );
    expect(
      isMobileUserAgentString('Mozilla/5.0 (Linux; Android 14; Pixel 8) AppleWebKit/537.36'),
    ).toBe(true);
  });

  it('detects tablet user agents', () => {
    expect(
      isMobileUserAgentString(
        'Mozilla/5.0 (iPad; CPU OS 17_0 like Mac OS X) AppleWebKit/605.1.15',
      ),
    ).toBe(true);
    expect(isMobileUserAgentString('Mozilla/5.0 (Linux; Android 12; SM-T870) Tablet')).toBe(true);
  });

  it('detects compact viewport client hints including tablets', () => {
    expect(isMobileUserAgentString('Mozilla/5.0', '390')).toBe(true);
    expect(isMobileUserAgentString('Mozilla/5.0', '768')).toBe(true);
    expect(isMobileUserAgentString('Mozilla/5.0', '1023')).toBe(true);
    expect(isMobileUserAgentString('Mozilla/5.0', '1024')).toBe(false);
  });

  it('treats desktop user agents as non-mobile when viewport is wide', () => {
    expect(
      isMobileUserAgentString(
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/122.0.0.0 Safari/537.36',
      ),
    ).toBe(false);
  });
});
