const dialog = document.querySelector('.consultation-dialog');
let lastTrigger;
const toggle = document.querySelector('.menu-toggle');
const menu = document.createElement('nav');
menu.id = 'mobile-menu'; menu.className = 'mobile-nav'; menu.hidden = true;
menu.setAttribute('aria-label', 'Mobile navigation');
menu.innerHTML = document.querySelector('.desktop-nav').innerHTML;
const mobileCTA = document.querySelector('.header-cta').cloneNode(true);
mobileCTA.classList.remove('header-cta', 'button-small');
menu.append(mobileCTA); document.querySelector('.header').append(menu);
function setMenu(open) {
  menu.hidden = !open;
  toggle.setAttribute('aria-expanded', String(open));
  toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
}
toggle.addEventListener('click', () => setMenu(menu.hidden));
menu.querySelectorAll('a').forEach(link => link.addEventListener('click', () => setMenu(false)));
document.addEventListener('keydown', event => { if (event.key === 'Escape') setMenu(false); });
const content = document.querySelector('.dialog-content');
const preview = document.createElement('div'); preview.className = 'consultation-preview';
[...content.children].filter(child => !child.matches('.dialog-close')).forEach(child => preview.append(child));
content.append(preview);
const success = document.createElement('div'); success.className = 'success-state'; success.hidden = true;
success.innerHTML = '<span class="success-icon" aria-hidden="true">&#10003;</span><p class="eyebrow">A FIRST STEP TOWARD CLARITY</p><h2>Imagine what&#8217;s <em>next.</em></h2><p>You&#8217;ve completed the consultation preview. This concept does not send your details or book an appointment.</p><button class="button" type="button">Back to exploring &#8594;</button>';
content.append(success);
success.querySelector('button').addEventListener('click', () => dialog.close());
preview.querySelector('form').addEventListener('submit', event => {
  event.preventDefault(); preview.hidden = true; success.hidden = false;
  success.querySelector('button').focus();
});
document.querySelectorAll('[data-consultation]').forEach(button => button.addEventListener('click', () => {
  lastTrigger = button; setMenu(false); preview.hidden = false; success.hidden = true;
  dialog.showModal(); document.body.style.overflow = 'hidden';
}));
dialog.addEventListener('close', () => { document.body.style.overflow = ''; lastTrigger?.focus(); });
dialog.addEventListener('click', event => { if (event.target === dialog) dialog.close(); });
document.querySelector('.dialog-close').addEventListener('click', () => dialog.close());
document.querySelectorAll('.service-more').forEach(button => button.addEventListener('click', () => {
  const opening = button.getAttribute('aria-expanded') !== 'true';
  document.querySelectorAll('.service-more').forEach(other => {
    const expanded = other === button && opening;
    other.setAttribute('aria-expanded', String(expanded));
    document.getElementById(other.getAttribute('aria-controls')).hidden = !expanded;
    other.closest('.service-card').classList.toggle('service-open', expanded);
  });
}));
