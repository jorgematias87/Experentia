'use strict';

/**
 * @ngdoc function
 * @name experentiaWebSiteApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the experentiaWebSiteApp
 */
angular.module('experentiaWebSiteApp')
  .controller('LoginCtrl', function ($scope, LoginSrv, $location, $cookieStore) {

    var onLoginSucces = function(response){
      var usuario = response;
      console.log(usuario);
      $cookieStore.put('usuario', response);

      switch(usuario.user) {
          case 'empresa':
              $location.path('/proyectos-empresa');
              break;
          case 'coordinador':
              $location.path('/proyectos-universidad');
              break;
          case 'alumno':
              $location.path('/tareas-alumno');
              break;
      }
    },
      onLoginError = function(rejection){
        console.log(rejection);
      };

    $scope.tryLogin = function(){
      LoginSrv.save($scope.login, onLoginSucces, onLoginError);
    };
  });
