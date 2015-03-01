'use strict';

/**
 * @ngdoc function
 * @name experentiaWebSiteApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the experentiaWebSiteApp
 */
angular.module('experentiaWebSiteApp')
  .controller('LoginCtrl', function ($scope, LoginSrv, $location, $cookieStore, $rootScope) {
    $rootScope.usuario = $cookieStore.get('usuario');
    
    var redirectToDashboard = function(user){
      switch(user) {
          case 'empresa':
              $location.path('/proyectos-empresa');
              break;
          case 'coordinador':
              $location.path('/dashboard');
              break;
          case 'alumno':
              $location.path('/alumno/tareas');
              break;
      }
    };

    if($rootScope.usuario){
      redirectToDashboard($rootScope.usuario.user);
    }

    var onLoginSucces = function(response){
      var usuario = response;
      $cookieStore.put('usuario', response);

      redirectToDashboard(usuario.user);
    },
      onLoginError = function(rejection){
        console.log(rejection);
        $scope.msg = "usuario/contraseña invalidos";
      };

    $scope.tryLogin = function(){
      LoginSrv.save($scope.login, onLoginSucces, onLoginError);
    };

  });
