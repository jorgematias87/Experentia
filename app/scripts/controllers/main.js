'use strict';

/**
 * @ngdoc function
 * @name experentiaWebSiteApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the experentiaWebSiteApp
 */
angular.module('experentiaWebSiteApp')
  .controller('MainCtrl', function ($scope, $location, $cookieStore, $rootScope) {

    $rootScope.usuario = $cookieStore.get('usuario');
    $scope.tecnologias = ['.NET', 'Javascript', 'HTML', 'CSS', 'Java', 'PHP', 'AngularJS', 'NodeJS'];

    if($rootScope.usuario === ''){
      $location.path('/');
    }

    setTimeout(function() {
      $('.selectPicker').selectpicker();
    }, 2000);

    $scope.toggleNotification = function(){
        $rootScope.showNotification = false;
    };

    $scope.tryLogout = function(){
      $cookieStore.remove('usuario');
      $location.path('/');
    };

    $scope.setFiltroEstado = function(){
      $scope.filtroTareas = $('#filtroEstado').val();
      console.log($scope.filtroTareas);
    };

    $scope.setFiltroAlumno = function(){
      $scope.filtroTareas = $('#filtroAlumno').val();
      console.log($scope.filtroTareas);
    };

    $scope.getClassEstado = function(estado, componente){
      switch(estado) {
          case 'en progreso':
              return componente + '-info';
              break;
          case 'pendiente':
              return componente + '-warning';
              break;
          case 'hecho':
              return componente + '-success';
              break;
      }
    } 

    $scope.trySendEmail = function(){
      $scope.msg = 'Email enviado';
    };

    $scope.tryAsignar = function(){
      $scope.msgAsignar = 'Asignado Correctamente';
    };
    
    $scope.sortableOption = {
      connectWith: '.connected',
      cursor: 'move',
      placeholder: 'arrastre y suelte un alumno'
    };

    $scope.datePickerOption = {
  		format: 'yyyy-mm-dd',
  		startDate: '2013-02-14'
	 };

   $scope.select2Tags = {tags:[]};

  })
  .controller('RatingCtrl', function ($scope) {
    $scope.rate = 7;
    $scope.max = 5;
    $scope.isReadonly = false;

    $scope.hoveringOver = function(value) {
      $scope.overStar = value;
      $scope.percent = 100 * (value / $scope.max);
    };

    $scope.ratingStates = [
    {stateOn: 'glyphicon-ok-sign', stateOff: 'glyphicon-ok-circle'},
    {stateOn: 'glyphicon-star', stateOff: 'glyphicon-star-empty'},
    {stateOn: 'glyphicon-heart', stateOff: 'glyphicon-ban-circle'},
    {stateOn: 'glyphicon-heart'},
    {stateOff: 'glyphicon-off'}
    ];

  });
