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

refs.inputForm.focus()
refs.searchForm.addEventListener('submit', onSearchPictures)
refs.loadMoreBtn.addEventListener('click', onLoadMore)

function onSearchPictures(e) {
    e.preventDefault()

    window.scrollTo({
    top: 0,
    behavior: "smooth"
    });

    fetchApiPictures.query = e.currentTarget.elements.searchQuery.value.trim();
    const searchPicture = fetchApiPictures.query
    
    if (searchPicture === '') {
        return Notiflix.Notify.failure('Введите что нибудь');
    } 

    fetchApiPictures.resetPage();
    fetchApiPictures.fetchPicture().then(data => {
        if (data.total === 0) { 
            refs.inputForm.value = ''
            refs.loadMoreBtn.classList.remove('active') 
            Notiflix.Notify.failure("Sorry, there are no images matching your search query. Please try again.")
        }  else {
            Notiflix.Notify.success(`Мы нашли ${data.totalHits} изображений по запросу "${searchPicture}"`);
        }
        
        fetchApiPictures.totalPicture(data.totalHits , data.hits.length)
        fetchApiPictures.stillHave()
        loadMoreShowBtn()
        clearPicturesGallery();
        createGallery(data.hits);
        lightbox.refresh();
    })
}

function onLoadMore() { 
    fetchApiPictures.fetchPicture().then(data => {        
        createGallery(data.hits)
        lightbox.refresh();
        if (data.hits.length < 40) {
            refs.loadMoreBtn.classList.remove('active')         
            return Notiflix.Notify.success(`Эти были последние 😒`)
        } 
        refs.loadMoreBtn.textContent = `Показать еще ${fetchApiPictures.inPage} из ${fetchApiPictures.totalPictures}`
    })
    fetchApiPictures.stillHave()
}

function createGallery(hits) { 
    refs.picturesGallery.insertAdjacentHTML('beforeend', pictureListTmp(hits))
}

function clearPicturesGallery() { 
    refs.picturesGallery.innerHTML = '';
}

function loadMoreShowBtn() { 
    if (fetchApiPictures.totalPictures > 40) { 
        refs.loadMoreBtn.classList.add('active')
    }
    refs.loadMoreBtn.textContent = `Показать еще ${fetchApiPictures.inPage} из ${fetchApiPictures.totalPictures}`    
}