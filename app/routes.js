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




    // application -------------------------------------------------------------
    app.get('*', function (req, res) {
        res.sendFile(__dirname + '/public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
    });
};