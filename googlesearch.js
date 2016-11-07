/*jslint node: true */
'use strict';

var request = require("request");
var moment = require('moment');
var async = require('async');

class GoogleSearch {
    /**
     *@classdesc use Google Custom Seach Api to search the internet
     * @constructor
     * @param {Object} settings - settings for Custom Search Api (CSE)
     * @param {string} [settings.baseUrl=https://www.googleapis.com/customsearch/v1] - url of CSE Api
     * @param {string} settings.key - your CSE api key
     * @param {string} settings.searchEngineId - your google search_engine id
     * @param {string} settings.host - google url eg google.nl
     *
     */
    constructor(settings) {
        this.BASE_URL = settings.baseUrl || 'https://www.googleapis.com/customsearch/v1'
        this.KEY_VALUE = settings.key;
        this.SEARCH_ENGINE_ID = settings.searchEngineId;
        this.GOOGLEHOST = settings.host;
        this.MAXPAGES = 1;
    }
    /**
     * @public
     * @typedef {Object} searchResult
     * @property {string} date The date the search was performed
     * @property {number} sequenceNumber Number indicating the order of the search results
     * @property {string} query The term (searchstring) used
     * @property {string} title The title of the search result, in plain text
     * @property {string} snippet A short description of website the search result is referring to
     * @property {string} url The link to the webpage the search result is referring to
     * @property {string} item The item key returned by the Google Custom Search api
     */
     /**
     * searches for webdata specified in searchItem
     * @param  {Object} searchItem - json object with keys:
     * @param  {string} [searchItem.site] - Limit the search to this site (url)
     * @param  {string} searchItem.term - Searchstring
     * @param  {integer} [searchItem.maxPages=1] - number of pages returned. One page contains 10 search results.
     * @returns {Promise|Array<searchResult>} Array of search results, see {@link searchResult}
     */
    search(searchItem) {
        this.site = searchItem.site;
        this.term = searchItem.term;
        this.MAXPAGES = searchItem.maxPages || 1;
        this.result = [];
        return this._processQuery();
    }

    _getGoogleResult(today, counts, next) {
        var self = this;
        var offset = (counts.pageNum - 1) * 10 + 1;
        var rawGoogleResponse = "";
        var url = self.BASE_URL +
            '?key=' + self.KEY_VALUE +
            '&cx=' + self.SEARCH_ENGINE_ID +
            '&googlehost=' + self.GOOGLEHOST +
            '&q=' + self.term +
            '&start=' + offset +
            '&lr=lang_nl';
        if (self.site) {
            url = url + '&siteSearch=' + self.site;
        }

        request(url, function(error, response, body) {
            var googleResponse = JSON.parse(body);

            if ("items" in googleResponse) {
                for (var i = 0; i < googleResponse.items.length; i++) {
                    var item = googleResponse.items[i];
                    var searchResult = {
                        date: today,
                        sequenceNumber: (counts.pageNum - 1) * 10 + i + 1,
                        query: self.term,
                        title: ("title" in item) ? item.title : "",
                        snippet: ("snippet" in item) ? item.snippet : "",
                        url: ("link" in item) ? item.link : "",
                        item: JSON.stringify(item)
                    };
                    self.result.push(searchResult);
                }
                counts.totalFetched = counts.totalFetched + googleResponse.items.length;
                counts.totalResults = googleResponse.searchInformation.totalResults;
            } else {
                counts.totalResults = counts.totalFetched;
            }
            counts.pageNum += 1;
            next(null, counts);
        });
    }

    _processQuery() {
        var self = this;
        return new Promise(
            function(resolve, reject) {
                if (self.term) {
                var today = moment().format('YYYYMMDD');
                var counts = {
                    totalFetched: 0,
                    totalResults: 10,
                    pageNum: 1
                };
                async.until(
                    function() {
                        return ((counts.pageNum > self.MAXPAGES) || (counts.totalFetched >= counts.totalResults))
                    },
                    function(next) {
                        self._getGoogleResult(today, counts, next);
                    },
                    function(err, counts) {
                        if (err) {
                            reject(err);
                        } else {
                            resolve(self.result);
                        }
                    })
                } else {
                    var err = new Error("You must supply a search term");
                    reject(err);
                }
            });
        }
}

module.exports = GoogleSearch;
