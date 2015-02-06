'use strict';

/**
 * @ngdoc service
 * @name experentiaWebSiteApp.Grupo
 * @description
 * # Grupo
 * Service in the experentiaWebSiteApp.
 */
angular.module('experentiaWebSiteApp')
.factory('GrupoSrv', function ($resource, baseURL) {

  var grupo = $resource( baseURL + 'api/Grupo/:id', {
      id: '@id',
  }, {
    update: {
      method: 'PUT',
      isArray: false,
      params: { id: '@id'}
    }
  });
  return grupo;
})
.factory('GruposSrv', function (GrupoSrv) {
  var grupos= {};

  //Grupo by Id
  grupos.byId= function(idGrupo, grupoCallback){
      var onGrupoSucces = function(response){
        grupoCallback(response);
      },
        onGrupoError = function(rejection){
          console.log(rejection);
        }

      GrupoSrv.get({id: idGrupo}, onGrupoSucces, onGrupoError);
  } 
  return grupos;
});
