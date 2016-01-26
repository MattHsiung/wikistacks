var filters = require('swig/lib/filters')

module.exports = function(swig) {

  var pageLink = function (page) {

    return '<a href="' + page.route + '">' + filters.capitalize(page.title) + '</a>';
  };

  pageLink.safe = true;

  swig.setFilter('pageLink', pageLink);

};