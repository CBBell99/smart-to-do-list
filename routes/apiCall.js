require("dotenv").config();
const request = require('request-promise');

console.log(process.env.DB_GOOGLE);

//hard coded search for batman. can't get process.env to work
const options = {
  uri: 'https://kgsearch.googleapis.com/v1/entities:search?',
  qs: {
    key: process.env.DB_GOOGLE,
    query: process.argv[2],
    limit: 5,
  }
};


//code to grab @type of list input
request(options)
  .then(data => {

    const results = JSON.parse(data).itemListElement;
    const arrOutput = [];
    results.forEach(arrItem => arrOutput.push(arrItem.result['@type']));
    console.log(arrOutput[0])
    console.log(arrOutput)
    let flatArr = arrOutput.flat()

    // array of search types
    const type = ['Book', 'Movie', 'MovieSeries', 'TVSeries', 'Restaurant', 'ProductModel']





  })

// books///
// Old man and the sea
// Hot water music
// I am America an so can you

// Movies////
// Dark knight rises
// Snow piercer
// Train to Busan

// Restaurants///

// Cactus club
// Papa johns
// East side Marios
// McDonalds
// Burger king

// buy///
// Air pods
// Mac book
// Toothpaste

// request(options).then(data => { console.log(data) })  url, object }
// 'https://kgsearch.googleapis.com/v1/entities:search?query=&key=AIzaSyCsAtIKcP7ipCudYfb9Hhad7gnwz2JD9Kg&limit=10&indent=True'

// "*  const options = { *    uri: 'http://api.wolframalpha.com/v2/query?', *    qs: { *      appid: process.env.WOLFRAM_ALPHA, *      input: searchTerm, *      format: 'plaintext', *      output: 'json' *    } *  };"
