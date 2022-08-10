export const blockScroll = (bool) => {
  const html = document.getElementsByTagName('html')[0];

  if (bool) {
    html.classList.add('block-scroll');
  } else {
    html.classList.remove('block-scroll');
  }
};
