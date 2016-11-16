## Classes

<dl>
<dt><a href="#GoogleSearch">GoogleSearch</a></dt>
<dd><p>use Google Custom Seach Api to search the internet</p>
</dd>
</dl>

## Typedefs

<dl>
<dt><a href="#searchResult">searchResult</a> : <code>Object</code></dt>
<dd></dd>
</dl>

<a name="GoogleSearch"></a>

## GoogleSearch
use Google Custom Seach Api to search the internet


* [GoogleSearch](#GoogleSearch)

    * [new GoogleSearch(settings)](#new_GoogleSearch_new)

    * [.search(searchItem)](#GoogleSearch+search)

    * [.blacklist(urls)](#GoogleSearch+blacklist)


<a name="new_GoogleSearch_new"></a>

### new GoogleSearch(settings)
**Params**

- settings <code>Object</code> - settings for Custom Search Api (CSE)
    - [.baseUrl] <code>string</code> <code> = &quot;https://www.googleapis.com/customsearch/v1&quot;</code> - url of CSE Api
    - .key <code>string</code> - your CSE api key
    - .searchEngineId <code>string</code> - your google search_engine id
    - .host <code>string</code> - google url eg google.nl

<a name="GoogleSearch+search"></a>

### *googleSearch*.search(searchItem)
**Params**

- searchItem <code>Object</code>
    - .term <code>string</code> - Searchstring
    - [.site] <code>string</code> - Limit the search to this site (url)
    - [.maxPages] <code>integer</code> <code> = 1</code> - number of pages returned. One page contains 10 search results.
    - [.blacklist] <code>Array.&lt;string&gt;</code> - Array of urls, used to remove search results which are referring to these urls

searches for webdata specified in searchItem

**Returns**: <code>Promise</code> &#124; <code>[Array.&lt;searchResult&gt;](#searchResult)</code> - Array of search results, see [searchResult](#searchResult)  
<a name="GoogleSearch+blacklist"></a>

### *googleSearch*.blacklist(urls)
**Params**

- urls <code>Array.&lt;string&gt;</code> - Array of urls

Create new list of urls, used to remove search results which are referring to these urls

<a name="searchResult"></a>

## searchResult
**Access:** public  
**Properties**

- date <code>string</code> - The date the search was performed  
- sequenceNumber <code>number</code> - Number indicating the order of the search results  
- query <code>string</code> - The term (searchstring) used  
- title <code>string</code> - The title of the search result, in plain text  
- snippet <code>string</code> - A short description of website the search result is referring to  
- url <code>string</code> - The link to the webpage the search result is referring to  
- item <code>string</code> - The item key returned by the Google Custom Search api  

