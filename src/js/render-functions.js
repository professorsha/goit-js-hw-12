import iziToast from 'izitoast';                                  // Бібліотека для повідомлень
import 'izitoast/dist/css/iziToast.min.css';

import SimpleLightbox from 'simplelightbox';                      // Бібліотека для галереї
import 'simplelightbox/dist/simple-lightbox.min.css';

export const userList = document.querySelector('.result');             // Галерея
export const areaForLoader = document.querySelector('.forLoader');   // Лоадер

export const lightbox = new SimpleLightbox('.result a', {   // Великі картинки 
  captionDelay: 250,
  captionsData: 'alt',
});

export let imagesLength = '';

export function renderImg(images) {                        // Рендар фото в браузері
  imagesLength = images.length;

  const markupImg = images                          
    .map(image => {
      console.log(image);
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

export function loaderF() {                                  // Створюємо лоадер
  const spanElement = document.createElement('span');
  areaForLoader.appendChild(spanElement);
  spanElement.classList.add('loader');
}

export function spanElementRem() {                           // Видаляємо лоадер
  const loaderF = document.querySelector('.loader');
  loaderF.remove();
}


