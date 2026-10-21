/**
 * Convert Latin digits in a string/number to Persian digits.
 * Safe for both server and client rendering (no hydration mismatch).
 */
export const toFa = (v: string | number): string =>
  String(v).replace(/[0-9]/g, (d) => '۰۱۲۳۴۵۶۷۸۹'[+d]);
