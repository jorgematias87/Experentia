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

  var tarea = $resource( baseURL + 'api/Tarea/:id', {}, {});
  return tarea;
});