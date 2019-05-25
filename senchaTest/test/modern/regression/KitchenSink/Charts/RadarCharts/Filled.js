/**
 * modern KS > Charts > Radar Charts > Filled
 * By Jiri Znoj - last update: 4. 8. 2017
 * tested on:
 *          desktop:
 *              Chrome 59
 *              Firefox 54
 *              IE 11
 *              Edge 15
 *          tablet:
 *              Safari 10
 *              Android 4.4
 *              Windows 10 Edge
 *          mobile:
 *              Safari 9
 *              Android 4.4, 7
 *          Sencha Test:
 *              2.1.1.31
 */
describe("Filled", function() {
    //------------------------------------------------variables-------------------------------------------------------//

    var desc = 'Radar Filled';
    var prefix = '#kitchensink-view-chart-radar-radar';
    var toolbar = "toolbar[id^=ext-toolbar]";
    var buttons = ['Refresh', 'Theme'];
    var graph_id_main;
    var initialDelay = 250;
    var chartType = 'polar';
    var dataFromStore = [];

    //------------------------------------------------functions-------------------------------------------------------//

    /**
     * Click on each legend item, check if last stays enabled, click again on each, check if one stays disabled,
     * click for the last time to restore initial state and check if last element is now enabled.
     * 6 screenShots are provided during life time this function
     * @param componentWhereLegendIs - id of legend
     * @param numberOfItems - number of items in given legend
     * @param fullWidth - width when legend is on one row
     * @param componentWhereChartIs
     */
    function fixLegend(componentWhereLegendIs, numberOfItems, fullWidth, componentWhereChartIs){
        componentWhereChartIs = componentWhereChartIs || 'cartesian';
        var lines = 1;
        var itemsInLine = numberOfItems;
        var legendWidth = fullWidth;
        var clientWidth = 0;
        var clientHeight = 0;
        var firstCoordinate = 0;
        var rightMove = 0;
        var distanceFromTop = 0;

        ST.element(componentWhereLegendIs)
        //set variables
            .and(function (e) {
                clientWidth = e.dom.clientWidth;
                clientHeight = e.dom.clientHeight;
                firstCoordinate = (clientWidth - legendWidth) / 2;
                rightMove = legendWidth/(2*itemsInLine);
                distanceFromTop = clientHeight/(lines+1);
            })
            .and(function(){
                //fix
                ST.component(componentWhereChartIs)
                    .and(function(e){
                        for(var i = 0; i < e.legendStore.data.items.length; i++){
                            if(e.legendStore.data.items[i].data.disabled == true) {
                                ST.element(componentWhereLegendIs)
                                    .click(firstCoordinate + (((i+1) * 2 - 1) * rightMove), distanceFromTop)
                                    .wait(400);
                            }
                        }
                    });
            })
    }

    //functions in file libraryFunctions.js

    //------------------------------------------------navigation------------------------------------------------------//

    beforeAll(function() {
        Lib.Chart.beforeAll("#radar-filled", chartType)
            .and(function(){
                dataFromStore = document['dataFromStore'];
                graph_id_main = document['graph_id_main'];
            });
    });

    afterAll(function () {
        Lib.Chart.afterAll("radar-filled");
    });
    //------------------------------------------------tests-----------------------------------------------------------//

    describe(desc, function () {
        afterEach(function() {
            Lib.Chart.afterEach(dataFromStore, chartType);
        });

        it('Chart is rendered', function () {
            Lib.Chart.isRendered(desc, chartType);
        });

        describe('Legend is working - iPad EXTJS-22794', function () {
            beforeAll(function(){
                ST.options.eventDelay = 500;
            });
            afterAll(function(){
                ST.options.eventDelay = initialDelay;
            });
            it('click inside legend, check if letters are chosen, disabled after click and last one stays visible - iPad EXTJS-22794', function(){
                Lib.Chart.legend(desc, graph_id_main.replace('main', 'legend'), 100, chartType);
            });
        });

        describe('Legend is working - iPads EXTJS-20770', function () {
            beforeAll(function(){
                ST.options.eventDelay = 100;
            });
            /*afterAll(function(){
                ST.options.eventDelay = initialDelay;
                ST.wait(500);
                fixLegend(graph_id_main.replace('main', 'legend'), 2, 215, prefix + ' polar');
            });*/

            it('click quickly for clicking before animation stops iPads EXTJS-20770', function () {
                Lib.Chart.legend(desc, graph_id_main.replace('main', 'legend'), 100, chartType);
            });
        });

        describe('Theme button is working properly', function () {
            Lib.Chart.themeComplex(desc, undefined, chartType);
        });

        it('Refresh button is working properly', function () {
            Lib.Chart.refreshComplex(desc, dataFromStore, undefined, chartType);
        });

        it('Chart is rotatable', function(){
            Lib.Chart.rotate(desc, graph_id_main);
        });

        it('Source click', function(){
            Lib.sourceClick('KitchenSink.view.chart.radar.Radar');
        })
    });
});