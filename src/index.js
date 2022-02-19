import './sass/main.scss';
import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import FetchApiPictures from './api/ApiPixabayService';
import pictureListTmp from './templates/pictureListTpl.hbs'


const refs = {
    inputForm: document.querySelector('input'),
    searchForm: document.querySelector('.search-form'),
    picturesGallery: document.querySelector('.gallery'),
    loadMoreBtn: document.querySelector('.load-more')
}

const fetchApiPictures = new FetchApiPictures();

const lightbox = new SimpleLightbox('.gallery a', {
    captionsData: 'alt',
    captionDelay: 300,
});

// window.scrollBy({
//     top: cardHeight * 2,
//     behavior: 'smooth',
//     });
// const { height: cardHeight } = document
//     .querySelector('.gallery')
//     .firstElementChild.getBoundingClientRect();

refs.inputForm.focus()
refs.searchForm.addEventListener('submit', onSearchPictures)
refs.loadMoreBtn.addEventListener('click', onLoadMore)

function onSearchPictures(e) {
    e.preventDefault()

    fetchApiPictures.query = e.currentTarget.elements.searchQuery.value;
    const searchPicture = fetchApiPictures.query

    if (searchPicture === '') {
        return Notiflix.Notify.failure('Введите что нибудь');
    }

    fetchApiPictures.resetPage();
    fetchApiPictures.fetchPicture().then(data => {
        if (data.total === 0) { 
            Notiflix.Notify.failure("Sorry, there are no images matching your search query. Please try again.")
        } else {
            Notiflix.Notify.success(`Мы нашли ${data.total} изображений по запросу ${searchPicture}`)
            clearPicturesGallery()
            createGallery(data.hits)
        }
    })
}

function onLoadMore() { 
    fetchApiPictures.fetchPicture().then(data => {        
        createGallery(data.hits)
    })

}
    
function createGallery(hits) { 
    refs.picturesGallery.insertAdjacentHTML('beforeend', pictureListTmp(hits))
}

function clearPicturesGallery() { 
    refs.picturesGallery.innerHTML = '';
}
