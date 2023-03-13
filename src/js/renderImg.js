export const renderPosts = (pictures) => {
    const posts = pictures.map(({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => {
      return `<div class="photo-card">
          <a href="${largeImageURL}" class="img-thumb"><img src="${webformatURL}" alt="${tags}" loading="lazy" class="img-main"/></a>
          <div class="info">
            <p class="info-item">
            <span>Likes:</span><span> ${likes}</span>
            </p>
            <p class="info-item">
              <span>Views:</span><span> ${views}</span>
            </p>
            <p class="info-item">
              <span>Comments:</span><span> ${comments}</span>
            </p>
            <p class="info-item">
              <span>Downloads:</span> <span>${downloads}</span>
            </p>
          </div>
        </div>`
    }).join("")
    return posts;
  }