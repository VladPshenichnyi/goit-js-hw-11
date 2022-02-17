const API_KEY = '/?key=25756653-ca7b891a55f16e964dd1f6216';
const BASE_URL = 'https://pixabay.com/api';
// fetch(`${ API_URL }${API_KEY}}&q=${onSearch}`).getJSON(URL, function(data){
// if (parseInt(data.totalHits) > 0)
//     $.each(data.hits, function(i, hit){ console.log(hit.pageURL); });
// else
//     console.log('No hits');
// });

export default class FetchApiPictures { 
    constructor() { 
        this.picture = '';
        this.seekOptions = 'image_type=photo,orientation=horizontal,safesearch=false';
    };

    fetchPicture() {
        const url = `${ BASE_URL }${API_KEY}&q=${this.picture}&${this.seekOptions}`;
        // console.log(`Мы ищем ==> ${}`);
        return fetch(url).then((response) => {
            if (!response.ok) {
            throw new Error(response.status);
            }
            return response.json();
        })
            .then(picture => { 
            // console.log(picture)
            return picture;                   
            })
    }

    get country() { 
        return this.picture;
    }

    set country(newPicture) {
        this.picture = newPicture;
    }
}