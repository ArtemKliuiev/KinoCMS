export function useScrollLock() {
  const html = document.documentElement
  const main = document.querySelector('main')
  const header = document.querySelector('header')


  function lockScroll() {
    const width = window.innerWidth - main.offsetWidth
    html.style.paddingRight = `${width}px`
    header.style.paddingRight = `${width}px`
    html.style.setProperty('overflow', 'hidden', 'important');
  }

  function unlockScroll() {
    html.style.removeProperty('overflow')
    html.style.paddingRight = ''
    header.style.paddingRight = ''
  }

  return {
    lockScroll,
    unlockScroll,
  }
}
