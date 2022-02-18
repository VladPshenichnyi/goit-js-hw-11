import './sass/main.scss';
import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import FetchApiPictures from './api/ApiPixabayService'
import pictureListTmp from './templates/pictureListTpl.hbs'


// let picturesSetFind = '';


const refs = {
    inputForm: document.querySelector('input'),
    searchForm: document.querySelector('.search-form'),
    picturesGallery: document.querySelector('.gallery'),
    loadMoreBtn: document.querySelector('.load-more')
}

const fetchApiPictures = new FetchApiPictures();

refs.inputForm.focus()
refs.searchForm.addEventListener('submit', onSearchPictures)
// refs.loadMoreBtn.addEventListener('click', onLoadMore)

function onSearchPictures(e) {
    e.preventDefault()

    fetchApiPictures.query = e.currentTarget.elements.searchQuery.value;
    const searchPicture = fetchApiPictures.query

    if (searchPicture === '') {
        return Notiflix.Notify.failure('Введите что нибудь');
    }

    fetchApiPictures.resetPage();
    fetchApiPictures.fetchPicture()
        // if (total === 0) { 
        //     Notiflix.Notify.failure("Sorry, there are no images matching your search query. Please try again.")
        // } else {
        //     Notiflix.Notify.success(`Мы нашли ${total} изображений по запросу ${searchPicture}`)
            // clearPicturesGallery()
            // createGallery(hits)
        // }
    
}

function createGallery(hits) { 
    refs.picturesGallery.insertAdjacentHTML('beforeend', pictureListTmp(hits))
}

function clearPicturesGallery() { 
    refs.picturesGallery.innerHTML = '';
}
// if (this.picture === '') {
        //     console.log('Пусто');
        //     //
        // }
        // else {
        //     fetch(url).then((response) => {
        //     if (!response.ok) {
        //     throw new Error(response.status);
        //     }
        //     return response.json();
        //     }).then(data => {
        //         if (data.total === 0) {
        //         console.log("Sorry, there are no images matching your search query. Please try again.");
        //         // Notiflix.Notify.failure("Sorry, there are no images matching your search query. Please try again.")
        //     }
        //     else {
        //         // Notiflix.Notify.success(`Мы нашли ${data.total} изображений по запросу ${picturesSetFind}`)
        //         console.log(data)
        //         console.log(`Мы нашли ${data.total} изображений по запросу ${this.searchPicture}`)
        //     }
        //     })
        // }