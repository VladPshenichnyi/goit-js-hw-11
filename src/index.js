import './sass/main.scss';
import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import FetchApiPictures from './api/ApiPixabayService'


let picturesSetFind = '';


const refs = {
    inputForm: document.querySelector('input'),
    submitFormBtn: document.querySelector('.search-form'),
    picturesList: document.querySelector('.gallery'),
    loadMoreBtn: document.querySelector('.load-more')
}

const fetchApiPictures = new FetchApiPictures();

refs.inputForm.focus()
refs.submitFormBtn.addEventListener('submit', onSearchPictures)
// refs.loadMoreBtn.addEventListener('click', onLoadMore)

function onSearchPictures(e) {
    e.preventDefault()

    fetchApiPictures.query = e.currentTarget.elements.searchQuery.value;
    fetchApiPictures.resetPage();
    fetchApiPictures.fetchPicture()
}