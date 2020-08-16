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

    console.log(response.data)
};

const input = document.querySelector('input');
//The input event is triggered anytime a user changes the text inside the input 
input.addEventListener('input', (event) =>{
    //What ever the user has changed in the input
    fetchData(event.target.value);
})