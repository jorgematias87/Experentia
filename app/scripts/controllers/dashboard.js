'use strict';

/**
 * @ngdoc function
 * @name experentiaWebSiteApp.controller:Dashboard
 * @description
 * # Dashboard
 * Controller of the experentiaWebSiteApp
 */

 angular.module('experentiaWebSiteApp')
  .controller('DashboardCtrl', function ($scope, $rootScope, $cookieStore,ProyectosSrv, AlumnosSrv, TareasSrv, MateriasSrv, GruposSrv) {

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

    var onAlumnosSuccess = function(response){
      $scope.alumnos = response;
    };

    //Lista de Alumnos
    AlumnosSrv.listar(onAlumnosSuccess);

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
  });