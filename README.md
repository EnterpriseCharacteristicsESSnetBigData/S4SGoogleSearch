# S4SGoogleSearch

##Introduction
S4S stands for "Searching for Statistics" by which we mean the activity of searching for
information / data from the internet for improving official statistics.

S4SGoogleSearch is a nodejs package to conveniently use the Google search engine API to automatically fire search requests from a program.
To use it one needs a Google API key. 


##Installation
Copy the file 'googlesearch-1.0.0.tgz' in your project directory and run:

`npm install --save-dev googlesearch-1.0.0.tgz`


##Documentation
The api of this package can be found [here](api.md)


##Example
Below is an example of using this package to search on wikipedia.org for the word "Amsterdam" returning 2 pages (20 results) at a maximum.

```javascript
var GoogleSearch = require('googlesearch');

// Define Search:
var googleSearch = new GoogleSearch({
	key: "<your key>",
	searchEngineId: "<your searchengine id>",
	host: "<your host>"
});

// Perform Search:
googleSearch.search({
    "term": "Amsterdam",
    "site": "wikipedia.org",
    "maxPages": 2
})
.then(function(data) {
    data.forEach(function (row) {
		// Replace newlines and tabs by spaces in snippet:
        row.snippet = row.snippet.replace(/(\r\n|\n|\r|\t)/gm,' ');
		
		// Write a single search result to console:
        console.log(row);
    })
})
.catch(function(err) {
    console.log(err);
});
```
