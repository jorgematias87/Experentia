/**
 * @ngdoc function
 * @name experentiaWebSiteApp.controller:GrupoCtrl
 * @description
 * # GrupoCtrl
 * Controller of the experentiaWebSiteApp
 */
 angular.module('experentiaWebSiteApp')
 .controller('GrupoIdCtrl', function ($scope, GrupoSrv) {

    var onGrupoSucces = function(response){
  		$scope.grupo = response;
  	},
  		onGrupoError = function(rejection){
  			console.log(rejection);
  		}

  	GrupoSrv.get({id:1}, onGrupoSucces, onGrupoError);

  });