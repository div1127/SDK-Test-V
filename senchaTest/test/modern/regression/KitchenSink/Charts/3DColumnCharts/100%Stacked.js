/**
 * modern KS > Charts > 3D Column Charts > 100% Stacked
 * By Jiri Znoj - last update: 7. 10. 2017
 * tested on:
 *          desktop:
 *              Chrome 59
 *              Firefox 54
 *              IE 11
 *              Edge 15
 *              Opera 46
 *          tablet:
 *              Safari 10
 *              Android 4.4, 5.0
 *              Windows 10 Edge 14
 *          mobile:
 *              Android 4.4, 5.0, 6.0, 7
 *              Safari 9, 10
 *              Windows Phone 10 Edge 15
 *          themes:
 *              Triton
 *              Neptune
 *              iOS
 *              Material
 *          Sencha Test:
 *              2.1.1.31
 */
describe("100% Stacked", function() {
    //------------------------------------------------variables-------------------------------------------------------//

    var desc = '3D Column 100% Stacked';
    var toolbar = "toolbar[id^=ext-toolbar]";
    var buttons = ['Theme'];
    var w, h;
    var graph_id;
    var graph_id_main;
    var dataFromStore = [];

    //------------------------------------------------functions-------------------------------------------------------//

    //functions in file libraryFunctions.js

    //------------------------------------------------navigation------------------------------------------------------//

    beforeAll(function() {
        Lib.Chart.beforeAll("#column-stacked-100-3d", undefined, undefined, false)
            .and(function(){
                dataFromStore = document['dataFromStore'];
                graph_id = document['graph_id'];
                graph_id_main = document['graph_id_main'];
                w = document['w'];
                h = document['h'];
            });
    });

    afterAll(function () {
        Lib.Chart.afterAll("column-stacked-100-3d");
    });
    //------------------------------------------------tests-----------------------------------------------------------//

    describe(desc, function () {
        afterEach(function() {
            Lib.Chart.afterEach(dataFromStore);
        });

        it('Chart is rendered', function () {
            Lib.Chart.isRendered(desc);
        });

        describe('Theme button is working properly', function () {
            Lib.Chart.themeComplex(desc);
        });

        it('Brightness is present when mouseover', function(){
            ST.component('chart')
                .and(function () {
                    Lib.Chart.mouseover(desc, graph_id_main, 1 * w / 24, 105 * h / 110, 'IE on Jan: 20%', undefined, [-0,0]);
                })
                .and(function () {
                    Lib.Chart.mouseover(desc, graph_id_main, 3 * w / 24, 70 * h / 110, 'Firefox on Feb: 37%', undefined, [-1,1]);
                })
                .and(function () {
                    Lib.Chart.mouseover(desc, graph_id_main, 5 * w / 24, 40 * h / 110, 'Chrome on Mar: 37%', undefined, [-2,2]);
                })
                .and(function () {
                    Lib.Chart.mouseover(desc, graph_id_main, 7 * w / 24, (4 * h) / 110 + (w / 33), 'Safari on Apr: 5%', undefined, [-3,3]);
                })
                .and(function () {
                    Lib.Chart.mouseover(desc, graph_id_main, 23 * w / 24, 1 * h / 110, 'Others on Dec: 3%', undefined, [-11,4]);
                });
        });

        describe('Legend is working and always fill whole y-axis', function(){
            it('click inside legend and check if is chosen browser disabled after click and last one stays visible', function(){
                Lib.Chart.legend(desc, graph_id_main.replace('main', 'legend'), 339);
            });
        });

        it('Source click', function(){
            Lib.sourceClick('KitchenSink.view.chart.column3d.Stacked100');
        })
    });
});