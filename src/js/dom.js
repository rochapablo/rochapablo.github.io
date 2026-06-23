export function setText(selector, text) {
  document.querySelectorAll(selector).forEach((element) => {
    element.textContent = text;
  });
}

export function clearElement(selector) {
  const element = document.querySelector(selector);

  if (element) {
    element.replaceChildren();
  }

  return element;
}

export function createElement(tagName, options = {}) {
  const element = document.createElement(tagName);

  if (options.className) {
    element.className = options.className;
  }

  if (options.text) {
    element.textContent = options.text;
  }

  if (options.href) {
    element.href = options.href;
  }

  return element;
}
