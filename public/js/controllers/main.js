angular.module('userController', [])

	// inject the User service factory into our controller
	.controller('mainController', ['$scope','$http','Users', 'Randomword', function($scope, $http, Users, Randomword) {
		$scope.formData = {};
		$scope.loading = true;
		$scope.error = false;
		$scope.countdown = 40;
		$scope.countdownActive = false;

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
			Users.getById(id)
				.success(function(data) {
					$scope.user = data;
					$scope.loading = false;
					//$scope.$apply();
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



		$scope.checkWord = function(){

			if ($scope.formData.word != undefined) {

				if ($scope.formData.word == $scope.correctWord){
			
					$scope.user.score += calculatePoints();
					$scope.formData.word = "";

					Users.update($scope.user)
						.success(function(data) {
							$scope.loading = false;
							
							$scope.users = data; // assign our new list of users
							$scope.error = false;

							$('.hello-user').addClass('highlighted-green');
							    setTimeout(function(){
							      $('.hello-user').removeClass('highlighted-green');
							  	}, 2000);							

							showNextWord();
						});


				}
				else{
					$scope.error = true;
				}

			}

		};


		$scope.nextWord = function(){
			showNextWord();
		};



		// -1 point for every character deleted.
		$scope.removePointOnBackspace = function (event) {
		    if (event.keyCode === 8 && $scope.user.score > 0) {
		    	$scope.user.score -= 1;
				$('.hello-user').addClass('highlighted-red');
				    setTimeout(function(){
				      $('.hello-user').removeClass('highlighted-red');
				  	}, 1000);		    	
		    }
		};		





		//
		// Other functions
		//

		calculatePoints = function(){

			var max_score = 0;

			// n = number	of	characters	in	the	word,
			var n = $scope.formData.word.length;
			max_score = Math.floor(Math.pow(1.95, n/3));

			return max_score;

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



		showNextWord = function(){
			// provides random words
			Randomword.getRandomWord()
				.success(function(data) {
					$scope.correctWord = data;
					$scope.shuffledWord = shuffleWord(data);

				});
		};



	    
	    $scope.startCountdown = function(){

	    	$scope.countdown = 40;
	    	$scope.countdownActive = true;
	    	$('.countdown').removeClass('highlighted-red');

			var interval = setInterval(function() {
			    $scope.countdown--;

			    $scope.$apply();

			    if ($scope.countdown == 0) {
			    	$scope.countdownActive = false;
			    	$('.countdown').addClass('highlighted-red');
			        clearInterval(interval);
			    }
			}, 1000);
	    };


	




	}]);