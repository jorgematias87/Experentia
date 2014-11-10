'use strict';

/**
 * @ngdoc function
 * @name experentiaWebSiteApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the experentiaWebSiteApp
 */
angular.module('experentiaWebSiteApp')
  .controller('LoginCtrl', function ($scope, LoginSrv) {
    var onLoginSucces = function(response){
      $scope.msg = 'Ok';
      $location.path('/proyectos-universidad');
    },
      onLoginError = function(rejection){
        console.log(rejection);
      };

    $scope.tryLogin = function(){
      LoginSrv.save($scope.login, onLoginSucces, onLoginError);
    };
  });
