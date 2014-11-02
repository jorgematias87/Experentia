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
});
