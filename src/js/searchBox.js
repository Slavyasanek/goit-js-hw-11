import { fetchPictures } from "./fetchPictures";
import Notiflix, { Notify } from 'notiflix';

const refs = {
    gallery: document.querySelector('.gallery'),
    submitForm: document.querySelector('.search-form'),
    loadBtn: document.querySelector('load-more'),
}

const renderPosts = (pictures) => {
    const posts = pictures.map(({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => {
        return `<div class="photo-card">
        <a href="${largeImageURL}"><img src="${webformatURL}" alt="${tags}" loading="lazy" /></a>
        <div class="info">
          <p class="info-item">
            <b>Likes: ${likes}</b>
          </p>
          <p class="info-item">
            <b>Views ${views}</b>
          </p>
          <p class="info-item">
            <b>Comments: ${comments}</b>
          </p>
          <p class="info-item">
            <b>Downloads: ${downloads}</b>
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

console.log(refs.submitForm.searchQuery)