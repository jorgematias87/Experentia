'use strict';

/**
 * @ngdoc function
 * @name experentiaWebSiteApp.controller:Dashboard
 * @description
 * # Dashboard
 * Controller of the experentiaWebSiteApp
 */

 angular.module('experentiaWebSiteApp')
  .controller('CoordinadorDashboardCtrl', function ($scope, $rootScope, $cookieStore,ProyectosSrv, AlumnosSrv, TareasSrv, MateriasSrv, GruposSrv) {

    $rootScope.usuario = $cookieStore.get('usuario');

    var onProyectosSuccess = function(response){
      $scope.listaProyectos= response;
    };
    //Lista de Proyectos
    ProyectosSrv.listar(onProyectosSuccess);

    var onProyectosByIdSuccess = function(response){
      $scope.proyectos= response;

      if($scope.proyectos.length === 0){
        $scope.msg= '<strong>No tienes proyectos asignados!</strong>.'
      }
    };
    //Lista de Proyectos
    ProyectosSrv.listarById($rootScope.usuario.id, onProyectosByIdSuccess);

    //Lista de Alumnos
    var onAlumnosSuccess = function(response){
      $scope.alumnos = response;
    };
    AlumnosSrv.byCoordinador($rootScope.usuario.id,onAlumnosSuccess);

    //tarea by id
    $scope.tarea= {};
    var tareaCallback= function(response){
      $scope.tarea = response;
    };

    $scope.getTareaById= function(idTarea){
      TareasSrv.byId(idTarea, tareaCallback);
    };

    $scope.calificarTarea= function(){
      TareasSrv.editar($scope.tarea.id, $scope.tarea);
    };

    //Lista de Tareas
    var onTareasSuccess = function(response){
      $scope.tareas= response;
      if($scope.tareas.length === 0){
        $scope.msgTareas= '<strong>No tienes tareas creadas!</strong>.'
      }
    };
    TareasSrv.listarByIdCoordinador($rootScope.usuario.id, onTareasSuccess);

    //Lista de Materias
    var onMateriasSuccess = function(response){
      $scope.materias= response;
    };
    MateriasSrv.listar($rootScope.usuario.id, onMateriasSuccess);

    //Lista de Grupos
    var onGruposSuccess = function(response){
      $scope.grupos= response;
      if($scope.grupos.length === 0){
        $scope.msgGrupos= '<strong>No tienes grupos creados!</strong>.'
      }
    };
    GruposSrv.listar($rootScope.usuario.id, onGruposSuccess);
  })
.controller('DashboardAlumnoCtrl', function ($scope, $rootScope, $cookieStore,ProyectosSrv, AlumnosSrv, TareasSrv, MateriasSrv, GruposSrv) {

    $rootScope.usuario = $cookieStore.get('usuario');

    //Lista de Proyectos by Alumno
    var onProyectosSuccess = function(response){
      $scope.proyectos= response;

      if($scope.proyectos.length === 0){
        $scope.msg= '<strong>No tienes proyectos asignados!</strong>.'
      }
    };
    ProyectosSrv.byAlumno($rootScope.usuario.id, onProyectosSuccess);

    var onTareasSuccess = function(tareas){
      $scope.tareas= tareas;

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

    //Lista de Materias
    var onMateriasSuccess = function(response){
      $scope.materias= response;
    };
    MateriasSrv.byAlumno($rootScope.usuario.id, onMateriasSuccess);
  });