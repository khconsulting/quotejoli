try {
    var tokenKey = 'accessToken';

//    var rootRoute = "quotejoli/api/";
    var rootRoute = "/api/";

    var loadingQuotes = ko.observable(true);
    var loadedSources = ko.observable(false);
    var loadedPublishers = ko.observable(false);
    var loadedAuthors = ko.observable(false);
    var loadedCountries = ko.observable(false);
    var filterOptions = ko.observableArray(['None', 'And', 'Or']);
    var quoteOption = ko.observable();
    var titleOption = ko.observable();
    var tagOption = ko.observable();
    var authorOption = ko.observable();
    var sourcesReady = ko.observable(false);
    var quoteSource = ko.observable();
    var quotePage = ko.observable(15);
    var quoteParagraph = ko.observable();
    var quoteText = ko.observable();

    var Publisher = function (_id,
                              _name,
                              _city,
                              _state,
                              _countryId,
                              _countryName) {
        this.id = _id;
        this.name = _name;
        this.city = _city;
        this.state = _state;
        this.countryId = _countryId;
        this.countryName = _countryName;
    };

    var Author = function (_id
                           ,_firstName
                           ,_lastName
                           ,_fullName) {
        this.id = _id;
        this.authorId = _id;
        this.firstName = _firstName;
        this.lastName = _lastName;
        this.fullName = _fullName;
    };

    var Source= function (_id
                          ,_title
                          ,_year
                          ,_yearOriginal
                          ,_publisherId
                          ,_publisher
                          ,_volume
                          ,_edition
                          ,_translator
                          ,_ISBN
                          ,_authors) {
        this.id = _id;
        this.title = _title;
        this.year = _year;
        this.yearOriginal = _yearOriginal;
        this.publisherId = _publisherId;
        this.publisher = _publisher;
        this.volume = _volume;
        this.edition = _edition;
        this.translator = _translator;
        this.ISBN = _ISBN;
        this.authors = _authors;
    };

    function ViewModel() {
        var self = this;
        self.debug = ko.observable(false);

        /*===== Quote objects ====*/
        self.newQuote = ko.observable({
            id: 0,
            quoteText: '',
            sourceId: null,
            title: '',
            page: 0,
            paragraph: 0
        });
        self.savedQuotes = ko.observableArray([]);

        /*===== Source objects ====*/
        self.selectedSource = ko.observable();
        self.newSources = ko.observableArray([]);
        self.savedSources = ko.observableArray([]);
        self.savedSourceTitles = ko.observableArray([]);

        /*===== Publisher objects ====*/
        self.selectedPublisher = ko.observable(3);
        self.newPublishers = ko.observableArray([]);
        self.savedPublishers = ko.observableArray([]);

        /*===== Author objects ====*/
        self.selectedAuthors = ko.observableArray([]);
        self.selectedAuthor = ko.observable();
        self.savedAuthors = ko.observableArray([]);
        self.newAuthors = ko.observableArray([]);
        self.authorBool = ko.observable('');
        self.authorNot = ko.observable('');

        /*===== Tag objects ====*/
        self.tagBool = ko.observable('');
        self.tagNot = ko.observable('');

        /*===== Country objects ====*/
        self.countries = ko.observableArray([]);
        self.selectedCountry = ko.observable();

        self.errorText = ko.observable();
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
                url: rootRoute + 'Publishers'
            }).done(function (data) {
                var results = [];
                var fullResults = [];

                $.each(data, function (index, item) {
                    results.push(item.name);
                    p = new Publisher(item.id,
                                      item.name,
                                      item.city,
                                      item.state,
                                      item.countryId,
                                      item.countryName);
                    fullResults.push(p);
                });
                self.savedPublishers(fullResults);

            }).fail(showError);
        }

        this.getCountries = function () {
            // Clear list
            self.countries([]);
            
            $.ajax({
                type: 'GET',
                url: rootRoute + 'Countries'
            }).done(function (data) {
                var fullResults = [];

                $.each(data, function (index, item) {
                    fullResults.push({
                        id: item.id,
                        name: item.CountryName
                    });
                    self.errorText("Success");
                });

                self.countries(fullResults);
            }).fail(showError);
        }

        this.getAuthors = function () {
            resetNewAuthors();
            ResetErrors();
            // Handle authorization
            //            var headers = getAuthorizeHeader();

            // Clear list
            self.savedAuthors([]);

            $.ajax({
                type: 'GET',
                url: rootRoute + 'Authors'
            }).done(function (data) {
                var results = [];
                var fullResults = [];
                
                $.each(data, function (index, item) {
                    var a = new Author(item.id
                                      , item.firstName
                                      , item.lastName
                                      , item.fullName);
                    fullResults.push(a);
                    
/*                    fullResults.push({
                        id: item.id,
                        firstName: item.firstName,
                        lastName: item.lastName,
                        fullName: item.lastName + ', ' + item.firstName
                    });*/
                });

                self.savedAuthors(fullResults);

            }).fail(showError);
        }

        this.addQuote = function (quote) {
            ResetErrors();
            window.alert("New quote:\nSource: " + quoteSource() + "\nPage: " + quotePage() + "\nParagraph: " + quoteParagraph() + "\nText: " + quoteText());
            return;
            var data = {
                id: 0,
                text: quote.quoteText,
                sourceId: app.selectedSource().id,
                page: quote.page,
                para: quote.paragraph
            };
            self.errorText("Error adding quote");
            // Handle authorization
            $.ajax({
                type: 'POST',
                url: rootRoute + 'Quotes',
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
                title: source.title,
                year: source.year,
                yearOriginal: source.yearOriginal,
                volume: source.volume,
                publisherId: app.selectedPublisher().id,
                edition: source.edition,
                Authors: app.selectedAuthors(),
                translator: source.translator,
                isbn: source.ISBN
            };
            self.errorText("Error adding source");

            // Handle authorization
            $.ajax({
                type: 'POST',
                url: rootRoute + 'Sources',
                data: JSON.stringify(data),
                contentType: "application/json"
                //,headers: headers
            }).done(function (data) {
                source.id = data;
                self.errorText("Success");
                self.result("Added new source");
                $('#quoteModal').modal('show');
                self.getSources();
                self.resetNewSources();
            }).fail(showError);
        }

        findAuthor = function (findId) {
            alert('Find');
            for (var i = 0, len = savedAuthors.length; i < len; i++) {
                if (savedAuthors[i].id === findId)
                    return savedAuthors[i]; // Return as soon as the object is found
            }
            return null; // The object was not found
        }
        
        this.addPublisher = function (publisher) {
            ResetErrors();

            var data = {
                id: 0,
                name: publisher.name,
                city: publisher.city,
                state: (publisher.state=='' || publisher.state == null) ? 'NONE': publisher.state,
                countryId: self.selectedCountry()
            };
            self.errorText("Error adding publisher");
                        // Handle authorization
            $.ajax({
                type: 'POST',
                url: rootRoute + 'Publishers',
                data: JSON.stringify(data),
                contentType: "application/json"
                //,headers: headers
            }).done(function (data) {
                publisher.id = data;
                self.errorText("Success");
                self.result("Added new Publisher");
                $('#quoteModal').modal('show');
                self.getPublishers();
                self.newPublishers([]);
            }).fail(showError);
        }

        this.addNewQuote = function () {
            self.newQuote({
                id: 0,
                quoteText: "NEW QUOTE",
                sourceId: null,
                title: '',
                page: 0,
                paragraph: 0
            });

//            resetNewSources();
        };

        this.addAuthor = function (author) {
            ResetErrors();

            var data = {
                id: 0,
                firstName: author.firstName,
                lastName: author.lastName
            };
            self.errorText("Error adding author");
            
            $.ajax({
                type: 'POST',
                url: rootRoute + 'Authors',
                data: JSON.stringify(data),
                contentType: "application/json"
                //,headers: headers
            }).done(function (data) {
                author.id = data;
                self.errorText("Success");
                self.result("Added new author");
                $('#quoteModal').modal('show');
                $('addAuthorPane').collapse();
                self.getAuthors();
                self.newAuthors([]);
            }).fail(showError);
        };

        this.addNewAuthor = function () {
            self.newAuthors.push({
                id: 0,
                firstName: "AUTHOR FIRST NAME",
                lastName: "AUTHOR LAST NAME",
            });
        };

        function resetNewQuotes() {
            self.newQuotes.removeAll();

            self.newQuote({
                id: 0,
                quoteText: "NEW QUOTE",
                sourceId: 0,
                title: '',
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
                translator: "",
                ISBN: ""
            });
        }

        function resetNewAuthors() {
            self.newAuthors.removeAll();

            self.newAuthors.push({
                id: 0,
                firstName: "AUTHOR FIRST NAME",
                lastName: "AUTHOR LAST NAME",
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
                url: rootRoute + 'Quotes'
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
                loadingQuotes(false);
            }).fail(showError);
        }

        this.getSources = function () {
            ResetErrors();

            // Handle authorization
            //            var headers = getAuthorizeHeader();

            // Clear list
            self.savedSources([]);
            var src = null;
            var titleResults = [];

            $.ajax({
                type: 'GET',
                url: rootRoute + 'Sources'
            }).done(function (data) {
                var fullResults = [];
                var qq = 0;
                $.each(data, function (index, item) {
                    src = new Source(item.id,
                                     item.title,
                                     item.year,
                                     item.yearOriginal,
                                     item.publisherId,
                                     item.Publisher.name,
                                     item.volume,
                                     item.edition,
                                     item.translator,
                                     item.isbn,
                                     item.AuthorNames);

                    fullResults.push(src);
                    titleResults.push(src.title);
                    qq++;
                    /*
                    fullResults.push({
                        id: item.id,
                        title: item.title,
                        year: item.year,
                        yearOriginal: item.yearOriginal,
                        publisherId: item.publisherId,
                        publisher: item.Publisher.name,
                        volume: item.volume,
                        edition: item.edition,
                        translator: item.translator,
                        ISBN: item.isbn,
                        authors: item.AuthorNames,
                    });*/
                });

                /* TESTING DATA
fullResults = [
    { title: 'Hey', id: 0, authorNames: ['Carroll', 'Vonnegut'] },
    { title: 'Abc', id: 0, authorNames: ['Carroll', 'Vonnegut'] },
    { title: 'Squonk', id: 0, authorNames: ['Carroll', 'Vonnegut'] },
    { title: 'Flirp', id: 0, authorNames: ['Carroll', 'Vonnegut'] },
    { title: 'Jung\'s Women', id: 0, authorNames: ['Carroll', 'Vonnegut'] },
    { title: 'Flark', id: 0, authorNames: ['Carroll', 'Vonnegut'] },
    { title: 'Moomf', id: 0, authorNames: ['Carroll', 'Vonnegut'] },
    { title: 'Plipt', id: 0, authorNames: ['Carroll', 'Vonnegut'] },
    { title: 'Palimpsest', id: 0, authorNames: ['Carroll', 'Vonnegut'] },
    { title: 'Skite', id: 0, authorNames: ['Carroll', 'Vonnegut'] },
    { title: 'Pangle', id: 0, authorNames: ['Carroll', 'Vonnegut'] },
    { title: 'Flurry', id: 0, authorNames: ['Carroll', 'Vonnegut'] },
    { title: 'Marks and Such', id: 0, authorNames: ['Carroll', 'Vonnegut'] }
];*/
                window.alert("Results count: " + qq);

window.alert("fullResults In getSources in block: " + self.savedSources().length);
self.savedSources(titleResults);
                window.alert("savedSources In getSources in block: " + self.savedSources().length);
                sourcesReady(true);

                $("#source").autocomplete({
                    source: app.savedSources()
                });

            }).fail(showError);
        }

        function combineAuthors(authors)
        {
            try {
                var s = '';
                foreach( a in authors)
                {
                    s += (s.length > 0 ? ', ' : '') + a.fullName;
                }
                alert(s);
                return s;
            }
            catch(ex)
            {
                alert("Combine: " + ex.message);
            }
            return "Nope";
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

        function showSource(data, event) {
            window.alert("Show source");
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
    /*
    app.getQuotes();
    app.getPublishers();
    app.getAuthors();
    app.getCountries();
    */
    app.getSources();
    app.addNewQuote();
    var q = 0;
    while (!sourcesReady)
    {
        q++;
        if (q % 1000 == 0)
        {
            window.alert(q);
        }
    }
    var esses = "";
    for (var source in app.savedSources)
    {
        esses += ", " + source
    }
    window.alert(app.savedSources());
    $("#source").autocomplete({
        source: app.savedSources()
    });

    //    app.resetUI();
}
catch (ex) {
    window.alert("Error: " + ex.message);
}
/*
var count = 1;
function newSource() {
    var copy = [];
    for (var i in source) {
        copy[i] = source[i] + count;
    }
    ++count;
    return copy;
}
*/