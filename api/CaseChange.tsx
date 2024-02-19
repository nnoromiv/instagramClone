function toSentenceCase(str: string) {
    // Split the string into words
    const words = str.toLowerCase().split(' ');

    // Capitalize the first letter of each word
    const capitalizedWords = words.map(word => {
        return word.charAt(0).toUpperCase() + word.slice(1);
    });

    // Join the words back into a sentence
    return capitalizedWords.join(' ');
}

export {
    toSentenceCase
}