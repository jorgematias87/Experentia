'use strict';

/**
 * @ngdoc service
 * @name experentiaWebSiteApp.Grupo
 * @description
 * # Login
 * Service in the experentiaWebSiteApp.
 */
angular.module('experentiaWebSiteApp')
.factory('LoginSrv', function ($resource, baseURL) {

  var login = $resource( baseURL + 'api/Coordinador', {}, {
    update: {
      method: 'GET',
      isArray: false
    }
  });
  return login;
});
