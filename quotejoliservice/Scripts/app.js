try {
    var tokenKey = 'accessToken';

    function ViewModel() {

        self.newPublishers = ko.observableArray([]);
        self.savedPublishers = ko.observableArray([]);

        self.newQuotes = ko.observableArray([]);
        self.savedQuotes = ko.observableArray([]);

        self.newSources = ko.observableArray([]);
        self.savedSources = ko.observableArray([]);
        self.FilteredSources = ko.computed(function () {
            var hasFilter = self.sourceFilter().length > 0;
            var lowerFilter = self.sourceFilter().toLowerCase();
            if (!hasFilter) {
                return self.savedSources();
            }
            else {
                return ko.utils.arrayFilter(self.savedSources(), function (src) {
                    return ko.utils.stringStartsWith(src.title.toLowerCase(), lowerFilter);
                });
            }
        }, self);

        self.errorText = ko.observable();
        self.authorBool = ko.observable('');
        self.authorNot = ko.observable('');
        self.tagBool = ko.observable('');
        self.tagNot = ko.observable('');
        self.titleBool = ko.observable('');
        self.titleNot = ko.observable('');
        self.quoteBool = ko.observable('');
        self.quoteNot = ko.observable('');
        self.searchResultsQuotes = ko.computed(function () {/*
            var searchBody = self.quoteSearch().length > 0;
            var searchTag = self.quoteSearch().length > 0;
            var searchAuthor = self.quoteSearch().length > 0;
            var searchTitle = self.quoteSearch().length > 0;
            var lowerFilter = self.filter().toLowerCase();
            if (!hasFilter) {
                return self.Timezones();
            }
            else {
                return ko.utils.arrayFilter(self.Timezones(), function (tz) {
                    return ko.utils.stringStartsWith(tz.name.toLowerCase(), lowerFilter);
                });
            }
        */}, self);

        self.result = ko.observable('');
        self.errors = ko.observableArray([]);
        self.searchQuoteBody = ko.observable('');
        self.searchQuoteTag = ko.observable('');
        self.searchSourceAuthor = ko.observable('');
        self.searchSourceTitle = ko.observable('');

        this.getPublishers = function() {
            ResetErrors();
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

            }).fail(showError);
        }

        this.addQuote = function (quote) {
            ResetErrors();

            var data = {
                id: 0,
                text: quote.quoteText,
                sourceId: quote.sourceId,
                page: quote.page,
                para: quote.paragraph
            };
            self.errorText("Error adding quote");
            // Handle authorization
            $.ajax({
                type: 'POST',
                url: '/api/Quotes',
                data: JSON.stringify(data),
                contentType: "application/json"
                //,headers: headers
            }).done(function (data) {
                quote.id = data;
                self.savedQuotes.push(quote);
                self.errorText("Success");
                self.result("Added new quote");
                $('#quoteModal').modal('show');
                resetNewQuotes;
            }).fail(showError);

        }

        this.addSource = function (source) {
            ResetErrors();

            var data = {
                id: 0,
                text: source.title,
                year: source.year,
                yearOriginal: source.yearOriginal,
                volume: source.volume,
                edition: source.edition,
                translator: source.translator
            };
            self.errorText("Error adding source");
/*
            // Handle authorization
            $.ajax({
                type: 'POST',
                url: '/api/Sources',
                data: JSON.stringify(data),
                contentType: "application/json"
                //,headers: headers
            }).done(function (data) {
                source.id = data;
                self.savedSource.push(source);
                self.errorText("Success");
                self.result("Added new source");
                $('#quoteModal').modal('show');
                self.resetNewSources();
            }).fail(showError);
*/
            alert("Adding source");
        }

        this.addPublisher = function (source) {
            ResetErrors();

            var data = {
                id: 0,
                name: source.name,
                city: source.city,
                state: source.state,
                country: source.country
            };
            self.errorText("Error adding publisher");
            /*
                        // Handle authorization
                        $.ajax({
                            type: 'POST',
                            url: '/api/Publishers',
                            data: JSON.stringify(data),
                            contentType: "application/json"
                            //,headers: headers
                        }).done(function (data) {
                            source.id = data;
                            self.savedSource.push(source);
                            self.errorText("Success");
                            self.result("Added new source");
                            $('#quoteModal').modal('show');
                            self.resetNewSources();
                        }).fail(showError);
            */
            alert("Adding publisher");
        }

        this.addNewQuote = function () {
            self.newQuotes.push({
                id: 0,
                quoteText: "NEW QUOTE",
                sourceId: 0,
                page: 0,
                paragraph: 0
            });

            resetNewSources();
        };

        function resetNewQuotes() {
            self.newQuotes.removeAll();

            self.newQuotes.push({
                id: 0,
                quoteText: "NEW QUOTE",
                sourceId: 0,
                page: 0,
                paragraph: 0
            });
        }

        function resetNewSources() {
            self.newSources.removeAll();

            self.newSources.push({
                id: 0,
                title: "NEW SOURCE",
                publisherId: 0,
                year: 0,
                yearOriginal: 0,
                volume: "",
                edition: 0,
                translator: ""
            });
        }


        function resetNewPublishers() {
            self.newPublishers.removeAll();

            self.newPublishers.push({
                id: 0,
                name: "NEW PUBLISHER",
                city: 0,
                state: 0,
                country: "Canada"
            });
        }

        this.resetUI = function () {
            resetNewQuotes();
            resetNewSources();
            resetNewPublishers();
        }

        /**TODO 
        Put source info other than title into popup
        Get author list for source
        **/
        this.getQuotes = function () {
            ResetErrors();

            // Handle authorization
            //            var headers = getAuthorizeHeader();

            // Clear list
            self.savedQuotes([]);

            $.ajax({
                type: 'GET',
//                url: '/api/Quotes/1'
                url: '/api/Quotes'
            }).done(function (data) {
                var fullResults = [];
                $.each(data, function (index, item) {
                    fullResults.push({
                        id: item.id,
                        sourceId: item.sourceId,
                        quoteText: item.text,
                        page: item.page,
                        paragraph: item.para,
                        Source: item.Source
                    });
                });

                self.savedQuotes(fullResults);

            }).fail(showError);
        }

        this.getSources = function () {
            ResetErrors();

            // Handle authorization
            //            var headers = getAuthorizeHeader();

            // Clear list
            self.savedSources([]);

            $.ajax({
                type: 'GET',
                url: '/api/Sources'
            }).done(function (data) {
                var fullResults = [];
                $.each(data, function (index, item) {
                    fullResults.push({
                        id: item.id,
                        title: item.title,
                        year: item.year,
                        yearOriginal: item.yearOriginal,
                        publisherId: item.publisherId,
                        volume: item.volume
                    });
                });

                self.savedSources(fullResults);

            }).fail(showError);
        }

        function showError(jqXHR) {
            if (jqXHR.responseText) {
                self.result("Error: " + jqXHR.responseText);
                $('#quoteModal').modal('show');
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

                $('#quoteModal').modal('show');
            }
        }

        function ResetErrors() {
            self.result('');
            self.errors.removeAll();
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

    app.getQuotes();
    app.getPublishers();
    app.addNewQuote();
    app.getSources();
    app.resetUI();
}
catch (ex) {
    window.alert("Error: " + ex.message);
}