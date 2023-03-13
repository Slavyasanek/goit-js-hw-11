import Notiflix, { Notify } from 'notiflix';

const noSuccess = () => {
    return Notiflix.Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.',
        {
            timeout: 2000,
            cssAnimationStyle: 'zoom',
        });
}

const totalHitsSucces = (amount) => {
    return Notiflix.Notify.success(
        `Hooray! We found ${amount} images.`,
        {
            timeout: 2000,
            cssAnimationStyle: 'zoom',
        });
}

const endOfLoad = () => {
    return Notiflix.Notify.info(
        `We're sorry, but you've reached the end of search results.`,
        {
            timeout: 2000,
            cssAnimationStyle: 'zoom',
        });
}

const emptyRequestAlert = () => {
    return Notiflix.Notify.info(
        `Your request is empty! That's why we provide you with amazing pictures:)`,
        {
            timeout: 3000,
            cssAnimationStyle: 'zoom',
        });
}

export { noSuccess, totalHitsSucces, endOfLoad, emptyRequestAlert};