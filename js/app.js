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
        
        //This loop allows for all the movie posters to apper
        for(let movie of movies){
            const div = document.createElement('div');
            
            div.innerHTML = `
                <img src="${movie.Poster}" /> 
                <h1>${movie.title}</h1>
            `;

            document.querySelector('#target').appendChild(div);
        }
};
//The input event is triggered anytime a user changes the text inside the input 
input.addEventListener('input', debounce(onInput, 500));