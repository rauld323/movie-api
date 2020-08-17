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
    //'Search' uses an uppercase Letter because thats how the API labels it.
    return response.data.Search;
};

const input = document.querySelector('input');

//This make sure that time passes before a the fetchData
const onInput = async event => {
        //What ever the user has changed in the input
        const movies = await fetchData(event.target.value);
        console.log(movies)
};
//The input event is triggered anytime a user changes the text inside the input 
input.addEventListener('input', debounce(onInput, 500));