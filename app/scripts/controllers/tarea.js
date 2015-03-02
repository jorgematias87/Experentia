'use strict';

/**
 * @ngdoc function
 * @name experentiaWebSiteApp.controller:TareaCtrl
 * @description
 * # TareaCtrl
 * Controller of the experentiaWebSiteApp
 */
angular.module('experentiaWebSiteApp')
  .controller('TareasAlumnoCtrl', function ($scope, $cookieStore, $timeout, $rootScope, TareasSrv) {

    $rootScope.usuario = $cookieStore.get('usuario');

    var onTareasSuccess = function(tareas){
      $scope.tareas= {};

      $scope.pendientes = [];
      $scope.enProgresos = [];
      $scope.hechos = [];

      if(tareas.length === 0){
        $scope.msg = 'Todavia no tienes tareas asignadas';
      }else{
        tareas.forEach(function(tarea){
          switch(tarea.estado) {
            case 'en progreso':
                $scope.enProgresos.push(tarea);
                break;
            case 'pendiente':
                $scope.pendientes.push(tarea);;
                break;
            case 'hecho':
                $scope.hechos.push(tarea);;
                break;
          }
        })
      }
    };
    TareasSrv.byAlumno($rootScope.usuario.id, onTareasSuccess);

    //tarea by id
    $scope.tarea= {};
    var tareaCallback= function(response){
      $scope.tarea = response;
    };

    $scope.getTareaById= function(idTarea){
      TareasSrv.byId(idTarea, tareaCallback);
    }; 
  });
