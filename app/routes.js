var User = require('./models/user');

function getUsers(res) {
    User.find(function (err, users) {

        // if there is an error retrieving, send the error. nothing after res.send(err) will execute
        if (err) {
            res.send(err);
        }

        res.json(users); // return all users in JSON format    
       
    });
}
;

module.exports = function (app) {

    // api ---------------------------------------------------------------------
    // get all users
    app.get('/api/users', function (req, res) {
        // use mongoose to get all users in the database
        getUsers(res);
    });

    // create user and send back all users after creation
    app.post('/api/users', function (req, res) {

        // create a user, information comes from AJAX request from Angular
        User.create({
            name: req.body.name,
            scope: req.body.scope,
            done: false
        }, function (err, user) {
            if (err)
                res.send(err);

            // get and return all the users after you create another
            getUsers(res);
        });

    });


    //get user by id
    app.get('/api/users/:user_id', function (req, res) {

        User.findById({
            _id: req.params.user_id
        }, function (err, user) {
            if (err)
                res.send(err);

            res.send(user);
        });

    });


    // delete an user
    app.delete('/api/users/:user_id', function (req, res) {

        User.remove({
            _id: req.params.user_id
        }, function (err, user) {
            if (err)
                res.send(err);

            getUsers(res);
        });
    });



    //updates the score of a user
    app.put('/api/users/:user_id', function (req, res) {

        User.update(
            {_id:req.body._id}, 
            {$set:{score:req.body.score}}, 
            function(err, user) {
                if (err){
                    res.send(err);
                }
                // get and return all the users
                getUsers(res);
        });
    });    



    // returns a random word from a list
    app.get('/api/randomword', function (req, res) {
        // 10 words
        var words = ['pizza', 'java', 'music', 'spain', 'zurich', 'program', 'classic', 'sky', 'javascript', 'angular'];
        var i = getRandomInt(0,9);
        res.send(words[i]);

    });



    getRandomInt = function(min, max){
        return Math.floor(Math.random() * (max - min)) + min;
    };

    // application -------------------------------------------------------------
    app.get('*', function (req, res) {
        res.sendFile(__dirname + '/public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
    });
};