import './sass/main.scss';
import Notiflix from 'notiflix';
// import SimpleLightbox from 'simplelightbox';
// import 'simplelightbox/dist/simple-lightbox.min.css';
// import FetchApiPictures from './api/ApiPixabayService'


let picturesSetFind = '';

const inputRef = document.querySelector('input');
const submitRef = document.querySelector('form')
const resultOfSearch = {
    picturesList: document.querySelector('.gallery'),
};

// const fetchApiPictures = new FetchApiPictures();


inputRef.addEventListener('input', onFindPictures);
submitRef.addEventListener('submit', onSubmitBtn)


function onFindPictures(e) {    
    e.preventDefault()
    picturesSetFind = inputRef.value;
    console.log(picturesSetFind);
}


function onSubmitBtn(e) {
    e.preventDefault()
    const API_KEY = '/?key=25756653-ca7b891a55f16e964dd1f6216';
    const BASE_URL = 'https://pixabay.com/api';
    const url = `${ BASE_URL }${API_KEY}&q=${picturesSetFind}`
    fetch(url).then((response) => {
        if (!response.ok) {
        throw new Error(response.status);
        }
        return response.json();
    }).then(data => console.log(data))
}
