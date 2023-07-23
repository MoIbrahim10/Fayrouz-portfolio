let shots = [];
let indices = [0, 1, 2];

async function fetchData() {
  const res = await fetch(
    'https://api.dribbble.com/v2/user/shots?access_token=71ea86ce6e4bd4f9d17a99feab8310d5e7053814da8ca251cbeb85026cf0e4fb'
  );
  const data = await res.json();
  return data;
}

function showShots() {
  const container = document.getElementById('shots');
  const fragment = document.createDocumentFragment();

  indices.forEach((index) => {
    if (shots[index]) {
      let shotContainer = document.createElement('div');
      shotContainer.className = 'shot-container';
      const link = document.createElement('a');
      link.href = shots[index].html_url;
      link.target = '_blank';
      const img = document.createElement('img');
      img.src = shots[index].images.hidpi;
      img.alt = shots[index].title;
      img.title = shots[index].title;
      img.loading = 'lazy';
      link.appendChild(img);
      shotContainer.appendChild(link);
      fragment.appendChild(shotContainer);
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

fetchData().then((data) => {
  shots = data;
  showShots();
});