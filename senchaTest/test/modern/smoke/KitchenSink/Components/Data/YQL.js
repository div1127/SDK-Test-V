/**
 * @file YQL.js
 * @author Vojtech Cerveny
 * @date 19.8.2016
 *
 * Disabled test suite on 2018-11-30, as YQL example removed from Kitchen Sink.
 * 
 * Tested on: Firefox, Chrome, Opera, Safari, IE11, iOS phone 8.3, iOS tablet 9, Android6 phone, Android6 tablet,
 * Passed on: all tested
 */
xdescribe('YQL example', function () {
    var Cmp = {
        buttonByText: function (text) {
            return ST.button('button[text=' + text + ']');
        },
        getYQLText: function () {
            return Ext.first('yql component').getHtml()
        }
    };

    /*beforeAll(function() {
        Lib.beforeAll("#yql", "yql");
        Cmp.buttonByText('Load using YQL')
            .visible();
    });
    afterAll(function(){
        Lib.afterAll("yql");
    });*/

    it('is loaded properly', function () {
        Cmp.buttonByText('Load using YQL')
            .and(function (btn) {
               var text = btn.getText();
                expect(text).toBe('Load using YQL');
            });
    });

    it('screenshot should be same', function(){
        Lib.screenshot("modern_YQL");
    });

    describe('YQL Data', function () {
        beforeAll(function(){
            ST.options.timeout = 10000;
        });
        afterAll(function(){
            ST.options.timeout = 5000;
            // if data are not loaded message box is shown
            // need to handle this scenario here
            var msgbox = Ext.ComponentQuery.query('messagebox[title=Error]'),
                i = 0,
                n = msgbox.length;
            for(i;i<n;i++){
                ST.component(msgbox[i]).and(function (msgbox) {
                    msgbox.hide();
                }).hidden();
            }
        });
        it('are loaded after clicking on button Load using YQL', function () {
            var expectedText = 'www.sencha.com';
            Cmp.buttonByText('Load using YQL')
                .click()
                .wait(function(){
                    var yql = Ext.first('yql');
                    return yql&&yql.getMasked()&&yql.getMasked().getHidden();
                })
                .wait(function () {
                    var text = Cmp.getYQLText();
                    return text && text.length > 0;
                })
                .and(function () {
                    expect(Cmp.getYQLText()).toContain(expectedText);
                });
        });
    });

    describe('Source code', function(){
        it('should open, check and close', function(){
            Lib.sourceClick('YQL');
        });
    });
});
