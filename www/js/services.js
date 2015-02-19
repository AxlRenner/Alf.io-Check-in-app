/**
 * Created by rennery on 2/16/15.
 */
var baseSevice = angular.module('starter.services',[]);

baseSevice.config(['$httpProvider', function($httpProvider){
    var token = '33d1da9f-537a-4439-b826-1c24c45acd04';
    var header = 'X-CSRF-TOKEN';
    $httpProvider.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
    $httpProvider.defaults.headers.common[header] = token;
}]);
baseSevice.service("CheckInService", function($http){
    return{
        checkIn: function(BASE_URL, eventId, ticket){
            var ticketIdentifier = ticket.code.split('/')[0];
            return $http['post'](BASE_URL + '/admin/api/check-in/' + eventId + '/ticket/' +ticketIdentifier, ticket);
        }
    }
});

baseSevice.service("EventService", function($http){
    return{
        getAllEvents: function(BASE_URL){
            return $http.get(BASE_URL + '/admin/api/events.json');
        }

    }
});
