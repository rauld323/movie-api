const createAutoComplete = ({root, renderOption, onOptionSelect, inputValue, fetchData}) => {
    //autocomplete widget
    root.innerHTML = `
        <label><b>Search</b></lable>
        <input class="input" />
        <div class="dropdown">
            <div class="dropdown-menu">
                <div class="dropdown-content results"></div>
            </div>
        </div>
`;

    const input = root.querySelector('input');
    const dropdown = root.querySelector('.dropdown');
    const resultsWrapper = root.querySelector('.results')

    //This make sure that time passes before a the fetchData
    const onInput = async event => {
        //What ever the user has changed in the input
        const items = await fetchData(event.target.value);

        //Function ensures that everything clears up if nothing is added.
        if (!items.length) {
            dropdown.classList.remove('is-active');
            return;
        }

        //Allows for for follwoing search
        resultsWrapper.innerHTML = '';

        //this will activitated as soon as the data has been fetched successfuly 
        dropdown.classList.add('is-active');
        //This loop allows for all the movie posters to apper
        for (let item of items) {
            const option = document.createElement('a');
            //Checks for results that return with a N/A

            option.classList.add('dropdown-item');
            option.innerHTML = renderOption(item);
            //Closes dropdown once a movie is chosen
            option.addEventListener('click', () => {
                dropdown.classList.remove('is-active');
                //Returns title to the input section
                input.value = inputValue(item);
                onOptionSelect(item);
            })

            resultsWrapper.appendChild(option);
        }
    };
    //The input event is triggered anytime a user changes the text inside the input 
    input.addEventListener('input', debounce(onInput, 500));

    //Closes dropdown menu
    document.addEventListener('click', event => {
        //If the root element does not contain the element that was clicked on, close dropdown line 26
        if (!root.contains(event.target)) {
            dropdown.classList.remove('is-active');
        }
    })
};