const genres = [
    "action",
    "anime",
    "adventure",
    "animated",
    "biography",
    "comedy",
    "crime",
    "dance",
    "disaster",
    "documentary",
    "drama",
    "erotic",
    "family",
    "fantasy",
    "found footage",
    "historical",
    "horror",
    "independent",
    "legal",
    "live action",
    "martial arts",
    "musical",
    "mystery",
    "noir",
    "performance",
    "political",
    "romance",
    "satire",
    "science fiction",
    "short",
    "silent",
    "slasher",
    "sports",
    "spy",
    "superhero",
    "supernatural",
    "suspense",
    "teen",
    "thriller",
    "war",
    "western"
]

function checkGenres(obj) {
    for(let i=0;i<obj.length;i++){
        if(!genres.includes(obj[i].toLowerCase()))
            return false;
    }
    return true;
}


const streamingServices = [
    'netflix', 
    'amazon prime',
    'disney+',
    'hbo max',
    'paramount+',
    'crunchyroll', 
    'youtube', 
    'apple tv+'
]

function checkStreamingServices(obj) {
    for(let i=0;i<obj.length;i++){
        if(!streamingServices.includes(obj[i].toLowerCase()))
            return false;
    }
    return true;
}

module.exports = {
    checkGenres,
    checkStreamingServices
};