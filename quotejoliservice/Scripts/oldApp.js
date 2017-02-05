try {
    var tokenKey = 'accessToken';

    function ViewModel() {
        var self = this;

        /********* Observables ****************/
        availableRoles = ko.observableArray(['User', 'Manager', 'Admin']);
        availableTimezoneDeltas = ko.observableArray([14, 13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0, -1, -2, -3, -4, -5, -6, -7, -8, -9, -10, -11, -12]);

        self.filter = ko.observable('');
        self.userid = null;
        self.result = ko.observable();
        self.user = ko.observable();
        self.navUser = ko.observable();

        self.registerEmail = ko.observable();
        self.registerPassword = ko.observable();
        self.registerPassword2 = ko.observable();

        self.loginEmail = ko.observable();
        self.loginPassword = ko.observable();
        self.errors = ko.observableArray([]);
        self.newPublishers = ko.observableArray([]);
        self.savedPublishers = ko.observableArray([]);
        /*
        self.FilteredTimezones = ko.computed(function () {
            var hasFilter = self.filter().length > 0;
            var lowerFilter = self.filter().toLowerCase();
            if (!hasFilter) {
                return self.Timezones();
            }
            else {
                return ko.utils.arrayFilter(self.Timezones(), function (tz) {
                    return ko.utils.stringStartsWith(tz.name.toLowerCase(), lowerFilter);
                });
            }
        }, self);
        *//*
        var filter = self.filter();
        window.alert("C: " + filter + " " + item.name());
        
        if (!filter) {
            return self.Timezones();
        } else {
            window.alert("Yes?" + ko.utils.stringStartsWith(item.name().toLowerCase(), filter.toLowerCase()));
            var filtered = ko.utils.arrayFilter(self.Timezones(), function (item) {
                return ko.utils.stringStartsWith(item.name().toLowerCase(), filter.toLowerCase());
            });
            return filtered;
        }
    }, self);*/

        self.Users = ko.observableArray([]);

        self.showLogin = ko.observable(false);
        self.showLogout = ko.observable(true);
        self.showRegister = ko.observable(false);
        /*
        self.currentTime = ko.computed(function () {
            return getTZTime()
        });
        */
        function leadingZero(i) {
            if (i < 10) {
                i = "0" + i;
            }
            return i;
        }

        function getTZTime(delta) {
            var now = new Date()
            var h = now.getUTCHours() + delta;
            var m = now.getMinutes();

            m = leadingZero(m);
            return h + ":" + m;
            /*
            t = setTimeout(function () {
                getTZTime()
            }, 60000);
            */
        }
        /********* Authorization functions ****************/
        function getAuthorizeHeader() {
            var token = sessionStorage.getItem(tokenKey);
            var headers = {};
            if (token) {
                headers.Authorization = 'Bearer ' + token;
            }
            return headers;
        }

        self.login = function () {
            ResetErrors();

            self.Timezones([]);
            self.Users([]);
            self.userid = null;

            var token = sessionStorage.getItem(tokenKey);

            var loginData = {
                grant_type: 'password',
                username: self.loginEmail(),
                password: self.loginPassword()
            };

            // Clear login form
            self.loginEmail(''),
            self.loginPassword('')

            $.ajax({
                type: 'POST',
                url: '/Token',
                data: loginData
            }).done(function (data) {
                token = data.access_token;
                self.user(token);
                self.navUser(data.userName);
                // Cache the access token in session storage.
                sessionStorage.setItem(tokenKey, token);
                setLoginUI(sessionStorage.getItem(tokenKey) != null);
                self.result("Successfully Logged In");
            }).fail(showError);


            if (token != null && token.length > 0) {
                setLoginUI(true);
                getDataForUser();
                getUserIdFromServer();
            }
        }

        function getPublishersFromServer() {
            ResetErrors();
            window.alert("Get");
            // Handle authorization
            //            var headers = getAuthorizeHeader();

            // Clear list
            self.savedPublishers([]);

            $.ajax({
                type: 'GET',
                url: '/api/Publishers'
            }).done(function (data) {
                var results = [];
                var fullResults = [];

                $.each(data, function (index, item) {
                    results.push(item.name);
                    fullResults.push({
                        id: item.id,
                        name: item.name,
                        city: item.city,
                        state: item.state,
                        countryId: item.countryId
                    });
                });
                self.savedPublishers(fullResults);
                self.Publishers(fullResults);

            }).fail(showError);
            // Handle authorization
            //            var headers = getAuthorizeHeader();

            $.ajax({
                type: 'GET',
                url: '/api/Publishers'
            }).done(function (data) {
                self.userid = data.Id;
            }).fail(showError);
        }


        function getUserIdFromServer() {
            // Handle authorization
            var headers = getAuthorizeHeader();

            $.ajax({
                type: 'GET',
                url: '/api/Account/UserInfo',
                headers: headers
            }).done(function (data) {
                self.userid = data.Id;
            }).fail(showError);
        }

        self.logout = function () {
            ResetErrors();

            // Handle authorization
            var headers = getAuthorizeHeader();

            $.ajax({
                type: 'POST',
                url: '/api/Account/Logout',
                headers: headers
            }).done(function (data) {
                // Successfully logged out. Delete the token.
                self.user('');
                self.result("Successfully logged out");
                sessionStorage.removeItem(tokenKey);
                setLoginUI(sessionStorage.getItem(tokenKey) != null);
            }).fail(showError);

            self.Timezones(null);
            self.Users(null);
            self.userid = null;
        }

        /********* Create functions ****************/
        self.register = function () {
            ResetErrors();

            var data = {
                Email: self.registerEmail(),
                Password: self.registerPassword(),
                ConfirmPassword: self.registerPassword2()
            };

            // Clear sign up form
            self.registerEmail(null);
            self.registerPassword(null);
            self.registerPassword2(null);

            $.ajax({
                type: 'PUT',
                url: '/api/Account/Register',
                contentType: 'application/json; charset=utf-8',
                data: JSON.stringify(data)
            }).done(function (data) {
                self.result("Done!");
            }).fail(showError);
        }

        self.addTimezoneLocally = function () {
            self.newTimezones.push({
                id: '',
                userid: self.userid,
                delta: 0,
                city_name: '',
                name: '',
                time: getTZTime(0)
            });
        };

        self.addTimezoneToServer = function (timezone) {
            if (self.userid == null || self.userid.length == 0) {
                getUserIdFromServer();
            }

            ResetErrors();

            // This timezone is created by the logged in user
            var data = {
                'userid': self.userid,
                'id': 0,
                'name': timezone.name,
                'city_name': timezone.city_name,
                'delta': timezone.delta
            };

            // Handle authorization
            var headers = getAuthorizeHeader();

            $.ajax({
                type: 'POST',
                url: '/api/Timezone/Add',
                data: JSON.stringify(data),
                contentType: "application/json",
                headers: headers
            }).done(function (data) {
                timezone.id = data;
                self.result("Added new timezone");
            }).fail(showError);

            timezone.time = getTZTime(timezone.delta);
            self.Timezones.push(timezone);
            self.newTimezones.remove(timezone);
        };

        /********* Get functions ****************/
        self.filterTimezones = function () {

        }

        self.getUsers = function () {
            ResetErrors();

            // Handle authorization
            var headers = getAuthorizeHeader();

            // Clear list
            self.Users([]);

            $.ajax({
                type: 'GET',
                url: '/api/Account/ListUsers',
                headers: headers
            }).done(function (data) {
                var results = [];
                var fullResults = [];
                $.each(data, function (index, item) {
                    fullResults.push({
                        Id: item.Id,
                        Email: item.Email,
                        Roles: item.Roles
                    });
                });
                self.Users(fullResults);

            }).fail(showError);
        }

        self.getTimezones = function () {
            ResetErrors();

            // Handle authorization
            var headers = getAuthorizeHeader();

            // Clear list
            self.Timezones([]);

            $.ajax({
                type: 'GET',
                url: '/api/Timezones',
                headers: headers
            }).done(function (data) {
                var results = [];
                var fullResults = [];

                $.each(data, function (index, item) {
                    results.push(item.name);
                    fullResults.push({
                        id: item.id,
                        userid: item.userid,
                        delta: item.delta,
                        city_name: item.city_name,
                        name: item.name,
                        time: item.CurrentTime
                    });
                });
                //getTZTime(item.delta)
                self.Timezones(fullResults);
                self.FilteredTimezones(fullResults);

            }).fail(showError);
        }

        /********* Update functions ****************/
        self.updateUser = function (user) {
            ResetErrors();

            // Handle authorization
            var headers = getAuthorizeHeader();

            var user = {
                'Id': user.Id,
                'Email': user.Email,
                'Roles': user.Roles
            };

            $.ajax({
                type: 'POST',
                url: '/api/Account/Update',
                data: JSON.stringify(user),
                contentType: "application/json",
                headers: headers
            }).done(function (user) {
                self.result("Done!");
            }).fail(showError);
        }

        self.updateTimezone = function (timezone) {
            ResetErrors();

            // Handle authorization
            var headers = getAuthorizeHeader();

            var data = {
                'userid': timezone.userid,
                'id': timezone.id,
                'name': timezone.name,
                'city_name': timezone.city_name,
                'delta': timezone.delta
            };

            $.ajax({
                type: 'PUT',
                url: '/api/Timezone/Update',
                data: JSON.stringify(data),
                contentType: "application/json",
                headers: headers
            }).done(function (data) {
                self.result("Done!");
            }).fail(showError);
        }

        /********* Remove functions ****************/
        self.removeUser = function (user) {
            DeleteUser(user.Id);
            self.Users.remove(user);
        }

        self.removeTimezone = function (timezone) {
            DeleteTimezone(timezone.id);
            self.Timezones.remove(timezone);
        }

        function DeleteUser(id) {
            ResetErrors();

            // Handle authorization
            var headers = getAuthorizeHeader();

            var user = {
                'Id': id
            };

            $.ajax({
                type: 'DELETE',
                url: '/api/Account/Delete',
                data: JSON.stringify(user),
                contentType: "application/json",
                headers: headers
            }).done(function (data) {
                self.result("Done!");
            }).fail(showError);
        }

        function DeleteTimezone(id) {
            ResetErrors();

            // Handle authorization
            var headers = getAuthorizeHeader();

            $.ajax({
                type: 'DELETE',
                url: '/api/Timezone/Delete',
                data: JSON.stringify(id),
                contentType: "application/json",
                headers: headers
            }).done(function (data) {
                self.result("Done!");
            }).fail(showError);
        }

        /********* UI functions ****************/
        self.toggleRegister = function (toggle) {
            showRegister(toggle);
        }

        function showError(jqXHR) {
            if (jqXHR.responseText) {
                self.result("Error: " + jqXHR.responseText);
                return;
            }
            self.result(jqXHR.status + ': ' + jqXHR.statusText);

            var response = jqXHR.responseJSON;
            if (response) {
                if (response.Message) self.errors.push(response.Message);
                if (response.ModelState) {
                    var modelState = response.ModelState;
                    for (var prop in modelState) {
                        if (modelState.hasOwnProperty(prop)) {
                            var msgArr = modelState[prop]; // expect array here
                            if (msgArr.length) {
                                for (var i = 0; i < msgArr.length; ++i) self.errors.push(msgArr[i]);
                            }
                        }
                    }
                }
                if (response.error) self.errors.push(response.error);
                if (response.error_description) self.errors.push(response.error_description);
            }
        }

        function ResetErrors() {
            self.result('');
            self.errors.removeAll();
        }

        function setLoginUI(loggedIn) {
            self.showLogin(!loggedIn);
            self.showLogout(loggedIn);
        }

        function getDataForUser() {
            ResetErrors();

            // Get timezone list for self user
            var tz = new self.getTimezones();

            // Get user list for self user
            var usrs = new self.getUsers();
        }
    }

    var app = new ViewModel();

    ko.bindingHandlers.confirmClick =
        {
            init: function (element, valueAccessor, allBindings, viewModel) {
                var value = valueAccessor();
                var message = ko.unwrap(value.message);
                var click = value.click;
                ko.applyBindingsToNode(element,
                    {
                        click: function () {
                            if (confirm(message))
                                return click.apply(self, Array.prototype.slice.apply(arguments));
                        }
                    }, viewModel);
            }
        }

    ko.applyBindings(app);
    app.getPublishersFromServer();
}
catch (ex) {
    window.alert("Error: " + ex.message);
}