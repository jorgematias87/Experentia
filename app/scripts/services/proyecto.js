'use strict';

/**
 * @ngdoc service
 * @name experentiaWebSiteApp.Proyecto
 * @description
 * # Proyecto
 * Service in the experentiaWebSiteApp.
 */
angular.module('experentiaWebSiteApp')
.factory('ProyectoSrv', function ($resource, baseURL) {

  var proyecto = $resource( baseURL + 'api/Proyecto/:id', {}, {});
  return proyecto;
});
