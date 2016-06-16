angular.module('userController', [])

	// inject the User service factory into our controller
	.controller('mainController', ['$scope','$http','Users', 'Randomword', function($scope, $http, Users, Randomword) {
		$scope.formData = {};
		$scope.loading = true;



		// GET =====================================================================
		// when landing on the page, get all users and show them
		// use the service to get all the users
		Users.get()
			.success(function(data) {
				$scope.users = data;
				$scope.loading = false;
			});

		// provides random words
		Randomword.getRandomWord()
			.success(function(data) {
				$scope.correctWord = data;
				$scope.shuffledWord = shuffleWord(data);

				console.log('correctWord: ' + $scope.correctWord);
				console.log('shuffledWord:' + $scope.shuffledWord);
			});


		// CREATE ==================================================================
		// when submitting the add form, send the text to the node API
		$scope.createUser = function() {

			// validate the formData to make sure that something is there
			// if form is empty, nothing will happen
			if ($scope.formUserData.name != undefined) {
				$scope.loading = true;

				// call the create function from our service (returns a promise object)
				Users.create($scope.formUserData)

					// if successful creation, call our get function to get all the new users
					.success(function(data) {
						$scope.loading = false;
						$scope.formUserData = {}; // clear the form so our user is ready to enter another
						$scope.users = data; // assign our new list of users
					});
			}
		};


		// SELECT ==================================================================
		// select the user who wants to play
		$scope.selectUser = function(id) {

			console.log(id);

			Users.getById(id)
				.success(function(data) {
					$scope.user = data;
					$scope.loading = false;
				});


		};	



		// DELETE ==================================================================
		// delete a user after checking it
		$scope.deleteUser = function(id) {
			$scope.loading = true;

			Users.delete(id)
				// if successful creation, call our get function to get all the new users
				.success(function(data) {
					$scope.loading = false;
					$scope.users = data; // assign our new list of users
				});
		};


		shuffleWord = function(word){
		    var a = word.split(''),
		        n = a.length;

		    for(var i = n - 1; i > 0; i--) {
		        var j = Math.floor(Math.random() * (i + 1));
		        var tmp = a[i];
		        a[i] = a[j];
		        a[j] = tmp;
		    }
		    return a.join('');
			

		};



	}]);