try {
    var tokenKey = 'accessToken';

    function ViewModel() {

        self.newPublishers = ko.observableArray([]);
        self.savedPublishers = ko.observableArray([]);
        self.newQuote = ko.observable({ id: 0, text: "", sourceId: 0, page: 0, paragraph: 0 });
        self.newQuotes = ko.observableArray([]);
        self.savedQuotes = ko.observableArray([]);
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

            ko.observableArray([]);
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

        this.addQuote = function () {
            window.alert('addQuote');
            quote = self.newQuotes()[0];
            ResetErrors();

            var data = {
                id: 0,
                text: quote.quoteText,
                sourceId: quote.sourceId,
                page: quote.page,
                paragraph: quote.paragraph
            };

            // Handle authorization
//            var headers = getAuthorizeHeader();
            $.ajax({
                type: 'POST',
                url: '/api/Quotes',
                data: JSON.stringify(data),
                contentType: "application/json"
                //,headers: headers
            }).done(function (data) {
                quote.id = data;
                self.result("Added new quote");
            }).fail(showError);

            self.savedQuotes.push(quote);
        }

        this.addNewQuote = function () {
            self.newQuotes.push({
                id: 0,
                sourceId: 0,
                quoteText: 'NEW QUOTE',
                page: 0,
                para: 0
            });
        };

        this.getQuotes = function () {
            ResetErrors();

            // Handle authorization
            //            var headers = getAuthorizeHeader();

            // Clear list
            self.savedQuotes([]);

            $.ajax({
                type: 'GET',
                url: '/api/Quotes'
            }).done(function (data) {
                var fullResults = [];
                $.each(data, function (index, item) {
                    fullResults.push({
                        id: item.id,
                        sourceId: item.sourceId,
                        quoteText: item.text,
                        page: item.page,
                        para: item.para
                    });
                });

                self.savedQuotes(fullResults);

            }).fail(showError);
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
}
catch (ex) {
    window.alert("Error: " + ex.message);
}