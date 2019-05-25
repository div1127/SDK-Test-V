/**
 * modern KS > Charts > Scatter Charts > Custom Icons
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
describe("Custom Icons", function() {
    //------------------------------------------------variables-------------------------------------------------------//

    var desc = 'Custom Icons';
    var toolbar = "toolbar[id^=ext-toolbar]";
    var buttons = ['Refresh', 'Theme'];
    var w, h, graph_id_main;
    var dataFromStore = [];

    //------------------------------------------------functions-------------------------------------------------------//

    //functions in file libraryFunctions.js

    //------------------------------------------------navigation------------------------------------------------------//

    beforeAll(function() {
        Lib.Chart.beforeAll("#scatter-custom-icons")
            .and(function(){
                dataFromStore = document['dataFromStore'];
                graph_id_main = document['graph_id_main'];
                w = document['w'];
                h = document['h'];
            });
    });

    afterAll(function () {
        Lib.afterAll("scatter-custom-icons");
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

        it('Refresh button is working properly', function () {
            Lib.Chart.refreshComplex(desc, dataFromStore);
        });

        describe('Legend is working and always fill whole y-axis', function(){
            it('click inside legend and check if is chosen g disabled after click and last one stays visible', function(){
                Lib.Chart.legend(desc, graph_id_main.replace('main', 'legend'), 180);
            });
        });

        it('Icons change color when mouseover / tap on it', function() {
            var maxY;
            ST.component('chart')
                .and(function(c){
                    maxY = c.getAxes()[0].oldRange[1];
                    Lib.Chart.mouseover(desc, graph_id_main, 0.1*w/24, (maxY-128.98)*h/maxY, undefined, undefined, 0, '#ffff00');
                })
                .and(function () {
                    Lib.Chart.mouseover(desc, graph_id_main,  11*w/24, (maxY-3.637)*h/maxY, undefined, undefined, 11, '#ffff00');
                })
                .and(function () {
                    Lib.Chart.mouseover(desc, graph_id_main,  23*w/24, (maxY-288.81)*h/maxY, undefined, undefined, 23, '#ffff00');
                })
                .and(function(c){
                    maxY = c.getAxes()[0].oldRange[1];
                    Lib.Chart.mouseover(desc, graph_id_main, 0.1*w/24, (maxY-311.546)*h/maxY, undefined, undefined, [0,1], '#ffff00');
                })
                .and(function () {
                    Lib.Chart.mouseover(desc, graph_id_main,  11*w/24, (maxY-212.072)*h/maxY, undefined, undefined, [11,1], '#ffff00');
                })
                .and(function () {
                    Lib.Chart.mouseover(desc, graph_id_main,  23*w/24, (maxY-2.704)*h/maxY, undefined, undefined, [23,1], '#ffff00');
                });
        });

        it('Icons are movable ↓↑ - on touch devices by tap and drag and drop after that', function() {
            var maxY;
            var translationX;
            var newTranslationX;
            var translationY;
            var newTranslationY;
            var tolerance = 5;

            ST.component('chart')
                .and(function(c){
                    maxY = c.getAxes()[0].oldRange[1];
                    translationX = c.getSeries()[0].getSurface().getItems()[0].boundMarkers.markers.instances[0].translationX;
                    translationY = c.getSeries()[0].getSurface().getItems()[0].boundMarkers.markers.instances[0].translationY;

                    justSwipe(graph_id_main, 0, true, (maxY-128.98)*h/maxY, h);
                    Lib.waitOnAnimations();
                })
                .and(function(c){
                    maxY = c.getAxes()[0].oldRange[1];
                    newTranslationX = c.getSeries()[0].getSurface().getItems()[0].boundMarkers.markers.instances[0].translationX;
                    newTranslationY = c.getSeries()[0].getSurface().getItems()[0].boundMarkers.markers.instances[0].translationY;
                    expect(translationX).toBe(newTranslationX);
                    expect(translationY).not.toBe(newTranslationY);

                    justSwipe(graph_id_main, 0, true, h, (maxY-128.98)*h/maxY);
                    Lib.waitOnAnimations();
                })
                .and(function(c){
                    maxY = c.getAxes()[0].oldRange[1];
                    newTranslationY = c.getSeries()[0].getSurface().getItems()[0].boundMarkers.markers.instances[0].translationY;
                    expect(translationY).toBeLessThan(newTranslationY + tolerance);
                    expect(translationY).toBeGreaterThan(newTranslationY - tolerance);
                });

            ST.component('chart')
                .and(function(c) {
                    maxY = c.getAxes()[0].oldRange[1];
                    translationX = c.getSeries()[1].getSurface().getItems()[0].boundMarkers.markers.instances[0].translationX;
                    translationY = c.getSeries()[1].getSurface().getItems()[0].boundMarkers.markers.instances[0].translationY;

                    justSwipe(graph_id_main, 0, true, (maxY - 311.546) * h / maxY, h);
                    Lib.waitOnAnimations();
                })
                .and(function(c){
                    maxY = c.getAxes()[0].oldRange[1];
                    newTranslationX = c.getSeries()[1].getSurface().getItems()[0].boundMarkers.markers.instances[0].translationX;
                    newTranslationY = c.getSeries()[1].getSurface().getItems()[0].boundMarkers.markers.instances[0].translationY;
                    expect(translationX).toBe(newTranslationX);
                    expect(translationY).not.toBe(newTranslationY);

                    justSwipe(graph_id_main, 0, true, h, (maxY-311.546)*h/maxY);
                    Lib.waitOnAnimations();
                })
                .and(function(c){
                    maxY = c.getAxes()[0].oldRange[1];
                    newTranslationY = c.getSeries()[1].getSurface().getItems()[0].boundMarkers.markers.instances[0].translationY;
                    expect(translationY).toBeLessThan(newTranslationY + tolerance);
                    expect(translationY).toBeGreaterThan(newTranslationY - tolerance);
                });
        });

        it('Source click', function(){
            Lib.sourceClick('KitchenSink.view.chart.scatter.Bubble');
        })
    });
});