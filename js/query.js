var APIQuery = {

  QUERY_ROOT: "https://en.wikipedia.org/w/api.php?action=opensearch&format=json&origin=*&search=",

  getSearchResults: function(query, callback){
    /* Search Wikipedia and send result to callback function */

    $.getJSON(APIQuery.QUERY_ROOT + query)
    .done(function(json){
      var results = APIQuery.formatReturnJSON(json);
      callback(results);
    });
  },

  formatReturnJSON: function(json){
    /* Take the return array from Wikipedia's API and convert it into
       a more programmer-friendly object */

    var returnObject = {};

    // Check for error
    if (json.hasOwnProperty("error")){
      returnObject.error = true;
      returnObject.errorMsg = "ERROR: " + json.error.info;
      return returnObject;
    }

    // If no error, add results to returnObject
    returnObject.results = [];
    for (var i = 0, len = json[1].length; i < len; i++){
      var result = {};
      result.title = json[1][i];
      result.description = json[2][i];
      result.url = json[3][i];
      returnObject.results.push(result);      
    }

    // Set other returnObject properties
    returnObject.query = json[0];
    returnObject.error = false;

    // Done!
    return returnObject;
  },

}
