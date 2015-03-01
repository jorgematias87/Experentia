'use strict';

/**
 * @ngdoc function
 * @name experentiaWebSiteApp.controller:TareaCtrl
 * @description
 * # TareaCtrl
 * Controller of the experentiaWebSiteApp
 */
angular.module('experentiaWebSiteApp')
  .controller('TareasAlumnoCtrl', function ($scope, $cookieStore, $rootScope, TareasSrv) {

    $rootScope.usuario = $cookieStore.get('usuario');
    
    var onTareasSuccess = function(tareas){
      $scope.tareas= {};
      $scope.tareas.pendientes = [];
      $scope.tareas.enProgresos = [];
      $scope.tareas.hechos = [];

      if(tareas.length === 0){
        $scope.msg = 'Todavia no tienes tareas asignadas';
      }else{
        tareas.forEach(function(tarea){
          switch(tarea.estado) {
            case 'en progreso':
                $scope.tareas.enProgresos.push(tarea);
                break;
            case 'pendiente':
                $scope.tareas.pendientes.push(tarea);;
                break;
            case 'hecho':
                $scope.tareas.hechos.push(tarea);;
                break;
          }
        })
      }
    };
    TareasSrv.byAlumno($rootScope.usuario.id, onTareasSuccess);
  });
