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


        /* Loops through each feed in the allFeeds object and
         * ensures it has a URL defined and that the URL is not empty.
         */
        it('have URLs defined', function() {
            for (let feed of allFeeds) {
                expect(feed.url).toBeDefined();
                expect(feed.url).not.toBe('');
            }
        });


        /* Loops through each feed in the allFeeds object and
         *  ensures it has a name defined and that the name is not empty.
         */
        it('have names defined', function() {
            for (let feed of allFeeds) {
                expect(feed.name).toBeDefined();
                expect(feed.name).not.toBe('');
            }
        });
    });

    describe('The menu', function() {
        const body = document.querySelector('body');

        /* Ensures the menu element is hidden by default by
         * analyzing the HTML and the CSS to determine how we're
         * performing the hiding/showing of the menu element.
         */
        it('is hidden by default', function() {
            expect(body.classList.contains('menu-hidden')).toBe(true);
        });

        /* Ensures the menu changes visibility when the menu 
         * icon is clicked by ensuring that the menu displays
         * when clicked and hides when clicked again.
         */
        it('changes visibility when the menu icon is clicked', function() {
            const menuIcon = document.querySelector('.menu-icon-link')
            menuIcon.click();
            expect(body.classList.contains('menu-hidden')).toBe(false);
            menuIcon.click();
            expect(body.classList.contains('menu-hidden')).toBe(true);
        });

    });

    describe('Initial Entries', function() {
        /* Calls the asynchronous loadFeed() function
         */
        beforeEach(function(done) {
            loadFeed(0, done);
        });

        /* Ensures there is at least a single .entry element within the .feed container
         * when the loadFeed function is called and completes its work
         */
        it('there is at least a single .entry element within the .feed container', function() {
            const entries = document.querySelector('.feed').querySelectorAll('.entry');
            expect(entries.length).toBeGreaterThan(0);
        });

    });

    describe('New Feed Selection', function() {
        const feed = document.querySelector('.feed');
        let feedInnerHTMLBefore, feedInnerHTMLAfter;

        /* Calls the asynchronous loadFeed() function twice nested
         */
        beforeEach(function(done) {
            loadFeed(0, function() {
                feedInnerHTMLBefore = feed.innerHTML;
                loadFeed(1, function() {
                    feedInnerHTMLAfter = feed.innerHTML;
                    done();
                });
            });
        });

        /* Ensures the content changes when a new feed is loaded by 
         * the loadFeed function
         */
        it('content changes when a new feed is loaded', function() {
            expect(feedInnerHTMLBefore).not.toBe(feedInnerHTMLAfter);
        });

    });

});