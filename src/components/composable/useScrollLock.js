export async function useScrollLock(confirm, timeout = false) {
  let html;
  let main;
  let header;
  let width;
  let verticalScroll;

  await new Promise(resolve => {
    setTimeout(() => {
      html = document.documentElement
      main = document.querySelector('main')
      header = document.querySelector('header')
      width = window.innerWidth - main.offsetWidth
      verticalScroll = document.body.scrollHeight > window.innerHeight
      resolve()
    }, 0)
  })

  function lock(){
    html.style.paddingRight = `${width}px`
    header.style.paddingRight = `${width}px`
    html.style.setProperty('overflow', 'hidden', 'important');
  }

  function unlock(){
    html.style.removeProperty('overflow')
    html.style.paddingRight = ''
    header.style.paddingRight = ''
  }

  function lockScroll() {
    lock()
  }

  function unlockScroll() {
    if(timeout){
      setTimeout(() => {
        unlock()
      }, 200)
    }else {
      unlock()
    }
  }

  if(confirm){
    lockScroll()
  }else {
    unlockScroll()
  }
}
