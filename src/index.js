import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import throttle from "lodash.throttle";

import { fetchPictures } from "./js/fetchPictures";
import { noSuccess, totalHitsSucces, endOfLoad } from "./js/alerts";
import { renderPosts } from "./js/renderImg";

let page = 1;
let simplelightbox;
let totalPages;
let shouldLoad = true;

export const refs = {
  gallery: document.querySelector('.gallery'),
  submitForm: document.querySelector('.search-form'),
  loadBtn: document.querySelector('load-more'),
}

const getImages = (e) => {
  refs.gallery.innerHTML = "";
  e.preventDefault();
  page = 1;
  const request = refs.submitForm.searchQuery.value.trim();
  fetchPictures(request, page)
    .then(r => {
      if (r.hits.length === 0) {
        noSuccess();
      } else {
        totalHitsSucces(r.totalHits);
        totalPages = Math.ceil(r.totalHits / 40);
        console.log(r);
        const posts = renderPosts(r.hits);
        refs.gallery.insertAdjacentHTML("beforeend", posts);
        if (r.total > 40) {
          shouldLoad = true;
          window.addEventListener("scroll", throttle(loadMore, 500))
        }
      }
    })
    .catch(er => {
      console.log(er);
    })
}

refs.submitForm.addEventListener("submit", getImages);

const loadMore = () => {
  const heightOfBody = document.body.offsetHeight;
  const screenHeight = window.innerHeight;
  const scrolled = window.pageYOffset;

  const thershold = scrolled + screenHeight;
  const request = refs.submitForm.searchQuery.value.trim();

  if (thershold >= heightOfBody && shouldLoad) {
    page += 1;
    fetchPictures(request, page)
      .then((r) => {
        if (totalPages < page) {
          endOfLoad();
          shouldLoad = false;
          return;
        } else {
          const posts = renderPosts(r.hits);
          refs.gallery.insertAdjacentHTML("beforeend", posts);
        }
      })
  }
}

