'use strict';

/**
 * @ngdoc service
 * @name experentiaWebSiteApp.NotificationsSrv
 * @description
 * # Servicio
 * Service in the experentiaWebSiteApp.
 */
angular.module('experentiaWebSiteApp')
 .factory('NotificationsSrv', function($timeout, $rootScope, $compile) {
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
 		var msgs = [{msg: msg}];
 		showNotification(msgs, time);
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
 	notifications.confirm = function(msg, idTarea) {
		$rootScope.notificationClass = 'notyfy_confirm';
		$rootScope.notificationStatus = '';
		$rootScope.idTarea = idTarea;
			
		var msgs = [{msg: msg}];
 		showNotificationConfirm(msgs);
 	};

 	return notifications;
 });