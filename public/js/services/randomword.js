angular.module('randomwordService', [])

	.factory('Randomword', ['$http',function($http) {
		return {
			getRandomWord: function(){
				//return $http.get('http://randomword.setgetgo.com/get.php');
				return $http.get('/api/randomword');
			}			

		}
	}]);