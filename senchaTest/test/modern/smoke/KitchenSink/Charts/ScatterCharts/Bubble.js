/**
 * modern KS > Charts > Scatter Charts > Bubble
 * By Jiri Znoj - last update: 7. 8. 2017
 * tested on:
 *          desktop:
 *              Chrome 59
 *              Firefox 54
 *              IE 11
 *              Edge 15
 *              Opera 46
 *          tablet:
 *              Safari 10
 *              Android 4.4
 *          mobile:
 *              Safari 9
 *              Windows 10 Edge
 *              Android 6
 *          Sencha Test:
 *              2.2.0.60
 */
describe("Bubble", function() {
    //------------------------------------------------variables-------------------------------------------------------//

    var desc = 'Scatter Bubble';
    var toolbar = "toolbar[id^=ext-toolbar]";
    var buttons = ['Refresh'];
    var w, h, graph_id_main;
    var dataFromStore = [];

    //------------------------------------------------functions-------------------------------------------------------//

    //functions in file libraryFunctions.js

    //------------------------------------------------navigation------------------------------------------------------//

    beforeAll(function() {
        Lib.Chart.beforeAll("#scatter-bubble")
            .and(function(){
                dataFromStore = document['dataFromStore'];
                graph_id_main = document['graph_id_main'];
                w = document['w'];
                h = document['h'];
            });
    });

    afterAll(function () {
        Lib.Chart.afterAll("scatter-bubble");
    });
    //------------------------------------------------tests-----------------------------------------------------------//

    describe(desc, function () {
        afterEach(function() {
            Lib.Chart.afterEach(dataFromStore);
        });

        it('Chart is rendered', function () {
            Lib.Chart.isRendered(desc);
        });

        it('Refresh button is working properly', function () {
            Lib.Chart.refreshComplex(desc, dataFromStore);

            var store = Ext.first('scatter-bubble cartesian').getStore();
            var countLoading = store.loadCount;
            ST.button(Components.button(buttons[0]))
                .and(function(){
                    expect(store.loadCount).toBeGreaterThan(countLoading);
                });
        });

        xit('Circle change color to yellow and increase size when mouseover / tap on it', function() {
            var maxY;
            var maxX;
            ST.component('chart')
                .and(function(c){
                    maxY = c.getAxes()[0].oldRange[1];
                    maxX = c.getAxes()[1].oldRange[1];
                    Lib.Chart.mouseover(desc, graph_id_main, 0.1*w/maxX, (maxY-503.9)*h/maxY, undefined, undefined, 0, '#ffd700');
                })
                .and(function () {
                    Lib.Chart.mouseover(desc, graph_id_main,  23*w/maxX, (maxY-110.446)*h/maxY, undefined, undefined, 23, '#ffd700');
                })
                .and(function () {
                    Lib.Chart.mouseover(desc, graph_id_main,  39*w/maxX, (maxY-105.254)*h/maxY, undefined, undefined, 39, '#ffd700');
                });
        });

        it('Animation is provided after refresh data', function () {
            var animating;
            ST.button(Components.button(buttons[0]))
                .click()
                .wait(function(){
                    animating = Ext.first('scatter-bubble cartesian').getSeries()[0].getSurface().getItems()[0].attr.animating;
                    return animating;
                })
                .and(function(){
                   expect(animating).toBe(true);
                });
        });

        it('Source click', function(){
            Lib.sourceClick('KitchenSink.view.chart.scatter.Bubble');
        })
    });
});