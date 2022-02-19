import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api';
const API_KEY = '/?key=25756653-ca7b891a55f16e964dd1f6216';
const OPTIONS_SEARCH = 'image_type=photo&orientation=horizontal&safesearch=true&per_page=40'

export default class FetchApiPictures { 
    constructor() { 
        this.searchPicture = '';
        this.page = 1;
        this.totalPictures = 0;
        this.stillHavePicture = 0;
        this.parePage = 0;
    };

    async fetchPicture() {        
        const url = `${BASE_URL}${API_KEY}&q=${this.searchPicture}&${OPTIONS_SEARCH}&page=${this.page}`
        return fetch(url).then(response => {
            if (!response.ok) {
                throw new Error(response.status);
            }
            return response.json();
        }).then(data => {
            this.incrementPage()
            this.stillHave()
            // this.totalPicture(data.total)
            // this.stillHave()
            // console.log(this.stillHavePicture);
            // console.log(this.stillHavePicture - this.parePage)
            return data;               
        })   
    }

    incrementPage() {
        this.page += 1;
    }

    resetPage() {
        this.page = 1;
    }

    totalPicture(data, page) { 
        this.totalPictures = data;
        this.parePage = page
        // console.log(this.totalPictures)
        // console.log(this.parePage)
    }

    stillHave() {
        if (this.totalPictures >= 40) {
            this.totalPictures -= this.parePage
        } if (this.totalPictures < 40 )  { 
            this.parePage = this.totalPictures
        }    
    }

    get query() { 
        return this.searchPicture;
    }

    set query(newQuery) {
        this.searchPicture = newQuery;
    }
}