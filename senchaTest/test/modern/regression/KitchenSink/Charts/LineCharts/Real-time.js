/**
 * modern KS > Charts > Line Charts > Real-time
 * By Jiri Znoj - last update: 24. 07. 2017
 * tested on:
 *          desktop:
 *              Chrome 53
 *              Firefox 54
 *              IE 11
 *              Edge 15
 *              Opera 46
 *          tablet:
 *              Safari 10
 *              Android 4.4, 5.0, 6.0, 7.1
 *              Edge 14
 *          mobile:
 *              Safari 9, 10
 *              Edge 15
 *              Android 4.4, 6.0, 7.0
 *
 *          Sencha Test:
 *              2.1.1.31
 */
describe("Real-time", function() {
    //------------------------------------------------variables-------------------------------------------------------//

    var desc = 'Line Real-time';
    var dataFromStore = [];

    //------------------------------------------------functions-------------------------------------------------------//

    //functions in file libraryFunctions.js

    //------------------------------------------------navigation------------------------------------------------------//

    beforeAll(function() {
        Lib.Chart.beforeAll("#line-real-time-date", undefined, undefined, false)
            .and(function(){
                dataFromStore = document['dataFromStore'];
            });
    });

    afterAll(function () {
        Lib.Chart.afterAll("line-real-time-date");
    });
    //------------------------------------------------tests-----------------------------------------------------------//

    describe(desc, function () {
        afterEach(function() {
            Lib.Chart.afterEach(dataFromStore);
        });

        it('Chart is rendered', function () {
            Lib.Chart.isRendered(desc);
        });

        it('Chart contains markers', function () {
            ST.component('chart')
                .and(function(chart) {
                    var items = chart.getSeries()[0].getSurface().getItems();

                    expect(items[0].boundMarkers.markers.instances[0].fillStyle).toBe("#94ae0a");
                    expect(items[0].boundMarkers.markers.instances[0].strokeStyle).toBe("#566606");

                    expect(items[1].boundMarkers.markers.instances[0].fillStyle).toBe("#115fa6");
                    expect(items[1].boundMarkers.markers.instances[0].strokeStyle).toBe("#0a3761");
                });

        });

        it('Chart is moving when time is changing (in case that chart is over whole x-axis)', function () {
            var items;
            var numberOfItemsX;
            var numberOfItemsY;
            var maximumOfAxisX;
            ST.component('chart')
                .and(function(chart) {
                    items = chart.getSeries()[0].getSurface().getItems();
                    numberOfItemsX = items[0].boundMarkers.markers.instances.length;
                    numberOfItemsY = items[1].boundMarkers.markers.instances.length;

                    maximumOfAxisX = chart.getSeries()[0].getXAxis().getMaximum();
                })
                .wait(2000) //hardcoded wait for purpose 2 seconds
                .and(function(chart) {
                    items = chart.getSeries()[0].getSurface().getItems();
                    expect(items[0].boundMarkers.markers.instances.length).toBeGreaterThan(numberOfItemsX);
                    expect(items[1].boundMarkers.markers.instances.length).toBeGreaterThan(numberOfItemsY);
                })
                .wait(8000) //8 second, because after 10 seconds chart is moving
                .wait(function(chart){
                    return chart.getSeries()[0].getXAxis().getMaximum() > maximumOfAxisX;
                })
                .and(function(chart){
                    expect(chart.getSeries()[0].getXAxis().getMaximum()).toBeGreaterThan(maximumOfAxisX);
                });
        });

        it('Source click', function(){
            Lib.sourceClick('KitchenSink.view.chart.line.RealTimeDateController');
        })
    });
});