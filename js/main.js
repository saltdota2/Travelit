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
