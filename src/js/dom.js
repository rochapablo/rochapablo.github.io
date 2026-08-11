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

  if (options.target) {
    element.target = options.target;
  }

  if (options.rel) {
    element.rel = options.rel;
  }

  if (options.download) {
    element.download = typeof options.download === "string" ? options.download : "";
  }

  return element;
}

export function appendChildren(target, children) {
  if (!target || children.length === 0) {
    return target;
  }

  const fragment = document.createDocumentFragment();
  children.forEach((child) => {
    fragment.appendChild(child);
  });
  target.appendChild(fragment);

  return target;
}
