/**
 * modern KS > Charts > Radar Charts > Marked
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
describe("Marked", function() {
    //------------------------------------------------variables-------------------------------------------------------//

    var desc = 'Radar Marked';
    var prefix = '#kitchensink-view-chart-radar-marked';
    var toolbar = "toolbar[id^=ext-toolbar]";
    var buttons = ['Refresh', 'Theme'];
    var w, h, graph_id_main;
    var chartType = 'polar';
    var dataFromStore = [];

    //------------------------------------------------functions-------------------------------------------------------//

    //functions in file libraryFunctions.js

    //------------------------------------------------navigation------------------------------------------------------//

    beforeAll(function() {
        Lib.Chart.beforeAll("#radar-marked", chartType)
            .and(function(){
                dataFromStore = document['dataFromStore'];
                graph_id_main = document['graph_id_main'];
                w = document['w'];
                h = document['h'];
            });
    });

    afterAll(function () {
        Lib.Chart.afterAll("radar-marked");

    });
    //------------------------------------------------tests-----------------------------------------------------------//

    describe(desc, function () {
        afterEach(function() {
            Lib.Chart.afterEach(dataFromStore, chartType);
        });

        it('Chart is rendered', function () {
            Lib.Chart.isRendered(desc, chartType);
        });

        it('Tooltip is provided by mouseover / tap circle nodes', function(){
            if(Lib.isDesktop) {
                var r;
                ST.component(chartType)
                    .and(function (p) {
                        r = p.getSeries()[0].getRadius();
                        Lib.Chart.mouseover(desc, graph_id_main, w/2 + 20*r/50, h/2, 'Jan: 20%');
                    })
                    .and(function () {
                        Lib.Chart.mouseover(desc, graph_id_main, w/2 - 34*r/50, h/2, 'Jul: 34%');
                    })
                    .and(function () {
                        Lib.Chart.mouseover(desc, graph_id_main, w/2, h/2 - 45*r/50, 'Oct: 45%');
                    });
            }
            else{
                pending('Tooltips are disabled for touch devices');
            }
        });

        it('Circle nodes change color when mouseover / tap on it', function(){
            var r;
            ST.component(chartType)
                .and(function (p) {
                    r = p.getSeries()[0].getRadius();
                    Lib.Chart.mouseover(desc, graph_id_main, w/2 + 20*r/50, h/2, undefined, undefined, [0,0]);
                })
                .and(function () {
                    Lib.Chart.mouseover(desc, graph_id_main, w/2 - 34*r/50, h/2, undefined, undefined, [6,1]);
                })
                .and(function () {
                    Lib.Chart.mouseover(desc, graph_id_main, w/2, h/2 - 45*r/50, undefined, undefined, [9,2]);
                });
        });

        describe('Legend is working', function(){
            it('click inside legend and check if is chosen browser disabled after click and last one stays visible', function(){
                Lib.Chart.legend(desc, graph_id_main.replace('-main', '-legend'), 272, chartType);
            });
        });

        describe('Theme button is working properly', function () {
            Lib.Chart.themeComplex(desc, undefined, chartType);
        });

        it('Chart is rotatable', function(){
            Lib.Chart.rotate(desc, graph_id_main);
        });

        it('Source click', function(){
            Lib.sourceClick('KitchenSink.view.chart.radar.Marked');
        })
    });
});