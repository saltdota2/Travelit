/* === Portfolio Cards: Популярные направления === */
const projects = [
    { img: './images/portfolio1.jpg', title: 'Экспедиция на плато Путорана' },
    { img: './images/portfolio2.jpg', title: 'Треккинг по горам Алтая' },
    { img: './images/portfolio3.jpg', title: 'Вулканы Камчатки' }
  ];
  const portfolioGrid = document.getElementById('portfolio-grid');
  projects.forEach(project => {
    const card = document.createElement('div');
    card.className = 'project-card';
    card.innerHTML = `<img src="${project.img}" alt="${project.title}"><p>${project.title}</p>`;
    portfolioGrid.appendChild(card);
  });

  /* === Modal Logic: Модальное окно формы === */
  const contactBtn = document.getElementById('contact-btn');
  const modal = document.getElementById('contact-modal');
  const closeBtn = document.querySelector('.close');
  const contactForm = document.getElementById('contact-form');

  contactBtn.addEventListener('click', e => {
    e.preventDefault();
    modal.style.display = 'block';
  });

  closeBtn.addEventListener('click', () => modal.style.display = 'none');
  window.addEventListener('click', e => {
    if (e.target === modal) modal.style.display = 'none';
  });

  contactForm.addEventListener('submit', e => {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    const mailtoLink = `mailto:Travelit@mail.ru?subject=Заявка на тур от ${name}&body=${encodeURIComponent(message + '\n\nОт: ' + email)}`;
    window.location.href = mailtoLink;
    modal.style.display = 'none';
  });

  /* === FAQ Toggle === */
  document.querySelectorAll('.faq-question').forEach(question => {
    question.addEventListener('click', () => {
      question.classList.toggle('active');
      const answer = question.nextElementSibling;
      answer.classList.toggle('open');
    });
  });