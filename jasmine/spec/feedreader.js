/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
        it('all urls have are defined and not empty', function() {
            for(var i in allFeeds) {
            expect(allFeeds[i].url).toBeDefined();
            expect(allFeeds[i].url.length).not.toBe(0);
            }
        });

        /* loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
        it('have defined names', function() {
            for(var i in allFeeds) {
            expect(allFeeds[i].name).toBeDefined();
            expect(allFeeds[i].name.length).not.toBe(0);
            expect(typeof allFeeds[i].name).toBe('string');
            }
        })


    });


    /*test suite named "The menu" */
    describe('The menu', function() {

        /* Checking if the menu element is
         * hidden by default. You'll have to analyze the HTML and
         * the CSS to determine how we're performing the
         * hiding/showing of the menu element.
         */

        // Ensures the menu element is hidden by default.
        it('is hidden by default', function () {
            expect($('body').hasClass('menu-hidden')).toBeTruthy();
        });

         /* test to ensures the menu changes
          * visibility when the menu icon is clicked.
          */

        //check body has and does not have .menu-hidden on
        //every other click of menu-icon
        it('is visible when clicked', function () {
            var menuIcon = $('.menu-icon-link');
            menuIcon.click();
            expect($('body').hasClass('menu-hidden')).toBeFalsy();
            menuIcon.click();
            expect($('body').hasClass('menu-hidden')).toBeTruthy();
        });

    });

    /* test suite named "Initial Entries" */
    describe('Initial Entries', function() {

        /* the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         */
        var id = 0;
        //beforeEach to wait for async call to finish
        beforeEach(function (done) {
            loadFeed(id, done);
        });

        //checks to see if at least 1 feed entry has been added
        it('there is at least one single element', function () {
            expect($('.feed .entry').length).toBeGreaterThan(0);
        });
    });

    /* test suite named "New Feed Selection" */
    describe('New Feed Selection', function () {

        /* new feed is loaded
         * by the loadFeed function and the content actually changes.
         * Remember, loadFeed() is asynchronous.
         */
        var $previous;
        var id = 0;

        //beforeEach to wait for async calls to finish
        beforeEach(function (done) {
            loadFeed(id, function () {
                $previous = $('.feed .entry').html();
                loadFeed((id + 1), function () {
                    done();
                })
            });
        });

        //afterEach to reload first entry
        afterEach(function (done) {
            loadFeed(id, function () {
                done();
            })
        })

        //Ensuring that the content actually changes
        it('content of .feed changes on menu click', function (done) {
            expect($('.feed .entry').html()).not.toEqual($previous);
            done();
        });


    });

}());
