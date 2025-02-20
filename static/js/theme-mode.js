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
    const utterancesContainer = document.querySelector('.utterances');

    if (utterancesContainer) {
        utterancesContainer.remove(); // Remove existing Utterances iframe
    }

    const repo = "{{ .Site.Params.utterancesRepo }}"; // Use Hugo variable

    const newScript = document.createElement("script");
    newScript.src = "https://utteranc.es/client.js";
    newScript.setAttribute("repo", repo);
    newScript.setAttribute("issue-term", "pathname");
    newScript.setAttribute("theme", theme === "dark" ? "github-dark" : "github-light");
    newScript.setAttribute("crossorigin", "anonymous");
    newScript.async = true;

    document.body.appendChild(newScript); // Append the new script to reload Utterances
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
