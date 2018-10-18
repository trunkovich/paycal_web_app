export const getOrdinal = (n: number): string => {
  let s = ['th', 'st', 'nd', 'rd'];
  let v = n % 100;
  return n + (s[(v - 20) % 10] || s[v] || s[0]);
};

export const parseIOSVersion = (ua: string): string => {
  const reg = new RegExp(/OS\s([\d,_]+)/g);
  const result = reg.exec(ua);
  return result[1].split('_').join('.');
};
