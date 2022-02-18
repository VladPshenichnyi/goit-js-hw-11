import './sass/main.scss';
import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import FetchApiPictures from './api/ApiPixabayService'


let picturesSetFind = '';


const refs = {
    inputForm: document.querySelector('input'),
    submitFormBtn: document.querySelector('form'),
    picturesList: document.querySelector('.gallery')
}

refs.inputForm.focus()
refs.inputForm.addEventListener('input', searchPictures);
refs.submitFormBtn.addEventListener('submit', onSubmitBtn)

// const fetchApiPictures = new FetchApiPictures();

function searchPictures() {    
    picturesSetFind = refs.inputForm.value.trim();    
}

function onSubmitBtn(e) {
    e.preventDefault()
    const API_KEY = '/?key=25756653-ca7b891a55f16e964dd1f6216';
    const BASE_URL = 'https://pixabay.com/api';
    const url = `${BASE_URL}${API_KEY}&q=${picturesSetFind}`
    if (picturesSetFind === '') {
        return Notiflix.Notify.failure('Введите что нибудь');
    }
    else 
    {
        fetch(url).then((response) => {
        if (!response.ok) {
        throw new Error(response.status);
        }
        return response.json();
        }).then(data => {
            if (data.total === 0) {
                Notiflix.Notify.failure("Sorry, there are no images matching your search query. Please try again.")
            }
            else {
                Notiflix.Notify.success(`Мы нашли ${data.total} изображений по запросу ${picturesSetFind}`)
                console.log(data)
            }
        })
    }   
}
