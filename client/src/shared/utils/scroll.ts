export const lockScroll = () => {
  const scrollY = window.scrollY;
  document.body.style.position = 'fixed';
  document.body.style.width = '100%';
  document.body.style.top = `-${scrollY}px`;
  document.body.dataset.scrollY = scrollY.toString();
}

export const unlockScroll = () => {
  const scrollY = document.body.dataset.scrollY || '0';
  document.body.style.position = '';
  document.body.style.top = '';
  document.body.style.width = '';
  window.scrollTo(0, parseInt(scrollY));
  document.body.dataset.scrollY = '';
}

