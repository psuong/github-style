function switchTheme() {
  const currentStyle = currentTheme()
  if (currentStyle === 'light') {
    setTheme('dark')
    setIconTheme('dark')
    updateUtterancesTheme('dark')
  }
  else {
    setTheme('light')
    setIconTheme('light')
    updateUtterancesTheme('light')
  }
}

function setTheme(style) {
  document.querySelectorAll('.isInitialToggle').forEach(elem => {
    elem.classList.remove('isInitialToggle');
  });
  document.documentElement.setAttribute('data-color-mode', style);
  localStorage.setItem('data-color-mode', style);
}

function updateUtterancesTheme(theme) {
  const newTheme = document.documentElement.getAttribute('data-color-mode');
  const utterancesFrame = document.querySelector('.utterances-frame');
  if (utterancesFrame) {
    const message = {
      type: 'set-theme',
      theme: newTheme === 'dark' ? 'github-dark' : 'github-light'
    };
    utterancesFrame.contentWindow.postMessage(message, 'https://utteranc.es');
  }
}

function setIconTheme(theme) {
  const twitterIconElement = document.getElementById('twitter-icon')
  const githubIconElement = document.getElementById('github-icon')
  if (twitterIconElement) {
    if (theme === 'light') {
      twitterIconElement.setAttribute("fill", "black")
    } else if (theme === 'dark') {
      twitterIconElement.setAttribute("fill", "white")
    }
  }

  if (githubIconElement) {
    if (theme === 'light') {
      githubIconElement.removeAttribute('color')
      githubIconElement.removeAttribute('class')
    } else if (theme === 'dark') {
      githubIconElement.setAttribute('class', 'octicon')
      githubIconElement.setAttribute('color', '#f0f6fc')
    }
  }
}

function currentTheme() {
  const localStyle = localStorage.getItem('data-color-mode');
  const systemStyle = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  return localStyle || systemStyle;
}

(() => {
  setTheme(currentTheme());
})();

document.addEventListener("DOMContentLoaded", () => {
  const savedTheme = localStorage.getItem('data-color-mode') || 'light';
  document.documentElement.setAttribute('data-color-mode', savedTheme);

  const utterancesFrame = document.querySelector('.utterances-frame');
  if (utterancesFrame) {
    const message = {
      type: 'set-theme',
      theme: savedTheme === 'dark' ? 'github-dark' : 'github-light'
    };
    utterancesFrame.contentWindow.postMessage(message, 'https://utteranc.es');
  }
});