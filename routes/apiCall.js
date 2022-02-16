const request = require('request-promise');


//hard coded search for batman. can't get process.env to work
// const options = {
//   uri: 'https://kgsearch.googleapis.com/v1/entities:search?',
//   qs: {
//     key: 'AIzaSyB410NqEuxJXSgASG7AEB2NvwtlI2StP4U',
//     query: process.argv[2],
//     limit: 5,
//   }
// };


//code to grab @type of list input


const checkGoogle = function(inputData) {

  const options = {
    uri: 'https://kgsearch.googleapis.com/v1/entities:search?',
    qs: {
      key: 'AIzaSyB410NqEuxJXSgASG7AEB2NvwtlI2StP4U',
      query: inputData,
      limit: 5,
    }
  };

request(options)
  .then(data => {

    const results = JSON.parse(data).itemListElement;
    const arrOutput = [];
    results.forEach(arrItem => arrOutput.push(arrItem.result['@type']));
    console.log(arrOutput[0])
    // loop through above

    // array of search types
    const type = ['Book', 'Movie', 'MovieSeries', 'TVSeries', 'Restaurant', 'ProductModel']

    for (let words of arrOutput[0]) {
      if (words === 'Movie' || words === "MovieSeries" || words === 'TVSeries') {
        addToWatch(inputData)
        return
      }
      if (words === 'Book'){
        addToRead(inputData)
        return
      }
      if (words === 'Restaurant'){
        addToBuy(inputData)
        return
      }
      else {
        addToBuy(inputData)
        return
      }
      }
  })

}

console.log(checkGoogle(process.argv[2]));

module.export = {checkGoogle}


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
