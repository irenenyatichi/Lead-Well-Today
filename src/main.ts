import './styles.css';

const header = document.querySelector('.site-header');
const navLogo = document.querySelector<HTMLImageElement>('.site-header .brand-logo img');
const homeLogoSrc = navLogo?.getAttribute('src');
const menuToggle = document.querySelector('.menu-toggle');
const navMenu = document.querySelector('.nav-menu');

function updateHeaderAppearance() {
  if (!header) return;
  const logoSrc = window.scrollY <= 30 ? homeLogoSrc : navLogo?.dataset.sectionLogo;
  if (navLogo && logoSrc && navLogo.getAttribute('src') !== logoSrc) {
    navLogo.src = logoSrc;
  }
  header.classList.toggle('scrolled', window.scrollY > 30);
  const probe = Math.min(110, window.innerHeight * 0.18);
  const sections = Array.from(document.querySelectorAll('main section'));
  let activeSection = null;
  for (const section of sections) {
    const rect = section.getBoundingClientRect();
    if (rect.top <= probe && rect.bottom > probe) {
      activeSection = section;
      break;
    }
  }
  const darkSection = activeSection
    ? activeSection.classList.contains('hero') || activeSection.classList.contains('impact-band')
    : window.scrollY <= 30;
  header.classList.toggle('light-nav', !darkSection);
  header.classList.toggle('dark-nav', darkSection);
}
window.addEventListener('scroll', updateHeaderAppearance, { passive: true });
window.addEventListener('resize', updateHeaderAppearance);
updateHeaderAppearance();

menuToggle?.addEventListener('click', () => {
  const open = navMenu?.classList.toggle('open') ?? false;
  menuToggle.classList.toggle('open', open);
  menuToggle.setAttribute('aria-expanded', String(open));
  menuToggle.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
  document.body.style.overflow = open ? 'hidden' : '';
});

document.querySelectorAll('.nav-menu a').forEach(link => {
  link.addEventListener('click', () => {
    navMenu?.classList.remove('open');
    menuToggle?.classList.remove('open');
    menuToggle?.setAttribute('aria-expanded', 'false');
    menuToggle?.setAttribute('aria-label', 'Open navigation');
    document.body.style.overflow = '';
  });
});

function toggleProgram(trigger) {
  const card = trigger.closest('.program-card');
  if (!card) return;
  const wasOpen = card.classList.contains('open');
  document.querySelectorAll('.program-card').forEach(item => {
    item.classList.remove('open');
    const button = item.querySelector('.program-trigger');
    const symbol = item.querySelector('.program-plus');
    button?.setAttribute('aria-expanded', 'false');
    if (symbol) symbol.textContent = '+';
  });
  if (!wasOpen) {
    card.classList.add('open');
    trigger.setAttribute('aria-expanded', 'true');
    const symbol = trigger.querySelector('.program-plus');
    if (symbol) symbol.textContent = '−';
  }
}
document.querySelectorAll('.program-trigger').forEach(trigger => {
  trigger.addEventListener('click', () => toggleProgram(trigger));
});

const testimonials = [
  {
    name: 'GEORGE MURIITHI',
    initials: 'GE',
    Image: `${import.meta.env.BASE_URL}images/GeorgeMuriithi.jpg`,
    quote: 'Leadwell has transformed how I see myself and my responsibility as a leader. I have learned to lead myself first, becoming more intentional about my character, decisions and influence. The programme challenged my thinking and gave me practical tools I can apply in real life. Through the Personal Transformation Project, I moved from simply learning about leadership to using what I learned to create tangible impact. I left Leadwell with greater clarity, confidence and conviction about my purpose. Most importantly, I now understand that leadership is about serving others, multiplying impact and using my influence to advance God’s Kingdom.',
  },
  {
    name: 'SIMON KANUMBI',
    initials: 'SI',
    Image: `${import.meta.env.BASE_URL}images/SimonKanumbi.jpg`,
    quote: 'One of the key lessons I took from the whole program was the importance of effective communication. A good leader should be able to listen to others, express ideas clearly, and create an environment where everyone feels valued. I also learned that teamwork and collaboration are essential for achieving shared goals. The training challenged me to reflect on my own leadership abilities and identify areas where I need to improve. I realized that becoming a better leader requires continuous learning, humility, patience, and a willingness to accept feedback.',
  },
  {
    name: 'MONICAH MULILI',
    initials: 'MO',
    Image: `${import.meta.env.BASE_URL}images/MonicahMulili.jpg`,
    quote: 'From the very first lessons, Lead Well started to unpack what true leadership is really about. For me, it became a profound journey of unlearning and relearning. The biggest shift came when I understood that leadership has everything to do with the status of my heart, and not just what I can do. That realization brought me to a place of intentionally working on my heart as much as I was working on my skills. I am a better leader today because of Lead Well, and everything I learned and experienced during that season still keeps me in check.',
  },
  {
    name: 'ANNE OSOSO',
    initials: 'AO',
    Image: `${import.meta.env.BASE_URL}images/AnneOsoro.jpg`,
    quote: 'Before Lead Well, I thought leadership meant a title, a position, the power to say something and have it done. I wanted something different. I wanted to grow as a leader from a Kingdom foundation first; for myself, then for my girls, and eventually for the marketplace. Lead Well was an answered prayer. What struck me most was watching leadership lived out. They modeled leadership as stewardship, not ownership; using influence and resources to lift others, not to accumulate for themselves. Lead Well did not just teach me leadership; it is reshaping who I am.',
  },
];

let testimonialIndex = 0;
const quote = document.querySelector('#testimonialQuote');
const name = document.querySelector('#testimonialName');
const portrait = document.querySelector('#testimonialPortrait');
const counter = document.querySelector('#testimonialCounter');
const gallery = document.querySelector('#testimonialGallery');
const detail = document.querySelector('#testimonialDetail');

function renderGallery() {
  if (!gallery) return;
  gallery.innerHTML = testimonials.map((item, index) => `
    <button class="testimonial-person" type="button" data-testimonial-index="${index}" aria-label="Read ${item.name}'s testimonial">
    <span class="person-photo portrait-placeholder">
      <span class="person-initials">${item.initials}</span>
      <img
        class="person-image"
        src="${item.Image}"
        alt="${item.name}"
      />
    </span>      
    <span class="person-name">${item.name}</span>
    <span class="person-prompt">Read their story ↗</span>
    </button>
  `).join('');
  gallery.querySelectorAll<HTMLImageElement>('.person-image')
  .forEach(img => {
    img.addEventListener('error', () => {
      img.style.display = 'none';
    });
  });
}

function renderTestimonial() {
  const item = testimonials[testimonialIndex];
  if (!item) return;
  if (quote) quote.textContent = item.quote;
  if (name) name.textContent = item.name;
  if (portrait) {
    portrait.innerHTML = '<div class="portrait-placeholder"><img src="' + item.Image + '" alt="' + item.name + '" /></div><span class="portrait-name">' + item.name + '</span>';
    portrait.querySelector('img')?.addEventListener('error', e => { (e.target as HTMLImageElement).replaceWith(document.createTextNode(item.initials)); });
  }
  if (counter) counter.textContent = String(testimonialIndex + 1).padStart(2, '0') + ' / ' + String(testimonials.length).padStart(2, '0');
  if (gallery) gallery.hidden = true;
  if (detail) detail.hidden = false;
}

function showTestimonialGallery() {
  if (detail) detail.hidden = true;
  if (gallery) gallery.hidden = false;
}

gallery?.addEventListener('click', event => {
  const target = event.target;
  if (!(target instanceof Element)) return;
  const person = target.closest('[data-testimonial-index]');
  if (!person) return;
  testimonialIndex = Number(person.getAttribute('data-testimonial-index')) || 0;
  renderTestimonial();
});

document.querySelector('#prevTestimonial')?.addEventListener('click', () => {
  testimonialIndex = (testimonialIndex - 1 + testimonials.length) % testimonials.length;
  renderTestimonial();
});

document.querySelector('#nextTestimonial')?.addEventListener('click', () => {
  testimonialIndex = (testimonialIndex + 1) % testimonials.length;
  renderTestimonial();
});

document.querySelector('#backToTestimonials')?.addEventListener('click', showTestimonialGallery);
renderGallery();
showTestimonialGallery();

document.querySelector('#contactForm')?.addEventListener('submit', event => {
  event.preventDefault();
  const form = event.currentTarget;
  if (!(form instanceof HTMLFormElement)) return;
  const data = new FormData(form);
  const nameValue = String(data.get('name') || '').trim();
  const emailValue = String(data.get('email') || '').trim();
  const messageValue = String(data.get('message') || '').trim();
  const subject = encodeURIComponent('Lead Well Today enquiry from ' + nameValue);
  const body = encodeURIComponent('Name: ' + nameValue + '\nEmail: ' + emailValue + '\n\nMessage:\n' + messageValue);
  window.location.href = 'mailto:admin@leadwell-today.com?subject=' + subject + '&body=' + body;
});

/* Photo cropping: keep faces in view */
.person-image{object-position:center 20%}
.person-image[src*="SimonKanumbi"]{object-position:center top}
.person-image[src*="MonicahMulili"]{object-position:center 25%}
.person-image[src*="AnneOsoro"]{object-position:center 40%}
.testimonial-portrait .portrait-placeholder img{object-position:center 20%}
.testimonial-portrait .portrait-placeholder img[src*="SimonKanumbi"]{object-position:center top}
.testimonial-portrait .portrait-placeholder img[src*="AnneOsoro"]{object-position:center 40%}
.portrait-name{color:#fff;font-weight:600;letter-spacing:.04em}
