burgerMenu()
splitText()
headerScroll()
// hoverLetters()
moveMarquee()
highlightWords()
countNumbers()
mouseMoveCard()
changeTheme()

// анимация бургерного меню
function burgerMenu() {
  let burger = document.querySelector('.A_header__burger')
  let menu = document.querySelector('.O_menu')
  let header = document.querySelector('.O_header')
  let links = document.querySelectorAll('.menu__link')

  burger.addEventListener('click', () => {
    burger.classList.toggle('burger--open')
    menu.classList.toggle('O_menu--open')
    header.classList.toggle('O_header--menu')
    document.body.classList.toggle('page--locked')
  })

  links.forEach((link) => {
    link.addEventListener('click', () => {
      burger.classList.remove('burger--open')
      menu.classList.remove('O_menu--open')
      header.classList.remove('O_header--menu')
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
  let header = document.querySelector('.O_header')
  let lastScroll = 0

  window.addEventListener('scroll', () => {
    let scroll = window.scrollY

    if (scroll > 20) {
      header.classList.add('O_header--scrolled')
    } else {
      header.classList.remove('O_header--scrolled')
    }

    if (scroll > 160 && scroll > lastScroll) {
      header.classList.add('O_header--hidden')
    } else {
      header.classList.remove('O_header--hidden')
    }

    lastScroll = scroll
  })
}

//анимация бегущих строк
function moveMarquee() {
  const marquee = document.querySelector('.O_marquee')
  const rows = marquee.querySelectorAll('.C_marquee__row')
  const tracks = marquee.querySelectorAll('.A_marquee__track')

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
      let tracks = row.querySelectorAll('.A_marquee__track')
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

//заливка слов при скролле
function highlightWords() {
  let lead = document.querySelector('.A_about__lead')
  let words = lead.innerText.split(' ')
  let html = ``

  words.forEach((word) => {
    if (word.toLowerCase().includes('цветоч')) {
      html += `<span class="Q_about__word Q_about__word--accent">${word}</span> `
    } else {
      html += `<span class="Q_about__word">${word}</span> `
    }
  })

  lead.innerHTML = html

  let spans = lead.querySelectorAll('.Q_about__word')

  window.addEventListener('scroll', () => {
    let rect = lead.getBoundingClientRect()
    let progress =
      (window.innerHeight * 0.85 - rect.top) /
      (rect.height + window.innerHeight * 0.3)

    let p = Math.max(0, progress)
    let activeCount = Math.round(p * spans.length)

    spans.forEach((span, index) => {
      if (index < activeCount) {
        span.classList.add('Q_about__word--active')
      } else {
        span.classList.remove('Q_about__word--active')
      }
    })
  })
}

//крутим счётчики на карточках
function countNumbers() {
  let numbers = document.querySelectorAll('.about__number')

  numbers.forEach((number) => {
    let target = parseInt(number.innerText)
    let started = false
    number.innerText = 0

    window.addEventListener('scroll', () => {
      let rect = number.getBoundingClientRect()
      console.log(window.scrollY)

      if (rect.top < window.innerHeight * 0.8 && !started) {
        started = true
        let current = 0

        let step = Math.ceil(target / 60)
        console.log(step)

        let interval = setInterval(() => {
          current = current + step

          if (current >= target) {
            current = target
            clearInterval(interval)
          }

          number.innerText = current
        }, 60)
      }
    })
  })
}

// 3д движение карточки за мышкой
function mouseMoveCard() {
  let link = document.querySelector('.O_card__link')
  let media = link.querySelector('.W_card__media')

  link.addEventListener('mousemove', (event) => {
    let rect = media.getBoundingClientRect()

    let x = (event.clientX - rect.left) / rect.width - 0.5
    let y = (event.clientY - rect.top) / rect.height - 0.5

    media.style.transform = `perspective(1000px) rotateX(${-y * 10}deg) rotateY(${x * 10}deg)`
  })

  link.addEventListener('mouseleave', () => {
    media.style.transform = ''
  })
}

//анимация пятна-превью за движением курсора
function showPreview() {
  let preview = document.querySelector('.A_preview')
  let items = document.querySelectorAll('.M_soon__item')
  let colors = ['pink', 'liliac', 'lime', 'peach']

  document.addEventListener('mousemove', (event) => {
    preview.style.transform = `translate(${event.clientX}px, ${event.clientY}px)`
  })

  items.forEach((item, index) => {
    item.addEventListener('mouseenter', () => {
      preview.className = `A_preview preview--active preview--${colors[index]}`
    })

    item.addEventListener('mouseleave', () => {
      preview.classList.remove('preview--active')
    })
  })
}

//меняем цвета секций по скроллу
function changeTheme() {
  let sections = document.querySelectorAll('.O_theme')

  window.addEventListener('scroll', () => {
    let middle = window.innerHeight / 2

    sections.forEach((section) => {
      let rect = section.getBoundingClientRect()

      if (rect.top < middle && rect.bottom > middle) {
        document.body.classList.remove('page--dark', 'page--pink')

        if (section.classList.contains('O_theme--pink')) {
          document.body.classList.add('page--pink')
        }
        if (section.classList.contains('O_theme--dark')) {
          document.body.classList.add('page--dark')
        }
      }
    })
  })
}
