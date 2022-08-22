export const blockScroll = (bool) => {
  const html = document.getElementsByTagName('html')[0];

  if (bool) {
    html.classList.add('block-scroll');
  } else {
    html.classList.remove('block-scroll');
  }
};

/**
  @description - removes all special charactes (e.g. "$", "#", "-") and creates a shopify handle-like string
  * @param {string} ex: "$0 - $25"
  * @return {string} ex. "0--25"
*/
export const removeSpecialCharactersAndHandleize = (str) => {
  return str
    ?.toLowerCase()
    .replace(/[/\\#,+()$~%.'":*?<>{}]/gi, '')
    .replaceAll('&', '-')
    .replaceAll(' ', '-');
};

export const reactContentfulImageURLHelper = (str) => {
  return str.replace('https:', '');
};

// capitalizes string and adds a period if nedded
export const altTextHelper = (str) => {
  const trim = str.trim();
  const firstLetter = trim.charAt(0).toUpperCase();

  let replaced = trim.replace(trim.charAt(0), firstLetter);

  if (replaced.charAt(replaced.length - 1) !== '.') {
    replaced = replaced.concat('.');
  }

  return replaced;
};
