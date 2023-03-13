import { fetchPictures } from "./fetchPictures";
import Notiflix, { Notify } from 'notiflix';

export const refs = {
  gallery: document.querySelector('.gallery'),
  submitForm: document.querySelector('.search-form'),
  loadBtn: document.querySelector('load-more'),
}

const renderPosts = (pictures) => {
  const posts = pictures.map(({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => {
    return `<div class="photo-card">
        <a href="${largeImageURL}" class="img-thumb"><img src="${webformatURL}" alt="${tags}" loading="lazy" class="img-main"/></a>
        <div class="info">
          <p class="info-item">
          Likes: ${likes}
          </p>
          <p class="info-item">
            Views ${views}
          </p>
          <p class="info-item">
            Comments: ${comments}
          </p>
          <p class="info-item">
            Downloads: ${downloads}
          </p>
        </div>
      </div>`
  }).join("")
  return posts;
}

const getImages = (e) => {
  refs.gallery.innerHTML = "";
  e.preventDefault();
  const request = refs.submitForm.searchQuery.value;
  fetchPictures(request)
    .then(r => {
      if (r.hits.length === 0) {
        Notiflix.Notify.failure(
          'Sorry, there are no images matching your search query. Please try again.',
          {
            timeout: 2000,
            cssAnimationStyle: 'zoom',
          });
      } else {
        const posts = renderPosts(r.hits);
        page = 1;
        refs.gallery.insertAdjacentHTML("beforeend", posts);
      }
    })
    .catch(er => {
      console.log(er);
    })
}

refs.submitForm.addEventListener("submit", getImages);
