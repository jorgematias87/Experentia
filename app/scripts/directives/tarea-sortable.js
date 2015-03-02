'use strict';

/**
 * @ngdoc directive
 * @name experentiaWebSiteApp.directive:customPage
 * @description
 * # customPage
 */
 angular.module('experentiaWebSiteApp')
 .directive('tareaSortable', function(TareasSrv){
 	// Runs during compile
 	return {
 		restrict: 'A', // E = Element, A = Attribute, C = Class, M = Comment
 		link: function($scope, iElm, iAttrs, controller) {
 			var estado = iAttrs.tareaSortable;
 			iElm.sortable({
 				connectWith: '.connected',
 				placeholder: 'arrastre y suelte',
 				receive: function(event, ui){
 					var idTarea = ui.item.context.id;

 					var onTareaSuccess = function(response){
 						var tarea= response;
 						tarea.estado = estado;
 						TareasSrv.editar(tarea.id, tarea);
 					};
 					TareasSrv.byId(idTarea, onTareaSuccess)
 				}
 			})
 		}
 	};
 });
