const BASE_URL = 'https://pixabay.com/api';
const API_KEY = '/?key=25756653-ca7b891a55f16e964dd1f6216';
const OPTIONS_SEARCH = 'image_type=photo,orientation=horizontal&safesearch=false&per_page=16'

export default class FetchApiPictures { 
    constructor() { 
        this.searchPicture = '';
        this.page = 1
    };

    fetchPicture() {        
        const url = `${BASE_URL}${API_KEY}&q=${this.searchPicture}&${OPTIONS_SEARCH}&page=${this.page}`
        return fetch(url).then(response => {
            if (!response.ok) {
                throw new Error(response.status);
            }
            return response.json();
        }).then(data => {
            this.incrementPage()
            return data;               
        })   
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