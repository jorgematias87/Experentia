'use strict';

/**
 * @ngdoc function
 * @name experentiaWebSiteApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the experentiaWebSiteApp
 */
angular.module('experentiaWebSiteApp')
  .controller('MainCtrl', function ($scope, $location) {

    $scope.viewProjectsCompany = true;

    if($location.path() === '/proyecto-descripcion-empresa'){
      $scope.viewProjectsCompany = false 
    }
    
    $scope.sortableOption = {
      connectWith: '.connected',
      cursor: 'move',
      placeholder: 'arrastre y suelte un alumno'
    };

    $scope.datePickerOption = {
  		format: 'yyyy-mm-dd',
  		startDate: '2013-02-14'
	 };

   $scope.select2Tags = {tags:[]};

  })
  .controller('RatingCtrl', function ($scope) {
    $scope.rate = 7;
    $scope.max = 5;
    $scope.isReadonly = false;

    $scope.hoveringOver = function(value) {
      $scope.overStar = value;
      $scope.percent = 100 * (value / $scope.max);
    };

    $scope.ratingStates = [
    {stateOn: 'glyphicon-ok-sign', stateOff: 'glyphicon-ok-circle'},
    {stateOn: 'glyphicon-star', stateOff: 'glyphicon-star-empty'},
    {stateOn: 'glyphicon-heart', stateOff: 'glyphicon-ban-circle'},
    {stateOn: 'glyphicon-heart'},
    {stateOff: 'glyphicon-off'}
    ];
  });
