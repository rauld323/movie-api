const debounce = (func, delay = 1000) => {
    let timeOutId;
    //Wrapper; This provides a shield as to how many times func can be invoked
    return (...args) => {
        if (timeOutId) {
            clearTimeout(timeOutId);
        }
        timeOutId = setTimeout(() => {
            func.apply(null, args);
        }, delay)
    };
};