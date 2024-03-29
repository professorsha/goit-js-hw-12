import iziToast from 'izitoast';                                  // Бібліотека для повідомлень
import 'izitoast/dist/css/iziToast.min.css';

import SimpleLightbox from 'simplelightbox';                      // Бібліотека для галереї
import 'simplelightbox/dist/simple-lightbox.min.css';

const inputOfWords = document.querySelector('.query');     // Інпут
const buttonForInput = document.querySelector('.search-button'); // Кнопка
const userList = document.querySelector('.result');             // Галерея
const areaForLoader = document.querySelector('.forLoader');   // Лоадер

let wordOfUser = '';
let imagesLength = '';

const lightbox = new SimpleLightbox('.result a', {   // Великі картинки 
  captionDelay: 250,
  captionsData: 'alt',
});

buttonForInput.addEventListener('click', event => {   // Надсилання запиту на сервер
  loaderF();
  event.preventDefault();
  userList.innerHTML = '';
  setTimeout(() => {
    wordOfUser = inputOfWords.value.trim();
    checkInputValidity();
  }, 2000);
});

function checkInputValidity() {                   // Перевірка валідності запиту
  fetchImages()
    .then(images => {
      if (wordOfUser === '') {
        iziToast.show({
          color: 'red',
          message: `Sorry, the input field must be filled in to start the photo search.`,
          position: 'topCenter',
        });
      } else if (images.length === 0) {
        iziToast.show({
          color: 'red',
          message: `Sorry, there are no images matching your search query. Please try again!`,
          position: 'topCenter',
        });
      } else {
        renderImg(images);
      }
    })
    .catch(error => console.log(error))
    .finally(() => spanElementRem());
}

function renderImg(images) {                        // Рендар фото в браузері
  imagesLength = images.length;

  const markupImg = images                          
    .map(image => {
      return `<div class="blockForAllElements">
          <li>
          <a href=${image.largeImageURL} download="false">
          <img src=${image.webformatURL} alt = "${image.tags}" class = "imgOfUser">
          </a>
          </li>
          <div class = "divForDescription"> 
          <ul class="blockOfInfo"> 
            <li class="title">Likes</li>
            <li class="info">${image.likes}</li>
          </ul>
          <ul class="block">
            <li class="title">Views</li>
            <li class="info">${image.views}</li>
          </ul>
          <ul class="block">
            <li class="title">Comments</li>
            <li class="info">${image.comments}</li>
          </ul>
          <ul class="block">
            <li class="title">Downloads</li>
            <li class="info">${image.downloads}</li>
          </ul>
          </div>
        </div>`;
    })
    .join('');
  userList.insertAdjacentHTML('beforeend', markupImg);

  lightbox.refresh();
}

function fetchImages() {                            // Запит на сервер для отримання фото
  return fetch(
    `https://pixabay.com/api/?key=42977219-0f6c9f9217f976d8651793c3a&q=${wordOfUser}&image_type=photo&per_page=15&orientation=horizontal&safesearch=true`
  )
    .then(response => {
      if (!response.ok) {
        throw new Error(response.status);
      }
      return response.json();
    })
    .then(data => data.hits);
}

function loaderF() {                                  // Створюємо лоадер
  const spanElement = document.createElement('span');
  areaForLoader.appendChild(spanElement);
  spanElement.classList.add('loader');
}

function spanElementRem() {                           // Видаляємо лоадер
  const loaderF = document.querySelector('.loader');
  loaderF.remove();
}
