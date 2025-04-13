import { showNotification } from './utils.js';

/* === Portfolio Cards === */
const projects = [
  { img: './images/portfolio1.jpg', title: 'Экспедиция на плато Путорана' },
  { img: './images/portfolio2.jpg', title: 'Треккинг по горам Алтая' },
  { img: './images/portfolio3.jpg', title: 'Вулканы Камчатки' }
];

document.addEventListener('DOMContentLoaded', () => {
  const portfolioGrid = document.getElementById('portfolio-grid');
  if (portfolioGrid) {
    projects.forEach(project => {
      const card = document.createElement('div');
      card.className = 'project-card';
      card.innerHTML = `<img src="${project.img}" alt="${project.title}"><p>${project.title}</p>`;
      portfolioGrid.appendChild(card);
    });
  }

  /* === Modal Logic === */
  const contactBtn = document.getElementById('contact-btn');
  const modal = document.getElementById('contact-modal');
  const closeBtn = document.querySelector('.close');

  if (contactBtn && modal && closeBtn) {
    contactBtn.addEventListener('click', e => {
      e.preventDefault();
      modal.style.display = 'block';
    });
    closeBtn.addEventListener('click', () => modal.style.display = 'none');
    window.addEventListener('click', e => {
      if (e.target === modal) modal.style.display = 'none';
    });
  }

  /* === Telegram отправка === */
  const form = document.querySelector('#contact-form');
  if (form) {
    const TOKEN = '7381394108:AAHx4Ixp9fCxvNhIwvB0Rh8BPgFrzcUU8nk';
    const CHAT_ID = '5019049081';
    const URL_API = `https://api.telegram.org/bot${TOKEN}/sendMessage`;

    form.addEventListener('submit', function (e) {
      e.preventDefault();

      const name = form.querySelector('[name="name"]')?.value.trim();
      const email = form.querySelector('[name="email"]')?.value.trim();
      const message = form.querySelector('[name="message"]')?.value.trim();

      if (!name || !email || !message) {
        showNotification('⚠️ Пожалуйста, заполните все поля!', true);
        return;
      }

      const text = `
📩 <b>Новая заявка с сайта Travelit!</b>\n
👤 <b>Имя:</b> ${name}\n
📧 <b>Email:</b> ${email}\n
💬 <b>Сообщение:</b> ${message}
      `;

      fetch(URL_API, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: CHAT_ID,
          text: text,
          parse_mode: 'HTML'
        })
      }).then(res => {
        if (res.ok) {
          showNotification('✅ Заявка отправлена!');
          form.reset();
        } else {
          showNotification('❌ Ошибка отправки! Попробуйте позже.', true);
        }
      }).catch(() => {
        showNotification('❌ Не удалось подключиться к Telegram API!', true);
      });
    });
  }
});

/*карта путешествий*/ 
const mapImage = document.querySelector('.map-container');
const mapInfo = document.getElementById('info-box');

// Данные меток: название, координаты, описание и путь к видео
const markersData = [
  {
    name: 'Карелия',
    x: 27,
    y: 33,
    description: 'Прекрасные леса и озёра Карелии...',
    video: './videos/video-karelia.mp4'
  },
  {
    name: 'Камчатка',
    x: 85,
    y: 30,
    description: 'Вулканы Камчатки ждут тебя!',
    video: './videos/video-kamchatka.mp4'
  },
  {
    name: 'Байкал',
    x: 67,
    y: 72,
    description: 'Глубочайшее озеро планеты...',
    video: './videos/video-card-baikal.mp4'
  },
  {
    name: 'Алтай',
    x: 49,
    y: 77,
    description: 'Горные хребты и мистические долины...',
    video: './videos/video-altay.mp4'
  },
  {
    name: 'Чукотка',
    x: 76,
    y: 18,
    description: 'Край вечной мерзлоты и северного сияния...',
    video: './videos/video-chukotka.mp4'
  }
];

// Создание и отображение меток на карте
markersData.forEach(marker => {
  const el = document.createElement('img');
  el.src = './images/map-pin.png';
  el.className = 'map-pin';
  el.style.left = marker.x + '%';
  el.style.top = marker.y + '%';

  el.addEventListener('click', (event) => {
    // Вставка контента карточек
    mapInfo.innerHTML = `
      <div class="card description-card">
        <h3>${marker.name}</h3>
        <p>${marker.description}</p>
      </div>
      <div class="card video-card">
        <video autoplay muted loop playsinline controls>
          <source src="${marker.video}" type="video/mp4">
          Ваш браузер не поддерживает видео.
        </video>
      </div>
    `;

    // Позиционируем блок рядом с меткой
    const rect = el.getBoundingClientRect();
    const containerRect = mapImage.getBoundingClientRect();

    const top = rect.top - containerRect.top + el.offsetHeight + 10;
    const left = rect.left - containerRect.left;

    mapInfo.style.top = `${top}px`;
    mapInfo.style.left = `${left}px`;

    // Анимация появления
    mapInfo.classList.add('active');
  });

  mapImage.appendChild(el);
});

// Закрытие карточек при клике вне
document.addEventListener('click', (e) => {
  const isClickOnPin = e.target.classList.contains('map-pin');
  const isInsideInfoBox = e.target.closest('#info-box');

  if (!isClickOnPin && !isInsideInfoBox) {
    mapInfo.classList.remove('active');
    mapInfo.innerHTML = '';
  }
});

  