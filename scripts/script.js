// Configuration
const API_URL = 'https://api.dribbble.com/v2/user/shots?access_token=71ea86ce6e4bd4f9d17a99feab8310d5e7053814da8ca251cbeb85026cf0e4fb';

let shots = [];
let indices = [0, 1, 2];

async function fetchData(url) {
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error("Couldn't fetch data.");
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
}

function createShotElement(shot) {
  const shotContainer = document.createElement('div');
  shotContainer.className = 'shot-container';
  
  const link = document.createElement('a');
  link.href = shot.html_url;
  link.target = '_blank';

  const img = document.createElement('img');
  img.src = shot.images.teaser;
  img.alt = shot.title;
  img.title = shot.title;
  img.loading = 'lazy';
  img.className = 'low-quality';

  const highResImage = new Image();
  highResImage.src = shot.images.two_x;
  highResImage.onload = () => {
    img.src = highResImage.src;
    img.classList.remove('low-quality');
  };

  link.appendChild(img);
  shotContainer.appendChild(link);
  
  return shotContainer;
}

function showShots() {
  const container = document.getElementById('shots');
  const fragment = document.createDocumentFragment();

  indices.forEach((index) => {
    if (shots[index]) {
      fragment.appendChild(createShotElement(shots[index]));
    }
  });
  container.innerHTML = '';
  container.appendChild(fragment);

  // handle visibility of prev and next buttons
  document.getElementById('prev').disabled = indices[0] <= 0;
  document.getElementById('next').disabled = indices[2] >= shots.length - 1;
}

document.getElementById('next').addEventListener('click', (e) => {
  e.preventDefault();
  if (!e.target.disabled) {
    indices = indices.map((index) => index + 1);
    showShots();
  }
});

document.getElementById('prev').addEventListener('click', (e) => {
  e.preventDefault();
  if (!e.target.disabled) {
    indices = indices.map((index) => index - 1);
    showShots();
  }
});

// Immediately-invoked function expression (IIFE) to start the app
(async function init() {
  shots = await fetchData(API_URL);
  showShots();
})();