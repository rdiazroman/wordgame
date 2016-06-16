angular.module('userService', [])

	.factory('Users', ['$http',function($http) {
		return {
			get : function() {
				return $http.get('/api/users');
			},
			getById: function(id){
				return $http.get('/api/users/' + id);
			},
			create : function(userData) {
				return $http.post('/api/users', userData);
			},
			delete : function(id) {
				return $http.delete('/api/users/' + id);
			},
			update : function(userData){
				return $http.put('/api/users/' + userData._id, userData);
			}		

		}
	}]);