'use strict';

/**
 * @ngdoc function
 * @name experentiaWebSiteApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the experentiaWebSiteApp
 */
angular.module('experentiaWebSiteApp')
  .controller('LoginCtrl', function ($scope, LoginSrv, $location) {
    var onLoginSucces = function(response){
      $scope.usuario = response;
      $location.path('/proyectos-universidad');
    },
      onLoginError = function(rejection){
        console.log(rejection);
      };

    $scope.tryLogin = function(){
      LoginSrv.save($scope.login, onLoginSucces, onLoginError);
    };
  });
