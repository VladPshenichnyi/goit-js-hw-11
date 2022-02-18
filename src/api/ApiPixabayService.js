export default class FetchApiPictures { 
    constructor() { 
        this.searchPicture = '';
        this.page = 1
        this.seekOptions = `image_type=photo,orientation=horizontal&safesearch=true&page=${this.page}&per_page=16`;
    };

    fetchPicture() {
        const BASE_URL = 'https://pixabay.com/api';
        const API_KEY = '/?key=25756653-ca7b891a55f16e964dd1f6216';
        const url = `${BASE_URL}${API_KEY}&q=${this.searchPicture}&${this.seekOptions}`
        fetch(url).then((response) => {
            if (!response.ok) {
            throw new Error(response.status);
            }
            return response.json();
        }).then(data => {
            this.incrementPage()
            console.log(data);
            return console.log(data.hits);             
        })
        // if (this.picture === '') {
        //     console.log('Пусто');
        //     // return Notiflix.Notify.failure('Введите что нибудь');
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
    }

    incrementPage() {
        this.page += 1;
    }

    resetPage() {
        this.page = 1;
    }

    get query() { 
        return this.searchPicture;
    }

    set query(newQuery) {
        this.searchPicture = newQuery;
    }
}