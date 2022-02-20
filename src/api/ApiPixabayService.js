import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api';
const API_KEY = '/?key=25756653-ca7b891a55f16e964dd1f6216';
const OPTIONS_SEARCH = 'image_type=photo&orientation=horizontal&safesearch=true&per_page=40'

export default class FetchApiPictures { 
    constructor() { 
        this.searchPicture = '';
        this.page = 1;
        this.totalPictures = 0;
        this.inPage = 0;
    };

    

    fetchPicture = async () => {
        const url = `${BASE_URL}${API_KEY}&q=${this.searchPicture}&${OPTIONS_SEARCH}&page=${this.page}`;
        const response = await axios.get(url);
        const { data } = await response;
        this.incrementPage()
        return data;
    };

    incrementPage() {
        this.page += 1;
    }

    resetPage() {
        this.page = 1;
    }

    totalPicture(picturesCount, pageCount) { 
        this.totalPictures = picturesCount;
        this.inPage = pageCount
    }

    stillHave() {
        if (this.totalPictures >= 40) {
            this.totalPictures -= this.inPage
        } if (this.totalPictures < 40 )  { 
            this.inPage = this.totalPictures
        }    
    }

    get query() { 
        return this.searchPicture;
    }

    set query(newQuery) {
        this.searchPicture = newQuery;
    }
}