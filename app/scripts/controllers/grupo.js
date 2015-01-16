/**
 * @ngdoc function
 * @name experentiaWebSiteApp.controller:GrupoCtrl
 * @description
 * # GrupoCtrl
 * Controller of the experentiaWebSiteApp
 */
 angular.module('experentiaWebSiteApp')
 .controller('GrupoByIdCtrl', function ($scope, GrupoSrv, $rootScope) {

    var onGrupoSucces = function(response){
  		$scope.grupo = response;
  	},
  		onGrupoError = function(rejection){
  			console.log(rejection);
  		}

     $scope.getGrupoById= function(){
      setTimeout(function() {
        var idGrupo= $rootScope.idGrupo;
        GrupoSrv.get({id: idGrupo}, onGrupoSucces, onGrupoError);
      }, 2000);
    }

  });