
var angular = require('angular');
var searchMultiSelect = angular.module('searchMultiSelect', []);
require('./core/index.js')(searchMultiSelect);
module.exports = {
    searchMultiSelect: searchMultiSelect
};
