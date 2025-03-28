const symbols = '!@#$%^&*()-_=+[]{}|;:\'\\",.<>?/`~';

function isTitleValid(title) {
    return (
        (title && ![...title].some((char) => symbols.includes(char))) || false
    );
}

export { isTitleValid };
