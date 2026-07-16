const packages = [
  { name: "Content Snapshot", price: "$1,500", unit: "AUD", popular: false, desc: "Half-day shoot (4 hours) + 5–6 edited videos for 6 weeks of content. A low-risk way to start and see how Wild Media works for your brand." },
  { name: "Quarterly Package", price: "$3,000", unit: "AUD", popular: true, desc: "Full-day shoot (8 hours) + 10–15 edited videos for 3 months of content, ready for social media and paid campaigns, plus a suggested posting calendar. Best for businesses and clinics ready to commit to a full quarter of content." },
  { name: "Quarterly Ads-Ready", price: "$5,200", unit: "AUD / quarter", popular: false, desc: "Everything in the Quarterly Package + a mid-quarter refresh shoot + ad-specific cutdowns for active campaigns + a monthly strategy call. Best for businesses already spending heavily on paid ads that need fresh creative to avoid ad fatigue." }
];

const faqs = [
  { q: "How long does it take to get my videos?", a: "You'll have your full set of edited content within 10 business days of the shoot." },
  { q: "What if I don't like the videos?", a: "Every video includes one round of revisions. If your shoot doesn't produce at least 10 approved pieces, we reshoot a 2-hour block at no extra cost." },
  { q: "Do I need to already be running ads?", a: "No, but the content is built to perform in paid campaigns if you decide to run them. Many clients start organic and move into ads once they see the content." },
  { q: "Can I use the content however I want?", a: "Yes. Every package includes unrestricted usage rights — no royalties, no limits on how or where you use the videos." },
  { q: "I'm not in the CBD — do you still work with me?", a: "Yes, we work across Greater Melbourne. Get in touch and we'll confirm it works for your location." }
];

let selectedPackage = null;

function renderPackages() {
  const list = document.getElementById('package-list');
  if (!list) return;
  list.innerHTML = packages.map((pkg, i) => `
    <button type="button" class="m-package${selectedPackage === pkg.name ? ' m-package--selected' : ''}" data-index="${i}">
      ${pkg.popular ? '<div class="m-package__badge">MOST POPULAR</div>' : ''}
      <div class="m-package__name">${pkg.name}</div>
      <div class="m-package__price">${pkg.price} <span>${pkg.unit}</span></div>
      <div class="m-package__desc">${pkg.desc}</div>
      <div class="m-package__cta">Choose this package ↓</div>
    </button>
  `).join('');
  list.querySelectorAll('.m-package').forEach(btn => {
    btn.addEventListener('click', () => selectPackage(packages[btn.dataset.index].name));
  });
}

function selectPackage(name) {
  selectedPackage = name;
  renderPackages();
  const select = document.getElementById('package-select');
  if (select) select.value = name;
  const form = document.getElementById('lead-form');
  if (form) form.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function renderFaqs() {
  const list = document.getElementById('faq-list');
  if (!list) return;
  let openIndex = null;
  function draw() {
    list.innerHTML = faqs.map((item, i) => `
      <div class="m-faq-item${openIndex === i ? ' m-faq-item--open' : ''}">
        <button type="button" class="m-faq-item__q" data-index="${i}">
          <span class="m-faq-item__q-text">${item.q}</span>
          <span class="m-faq-item__icon">${openIndex === i ? '−' : '+'}</span>
        </button>
        <div class="m-faq-item__a">${item.a}</div>
      </div>
    `).join('');
    list.querySelectorAll('.m-faq-item__q').forEach(btn => {
      btn.addEventListener('click', () => {
        const i = Number(btn.dataset.index);
        openIndex = openIndex === i ? null : i;
        draw();
      });
    });
  }
  draw();
}

if ('scrollRestoration' in history) {
  history.scrollRestoration = 'manual';
}
function forceScrollTop() {
  if (window.location.hash) {
    window.scrollTo(0, 0);
  }
}
if (window.location.hash) {
  forceScrollTop();
  window.addEventListener('load', () => {
    forceScrollTop();
    setTimeout(forceScrollTop, 0);
    setTimeout(forceScrollTop, 150);
    setTimeout(() => {
      forceScrollTop();
      history.replaceState(null, '', window.location.pathname + window.location.search);
    }, 350);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  renderPackages();
  renderFaqs();

  const packageSelect = document.getElementById('package-select');
  if (packageSelect) {
    packageSelect.addEventListener('change', () => {
      selectedPackage = packageSelect.value || null;
      renderPackages();
    });
  }

  const mobileForm = document.getElementById('mobile-form');
  if (mobileForm) {
    mobileForm.addEventListener('submit', e => {
      e.preventDefault();
      mobileForm.querySelectorAll('input, button, .m-form__field').forEach(el => el.style.display = 'none');
      mobileForm.querySelector('.m-form__title').style.display = 'none';
      mobileForm.querySelector('.m-form__thanks').hidden = false;
    });
  }

  const desktopForm = document.getElementById('desktop-form');
  if (desktopForm) {
    desktopForm.addEventListener('submit', e => {
      e.preventDefault();
      desktopForm.querySelectorAll('input, textarea, button').forEach(el => el.style.display = 'none');
      desktopForm.querySelector('.form-note').hidden = false;
    });
  }
});
