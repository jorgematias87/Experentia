'use strict';

/**
 * @ngdoc function
 * @name experentiaWebSiteApp.controller:Proyectos
 * @description
 * # Proyectos
 * Controller of the experentiaWebSiteApp
 */

 angular.module('experentiaWebSiteApp')
  .controller('ListarProyectosCtrl', function ($scope, ProyectoSrv) {

    $scope.proyectos = {};

    //Lista de Proyectos
    var onProyectosSucces = function(response){
      $scope.proyectos = response;
    },
      onProyectosError = function(rejection){
        console.log(rejection);
      }

    ProyectoSrv.query(onProyectosSucces, onProyectosError);
    
  })
  .controller('ProyectoIdCtrl', function ($scope, $routeParams, ProyectoSrv, $rootScope) {

    $scope.idProyecto = $routeParams.id;

    //Proyecto por ID
    var onProyectoSucces = function(response){
      $scope.proyecto = response;
      $rootScope.idGrupo= response.idGrupo;
    },
      onProyectoError = function(rejection){
        console.log(rejection);
      }

    ProyectoSrv.get({id: $scope.idProyecto}, onProyectoSucces, onProyectoError);

    
  })
  .controller('CrearProyectoCtrl', function ($scope, $location, ProyectoSrv) {

    //Crear Proyecto
    var onCrearProyectoSucces = function(response){
      alert('Proyecto Creado Correctament');
      $location.path('/proyectos-empresa');
    },
      onCrearProyectoError = function(rejection){
        alert('Error: intenta mas tarde');
      }

    $scope.crearProyecto = function(){
      $scope.proyecto.idEmpresa = 1;

      ProyectoSrv.save($scope.proyecto, onCrearProyectoSucces, onCrearProyectoError);
    }
    
  });