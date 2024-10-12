export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}


export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}

export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

export function getParam(param) {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const product = urlParams.get(param);
  return product;
}

export function setClick(selector, callback) {
  qs(selector).addEventListener('touchend', (event) => {
    event.preventDefault();
    callback();
  });
  qs(selector).addEventListener('click', callback);
}

export function renderListWithTemplate(templateFn, parentElement, list, position = 'afterbegin', clear = false) {
  if (clear) {
    parentElement.innerHTML = ''; 
  }
  const htmlStrings = list.map(templateFn);
  parentElement.insertAdjacentHTML(position, htmlStrings.join(''));
}

export function updateCartCount() {
  const cartItems = JSON.parse(localStorage.getItem('so-cart')) || [];
  const cartCountElement = document.getElementById('cart-count');
  cartCountElement.textContent = cartItems.length;
}


export function renderWithTemplate(template, parent, position = 'afterbegin', clear = false, callback = null) {
  if (clear) {
    parent.innerHTML = ''; 
  }

  parent.insertAdjacentHTML(position, template);

  if (callback) {
    callback();
  }
}

async function loadTemplate(templatePath) {
  const response = await fetch(templatePath);
  
  if (response.ok) {
    return response.text();
  } else {
    throw new Error(`Failed to load template: ${templatePath}`);
  }
}

export async function loadHeaderFooter() {
  try {
    const headerTemplate = await loadTemplate('/partials/header.html');
    const footerTemplate = await loadTemplate('/partials/footer.html');

    const headerElement = document.getElementById('main-header');
    const footerElement = document.getElementById('main-footer');

    renderWithTemplate(headerTemplate, headerElement, 'afterbegin', true, () => {
      updateCartCount();
    });

    renderWithTemplate(footerTemplate, footerElement, 'afterbegin', true);
  } catch (error) {
    console.error('Error loading header or footer:', error);
  }
}

export function alertMessage(message, scroll = true) {
  const existingAlert = document.querySelector('.alert-message');
  if (existingAlert) {
    existingAlert.remove();
  }

  const alertDiv = document.createElement('div');
  alertDiv.classList.add('alert-message');
  alertDiv.innerHTML = `
    <p>${message}</p>
    <span class="close-alert">&times;</span>
  `;

  alertDiv.style.cssText = `
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    background-color: #ffcc00;
    color: #333;
    padding: 15px;
    font-size: 16px;
    text-align: center;
    z-index: 1000;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  `;

  alertDiv.querySelector('.close-alert').style.cssText = `
    position: absolute;
    top: 5px;
    right: 10px;
    cursor: pointer;
  `;

  alertDiv.querySelector('.close-alert').addEventListener('click', () => {
    alertDiv.remove();
  });

  const mainElement = document.querySelector('main');
  if (mainElement) {
    mainElement.prepend(alertDiv);
  }

  if (scroll) {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}




