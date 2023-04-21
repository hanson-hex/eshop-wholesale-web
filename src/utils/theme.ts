// 处理主题样式
export function handleThemeStyle(theme: string) {
  handleThemeStyleFomeNS(theme, 'el', true);
}

const handleThemeStyleFomeNS = (theme: string, namespace: string, withOther = false) => {
  document.documentElement.style.setProperty(`--${namespace}-color-primary`, theme);
  for (let i = 1; i <= 9; i++) {
    document.documentElement.style.setProperty(`--${namespace}-color-primary-light-${i}`, `${getLightColor(theme, i / 10)}`);
  }
  for (let i = 1; i <= 9; i++) {
    document.documentElement.style.setProperty(`--${namespace}-color-primary-dark-${i}`, `${getDarkColor(theme, i / 10)}`);
  }
  if (withOther) {
    document.documentElement.style.setProperty(`--${namespace}-text-color-primary`, '#595959');
    document.documentElement.style.setProperty(`--${namespace}-text-color-placeholder`, '#bfbfbf');
    document.documentElement.style.setProperty(`--${namespace}-text-color-regular`, '#595959');
    document.documentElement.style.setProperty(`--${namespace}-border-color`, '#d9d9d9');
    document.documentElement.style.setProperty(`--${namespace}-color-danger`, '#ff4d4f');
    document.documentElement.style.setProperty(`--${namespace}-color-warning`, '#f99b0d');
    document.documentElement.style.setProperty(`--${namespace}-fill-color-light`, '#f2f2f2');
    document.documentElement.style.setProperty(`--${namespace}-border-color-extra-light`, '#f2f8f9');
  }
};

// hex颜色转rgb颜色
export function hexToRgb(str: string) {
  str = str.replace('#', '');
  const hexs: any = str.match(/../g);
  for (let i = 0; i < 3; i++) {
    hexs[i] = parseInt(hexs[i], 16);
  }
  return hexs;
}

// rgb颜色转Hex颜色
export function rgbToHex(r: any, g: any, b: any) {
  const hexs = [r.toString(16), g.toString(16), b.toString(16)];
  for (let i = 0; i < 3; i++) {
    if (hexs[i].length == 1) {
      hexs[i] = `0${hexs[i]}`;
    }
  }
  return `#${hexs.join('')}`;
}

// 变浅颜色值
export function getLightColor(color: any, level: any) {
  const rgb = hexToRgb(color);
  for (let i = 0; i < 3; i++) {
    rgb[i] = Math.floor((255 - rgb[i]) * level + rgb[i]);
  }
  return rgbToHex(rgb[0], rgb[1], rgb[2]);
}

// 变深颜色值
export function getDarkColor(color: any, level: any) {
  const rgb = hexToRgb(color);
  for (let i = 0; i < 3; i++) {
    rgb[i] = Math.floor(rgb[i] * (1 - level));
  }
  return rgbToHex(rgb[0], rgb[1], rgb[2]);
}
