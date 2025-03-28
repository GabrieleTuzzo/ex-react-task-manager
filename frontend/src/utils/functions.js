const symbols = '!@#$%^&*()-_=+[]{}|;:\'\\",.<>?/`~';

function isTitleValid(title) {
    return (
        (title && ![...title].some((char) => symbols.includes(char))) || false
    );
}

function debounce(callback, delay) {
    let timer;
    return (value) => {
        clearTimeout(timer);
        timer = setTimeout(() => {
            callback(value);
        }, delay);
    };
}

export { isTitleValid, debounce };
