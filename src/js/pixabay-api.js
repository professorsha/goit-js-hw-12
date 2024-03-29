const inputOfWords = document.querySelector('.query');     // Інпут
const buttonForInput = document.querySelector('.search-button'); // Кнопка


let wordOfUser = '';


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

await function fetchImages() {                            // Запит на сервер для отримання фото
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

import { userList, renderImg, loaderF, spanElementRem,} from './render-functions.js';