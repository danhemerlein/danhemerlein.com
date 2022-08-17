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
