/* Object for user-interface related variables/methods */

var UI = {

  // * * * VARIABLES * * * //

  searchBarExpanded: false,


  // * * * METHODS * * * //

  start: function(){
    /* Script to execute on page load */

    // Add initial text
    $("#display-box").html(divs.initialText);

    // Add event listeners
    UI.addEventListeners();

    // Display UI using animation
    $("#header-card").velocity("fadeIn", {duration: 750, delay: 500});
    $("#main").velocity("fadeIn", {duration: 750, delay: 700});
  },

  addEventListeners: function(){
    /* Add event listeners to DOM */

    $("#search-bar").on("click", function(){
      if(UI.searchBarExpanded !== true){
        UI.expandSearchBar();
      }
    });
    $("body").on("click", "#search-collapse-icon", UI.collapseSearchBar);
    $("body").on("click", "#search-icon", UI.wikiSearch);
  },

  expandSearchBar: function(){
    /* OnClick script for $('#search-bar') */

    if (ScreenWidth.mobile()){
      $("#search-bar").velocity({width: "250px"}, {duration: 600});
    } else {
      $("#search-bar").velocity({width: "300px"}, {duration: 600});
    }

    $("#search-text").velocity("fadeOut", {duration: 500});
    $("#search-bar:hover").css("background-color", "#fff");
    $("#search-bar:hover").css("cursor", "auto");

    setTimeout(function(){
      $("#search-bar").append(divs.searchInput);
      $("#search-bar").append(divs.searchCollapseBtn);
      $("#search-icon").css("color", "#000");
      $("#search-icon").hover(
        function(){
          $("#search-icon").removeAttr("style");
          $("#search-icon").css("color", "#555");
          $("#search-icon").css("cursor", "pointer");
        },
        function(){
          $("#search-icon").removeAttr("style");
          $("#search-icon").css("color", "#000");
          $("#search-icon").css("cursor", "auto");
        }
      );
      $("#search-input").focus();
      UI.searchBarExpanded = true;
    }, 600);
  },

  collapseSearchBar: function(){
    /* OnClick script for #search-collapse-icon */

    // Collapse bar
    UI.searchBarExpanded = false;
    $("#search-input").remove();
    $("#search-text").velocity("fadeIn", {duration: 500});
    $("#search-bar").velocity({width: "135px"}, {duration: 600});
    $("#search-collapse-icon").velocity("fadeOut", 500);
    setTimeout(function(){
      $("#search-collapse-icon").remove();
      $("#search-bar").removeAttr("style");
      $("#search-icon").removeAttr("style");
    }, 500);
  },

  wikiSearch: function(){
    /* OnClick script for #search-icon */

    query = $("input[type=text][name=search-input]").val();
    if (UI.searchBarExpanded === true) {
      result = APIQuery.getSearchResults(query, UI.displayResults);
    }
  },

  displayResults: function(json){
    /* Show results of search */

    // Prevent display-box from collapsing when inner HTML is removed
    $("#display-box").css("height", $("#display-box").height());

    // Get div
    var resultsHTML = UI.getResultsHTML(json); 

    // Remove old content
    $("#display-box-text").velocity("fadeOut", 500);

    // After fadeout, display new content
    setTimeout(function(){
      $("#display-box").html(resultsHTML);
      $("#display-box-text").accordion();
      var height = $("#display-box-text").height().toString() + "px";
      $("#display-box").velocity({height: height}, 500);
      $("#display-box-text").velocity("fadeIn", 500);
    }, 500);

    // After #display-box slides to correct height, remove
    // style attribute to allow for flexible resizing
    setTimeout(function(){
      $("#display-box").removeAttr("style");
    }, 1000);

    console.log(json);
  },

  getResultsHTML: function(json){
    /* Constcuct and return the HTML to show search results */

    var div = "<div id='display-box-text' class='accordion'>";
    for(var i = 0, len = json.results.length; i < len; i++){
      div += "<h3>";
      div += json.results[i].title;
      div += "</h3>";
      div += "<div>";
      div += json.results[i].description;
      div += "<br /><br />";
      div += "<a href='" + json.results[i].url + "' target='_blank'>";
      div += "View Article";
      div += "</a>"
      div += "</div>";
    }
    div += "</div>";

    return div;
  },
}
