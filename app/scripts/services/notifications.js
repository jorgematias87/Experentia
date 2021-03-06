'use strict';

/**
 * @ngdoc service
 * @name experentiaWebSiteApp.NotificationsSrv
 * @description
 * # Servicio
 * Service in the experentiaWebSiteApp.
 */
angular.module('experentiaWebSiteApp')
 .factory('NotificationsSrv', function($timeout, $rootScope) {
 	var notifications = {},

 	showNotification = function(msg, time) {
 		$rootScope.showNotification = true;
 		$rootScope.notificationMsgs = msg;
 		$timeout(function() {
 			$rootScope.showNotification = false;
 		}, time);
 	},
 	showNotificationConfirm = function (msg) {
 		$rootScope.showNotification = true;
 		$rootScope.notificationMsgs = msg;
 	};

 	$rootScope.idTarea = '';
	$rootScope.controller = '';

 	notifications.success = function(msg, time) {
 		$rootScope.notificationClass = 'notyfy_success';
 		$rootScope.notificationStatus = 'success';
 		showNotification(msg, time);
 	};
 	notifications.error = function(msg, time) {
		$rootScope.notificationClass = 'notyfy_error';
		$rootScope.notificationStatus = 'error';
 		showNotification(msg, time);
 	};
 	notifications.info = function(msg, time) {
		$rootScope.notificationClass = 'notyfy_info';
		$rootScope.notificationStatus = '';
 		showNotification(msg, time);
 	};
 	notifications.confirm = function(msg, id, elemento, otherId) {
		$rootScope.notificationClass = 'notyfy_confirm';
		$rootScope.notificationStatus = '';
		$rootScope.id = id;
		$rootScope.otherId= otherId;
		$rootScope.elemento= elemento;
			
 		showNotificationConfirm(msg);
 	};

 	return notifications;
 });