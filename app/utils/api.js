var axios = require('axios');

module.exports = {
  fetchPopularRepos: function(language){
    //this function encodes the string - all the characters that are human readable are changed -as required-
    var encodedURI = window.encodeURI('https://api.github.com/search/repositories?q=stars:>1+language:'+ language+ '&sort=stars&order=desc&type=Repositories');
    return axios.get(encodedURI)
      .then(function(response){
        return response.data.items;
      });
  }
}