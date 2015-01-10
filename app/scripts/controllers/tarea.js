'use strict';

/**
 * @ngdoc function
 * @name experentiaWebSiteApp.controller:TareaCtrl
 * @description
 * # TareaCtrl
 * Controller of the experentiaWebSiteApp
 */
 angular.module('experentiaWebSiteApp')
 .controller('TareaAlumnoCtrl', function ($scope, TareaSrv) {

  $scope.tareas = {};

    //Lista de Proyectos
    var onTareasSucces = function(response){
      $scope.tareas = response;
    },
    onTareasError = function(rejection){
      console.log(rejection);
    }

    TareaSrv.query(onTareasSucces, onTareasError);

  })
 .controller('TareaProyectoCtrl', function ($scope, $routeParams, TareaSrv) {

  $scope.idProyecto = $routeParams.id;
  $scope.tareas = {};

   //Lista de Tareas
   var onTareasSucces = function(response){
    $scope.tareas = response;
   },
   onTareasError = function(rejection){
    console.log(rejection);
   }

   TareaSrv.query({id: $scope.idProyecto}, onTareasSucces, onTareasError);

  }).controller('CrearTareaCtrl', function ($scope, TareaSrv, $location) {

  //Crear Tareas
  $scope.tarea= {};

  $scope.checkboxAssignStudent = function(idAlumno){
    $scope.tarea.idAlumno = idAlumno;
  }

  var onSaveTareaSuccess = function(response){
    alert('Tarea guardado exitosamente');
    $location.path('/proyecto-descripcion-universidad');
  },
  onSaveTareaError = function(rejection){
    console.log(rejection);
  }

  $scope.tryTarea = function(idProyecto){
    $scope.tarea.idProyecto=  idProyecto;
    $scope.tarea.estado= "pendiente";
    console.log($scope.tarea);
    TareaSrv.save($scope.tarea, onSaveTareaSuccess, onSaveTareaError);
  }

  });