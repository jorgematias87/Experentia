'use strict';

/**
 * @ngdoc service
 * @name experentiaWebSiteApp.Proyecto
 * @description
 * # Servicio
 * Service in the experentiaWebSiteApp.
 */
angular.module('experentiaWebSiteApp')
.factory('TareaSrv', function ($resource, baseURL) {

  var tarea = $resource( baseURL + 'api/Tarea/:action/:id', null, {
  	'update': { method:'PUT' }
  });
  return tarea;
});