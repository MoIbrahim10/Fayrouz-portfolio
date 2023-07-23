document.addEventListener('DOMContentLoaded', function () {
  var mobilemenu = document.querySelector('.nav-expanded');
  var hamburger = document.getElementById('hamburger-menu');

  hamburger.addEventListener('click', function (event) {
    event.stopPropagation();

    mobilemenu.classList.toggle('responsive-bar');
    hamburger.classList.toggle('open');

    var expanded = this.getAttribute('aria-expanded') === 'true' || false;
    this.setAttribute('aria-expanded', !expanded);
  });

  document.body.addEventListener('click', function () {
    if (mobilemenu.classList.contains('responsive-bar')) {
      mobilemenu.classList.remove('responsive-bar');
      hamburger.classList.remove('open');
      hamburger.setAttribute('aria-expanded', false);
    }
  });
});