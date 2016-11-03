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

**Kind**: global class  

* [GoogleSearch](#GoogleSearch)
    * [new GoogleSearch(settings)](#new_GoogleSearch_new)
    * [.search(searchItem)](#GoogleSearch+search) ⇒ <code>Promise</code> &#124; <code>[Array.&lt;searchResult&gt;](#searchResult)</code>

<a name="new_GoogleSearch_new"></a>

### new GoogleSearch(settings)
**Params**

- settings <code>Object</code> - settings for Custom Search Api (CSE)
    - [.BASE_URL] <code>string</code> <code> = &quot;https://www.googleapis.com/customsearch/v1&quot;</code> - url of CSE Api
    - .KEY_VALUE <code>string</code> - your CSE api key
    - .SEARCH_ENGINE_ID <code>string</code> - your google search_engine id
    - .GOOGLEHOST <code>string</code> - google url eg google.nl

<a name="GoogleSearch+search"></a>

### googleSearch.search(searchItem) ⇒ <code>Promise</code> &#124; <code>[Array.&lt;searchResult&gt;](#searchResult)</code>
searches for webdata specified in searchItem

**Kind**: instance method of <code>[GoogleSearch](#GoogleSearch)</code>  
**Returns**: <code>Promise</code> &#124; <code>[Array.&lt;searchResult&gt;](#searchResult)</code> - Array of search results, see [searchResult](#searchResult)  
**Params**

- searchItem <code>Object</code> - json object with keys:
    - .site <code>string</code> - Limit the search to this site (url)
    - .term <code>string</code> - Searchstring
    - [.maxPages] <code>integer</code> <code> = 1</code> - number of pages returned. One page contains 10 search results.

<a name="searchResult"></a>

## searchResult : <code>Object</code>
**Kind**: global typedef  
**Access:** public  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| date | <code>string</code> | The date the search was performed |
| sequenceNumber | <code>number</code> | Number indicating the order of the search results |
| query | <code>string</code> | The term (searchstring) used |
| title | <code>string</code> | The title of the search result, in plain text |
| snippet | <code>string</code> | A short description of website the search result is referring to |
| url | <code>string</code> | The link to the webpage the search result is referring to |
| item | <code>string</code> | The item key returned by the Google Custom Search api |

