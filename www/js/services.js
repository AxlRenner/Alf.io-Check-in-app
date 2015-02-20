/**
 * Created by rennery on 2/16/15.
 */
var baseSevice = angular.module('starter.services',[]);

baseSevice.config(['$httpProvider', function($httpProvider){
    $httpProvider.defaults.headers.post['Content-Type'] = 'application/json';
    $httpProvider.defaults.withCredentials = true;
}]);
baseSevice.service("CheckInService", function($http){
    return{
        checkIn: function(BASE_URL, eventId, ticket){
            var ticketIdentifier = ticket.code.split('/')[0];
            return $http['post'](BASE_URL + '/admin/api/check-in/' + eventId + '/ticket/' +ticketIdentifier, ticket);
        },
        findTickets: function(BASE_URL, eventId){
            return $http.get(BASE_URL + '/admin/api/check-in/' + eventId + '/ticket');
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

baseSevice.service("ConfigService", function($http){

    this.setToken = function(token){
        $http.defaults.headers.common['X-CSRF-TOKEN'] = token;

    }


});
