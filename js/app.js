//Make a network request with axios
const fetchData = async (searchTerm) => {
    //"await" is waiting to get the response from the url
    const response = await axios.get('http://www.omdbapi.com/', {
        //params object was created to append things to the url
        params: {
            apikey: '6a3dec8a',
            s: searchTerm
        }
    });

    //If search is mispelled it will not try to fetch information
    if(response.data.Error){
        return[];
    }

    //'Search' uses an uppercase Letter because thats how the API labels it.
    return response.data.Search;
};

//autocomplete widget
const root =document.querySelector('.autocomplete');
root.innerHTML = `
    <label><b>Search For a Movie</b></lable>
    <input class="input" />
    <div class="dropdown">
        <div class="dropdown-menu">
            <div class="dropdown-content results"></div>
        </div>
    </div>
`;

const input = document.querySelector('input');
const dropdown = document.querySelector('.dropdown');
const resultsWrapper = document.querySelector('.results')

//This make sure that time passes before a the fetchData
const onInput = async event => {
        //What ever the user has changed in the input
        const movies = await fetchData(event.target.value);
        
        //Function ensures that everything clears up if nothing is added.
        if(!movies.length) {
            dropdown.classList.remove('is-active');
            return;
        }

        //Allows for for follwoing search
        resultsWrapper.innerHTML = '';
       
        //this will activitated as soon as the data has been fetched successfuly 
        dropdown.classList.add('is-active');
        //This loop allows for all the movie posters to apper
        for(let movie of movies){
            const option = document.createElement('a');
            //Checks for results that return with a N/A
            const imgSrc = movie.Poster === 'N/A' ? '': movie.Poster;

            option.classList.add('dropdown-item');
            option.innerHTML = `
                <img src="${imgSrc}" /> 
                ${movie.Title}
            `;
            //Closes dropdown once a movie is chosen
            option.addEventListener('click',() => {
                dropdown.classList.remove('is-active');
                //Returns title to the input section
                input.value = movie.Title;
                onMovieSelect(movie);
            })

            resultsWrapper.appendChild(option);
        }
};
//The input event is triggered anytime a user changes the text inside the input 
input.addEventListener('input', debounce(onInput, 500));

//Closes dropdown menu
document.addEventListener('click', event => {
    //If the root element does not contain the element that was clicked on, close dropdown line 26
    if (!root.contains(event.target)){
        dropdown.classList.remove('is-active');
    } 
})

const onMovieSelect = async movie => {
    const response = await axios.get('http://www.omdbapi.com/', {
        //params object was created to append things to the url
        params: {
            apikey: '6a3dec8a',
            i: movie.imdbID
        }
    });
    document.querySelector('#summary').innerHTML = movieTemplate(response.data);
}

const movieTemplate = (movieDetail) => {
    return `
        <article class="media">
            <figure class="media-left">
                <p class="image">
                    <img src="${movieDetail.Poster}"/>
                </p>
            </figure>
            <div class="media-content">
                <div class="content">
                    <h1>${movieDetail.Title}</h1>
                    <h4>${movieDetail.Genre}</h4>
                    <p>${movieDetail.Plot}</p>
                </div>
            </div>
        </article>
        <article class="notification is-primary">
            <p class="title">${movieDetail.Awards}</p>
            <p class="subtitle">Awards</p>
        </article>
        <article class="notification is-primary">
            <p class="title">${movieDetail.BoxOffice}</p>
            <p class="subtitle">Box Office</p>
        </article>
        <article class="notification is-primary">
            <p class="title">${movieDetail.Metascore}</p>
            <p class="subtitle">Metascore</p>
        </article>
        <article class="notification is-primary">
            <p class="title">${movieDetail.imdbRating}</p>
            <p class="subtitle">IMDB Rating</p>
        </article>
        <article class="notification is-primary">
            <p class="title">${movieDetail.imdbVotes}</p>
            <p class="subtitle">IMDB Votes</p>
        </article>
    `;
}