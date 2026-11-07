const noteModal = document.querySelector('#noteModal');
const openNoteButton = document.querySelector('#openNote');
const closeButtons = document.querySelectorAll('[data-close]');
const flowerScene = document.querySelector('#flowerScene');
const bloomButton = document.querySelector('#bloomButton');
const flowerCaption = document.querySelector('#flowerCaption');
let previousFocus = null;

function openNote() {
  previousFocus = document.activeElement;
  noteModal.classList.add('open');
  noteModal.setAttribute('aria-hidden', 'false');
  noteModal.querySelector('.close').focus();
  makeHearts(12);
}

function closeNote() {
  noteModal.classList.remove('open');
  noteModal.setAttribute('aria-hidden', 'true');
  if (previousFocus) previousFocus.focus();
}

function makeHearts(amount = 8) {
  for (let i = 0; i < amount; i++) {
    const heart = document.createElement('span');
    heart.className = 'heart';
    heart.textContent = ['♡', '✦', '♥'][i % 3];
    heart.style.left = `${30 + Math.random() * 40}%`;
    heart.style.top = `${55 + Math.random() * 25}%`;
    heart.style.color = ['#75baff', '#b8d7ff', '#d18595'][i % 3];
    heart.style.fontSize = `${14 + Math.random() * 14}px`;
    document.body.append(heart);
    heart.addEventListener('animationend', () => heart.remove(), { once: true });
  }
}

function bloomAgain() {
  flowerScene.classList.remove('blooming');
  void flowerScene.offsetWidth;
  flowerScene.classList.add('blooming');
  flowerCaption.textContent = 'A little blue bloom, just for you. ♡';
  makeHearts(7);

  for (let i = 0; i < 10; i++) {
    const petal = document.createElement('span');
    petal.className = 'falling-petal';
    petal.textContent = i % 2 ? '✦' : '♡';
    petal.style.left = `${20 + Math.random() * 60}%`;
    petal.style.animationDelay = `${Math.random() * .7}s`;
    flowerScene.append(petal);
    petal.addEventListener('animationend', () => petal.remove(), { once: true });
  }
}

openNoteButton.addEventListener('click', openNote);
closeButtons.forEach(button => button.addEventListener('click', closeNote));
noteModal.addEventListener('click', event => {
  if (event.target === noteModal) closeNote();
});
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && noteModal.classList.contains('open')) closeNote();
});
bloomButton.addEventListener('click', bloomAgain);
