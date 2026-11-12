burgerMenu()
splitText()
headerScroll()
// hoverLetters()
moveMarquee()

// анимация бургерного меню
function burgerMenu() {
  let burger = document.querySelector('.header__burger')
  let menu = document.querySelector('.menu')
  let header = document.querySelector('.header')
  let links = document.querySelectorAll('.menu__link')

  burger.addEventListener('click', () => {
    burger.classList.toggle('burger--open')
    menu.classList.toggle('menu--open')
    header.classList.toggle('header--menu')
    document.body.classList.toggle('page--locked')
  })

  links.forEach((link) => {
    link.addEventListener('click', () => {
      burger.classList.remove('burger--open')
      menu.classList.remove('menu--open')
      header.classList.remove('header--menu')
      document.body.classList.remove('page--locked')
    })
  })
}

// анимация букв у текста в hero
function splitText() {
  let elements = document.querySelectorAll('.split')

  elements.forEach((el) => {
    let words = el.innerText.split(' ')
    let html = ''
    let index = 0
    let delay = 0

    if (el.classList.contains('split--delay')) {
      delay = 300
    }

    words.forEach((word) => {
      html += '<span class="split__word">'

      if (el.classList.contains('split--chars')) {
        for (let i = 0; i < word.length; i++) {
          html += `<span class="split__item" style="transition-delay: ${delay + index * 45}ms">${word[i]}</span>`
          index++
        }
      } else {
        html += `<span class="split__item" style="transition-delay: ${delay + index * 45}ms">${word}</span>`
        index++
      }

      html += '</span>'
    })

    el.innerHTML = html
  })
}

// анимация состояний верхенего меню, возникновение и исчезание
function headerScroll() {
  let header = document.querySelector('.header')
  let lastScroll = 0

  window.addEventListener('scroll', () => {
    let scroll = window.scrollY

    if (scroll > 20) {
      header.classList.add('header--scrolled')
    } else {
      header.classList.remove('header--scrolled')
    }

    if (scroll > 160 && scroll > lastScroll) {
      header.classList.add('header--hidden')
    } else {
      header.classList.remove('header--hidden')
    }

    lastScroll = scroll
  })
}

//анимация бегущих строк
function moveMarquee() {
  const marquee = document.querySelector('.marquee')
  const rows = marquee.querySelectorAll('.marquee__row')
  const tracks = marquee.querySelectorAll('.marquee__track')

  let position = 0
  let direction = -1
  let speed = 1
  let lastScroll = window.scrollY
  let timer

  window.addEventListener('scroll', () => {
    let delta = window.scrollY - lastScroll
    lastScroll = window.scrollY

    if (delta > 0) {
      direction = 1
    } else {
      direction = -1
    }

    speed = 1 + Math.min(Math.abs(delta) / 10, 4)

    let skew = Math.max(-8, Math.min(8, delta * 0.3))
    marquee.style.transform = `skewX(${skew}deg)`

    clearTimeout(timer)

    timer = setTimeout(() => {
      marquee.style.transform = `skewX(0deg)`
      speed = 1
    }, 150)
  })

  setInterval(() => {
    position = position - 0.05 * speed * direction

    if (position < -100) {
      position = position + 100
    }
    if (position > 0) {
      position = position - 100
    }

    rows.forEach((row) => {
      let tracks = row.querySelectorAll('.marquee__track')
      let x = position

      if (row.dataset.rowReverse) {
        x = -100 - position
      }

      tracks.forEach((track) => {
        track.style.transform = `translateX(${x}%)`
      })
    })
  }, 16)
}
