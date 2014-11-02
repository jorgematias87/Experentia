'use strict';

/**
 * @ngdoc directive
 * @name experentiaWebSiteApp.directive:customPage
 * @description
 * # customPage
 */
 angular.module('experentiaWebSiteApp')
 .directive('customPage', function() {
 	return {
 		restrict: 'A',
 		controller: [
 		'$scope', '$element', '$location', function($scope, $element, $location) {
 			var addBg, path;
 			path = function() {
 				return $location.path();
 			};
 			addBg = function(path) {
 				$element.removeClass('body-wide body-lock');
 				switch (path) {
 					case '/404':
 					case '/500':
 					case '/login':
 					case '/signup':
 					case '/forgot-password':
 					return $element.addClass('body-wide');
 					case '/lock-screen':
 					return $element.addClass('body-wide body-lock');
 				}
 			};
 			addBg($location.path());
 			return $scope.$watch(path, function(newVal, oldVal) {
 				if (newVal === oldVal) {
 					return;
 				}
 				return addBg($location.path());
 			});
 		}
 		]
 	};
 });
