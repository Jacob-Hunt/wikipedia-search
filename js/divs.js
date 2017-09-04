var divs = {

  initialText: "<div id='display-box-text'>"
             +   "<h2>Dynamic front end for Wikipedia searches.</h2>"
             +   "<h3>Click the Search or Random button to get started.</h3>"
             + "</div>",

  searchCollapseBtn: "<div id='search-collapse-icon'>"
                   +   "<i class='fa fa-caret-left'></i>"
                   + "</div>",

  searchText: "<span id='search-text' style='opacity: 0;'>SEARCH</span>",

  searchInput: "<form id='search-form' onsubmit='event.preventDefault(); return UI.wikiSearch();'>"
            +    "<input id='search-input' type='text' name='search-input' />"
            +  "</form>",
}
