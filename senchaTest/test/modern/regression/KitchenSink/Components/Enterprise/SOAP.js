/**
 * @file soap.js
 * @author Petr Bahr
 * Soap
 * Tested on : Chrome, FF, IE11, Android 6
 * Passed on : Chrome, FF, IE11, Android 6
 **/

xdescribe("soap", function() {
    var prefix = "#kitchensink-view-enterprise-soap ";
    beforeAll(function () {
        // redirect to page Components>Enterprise>soap
        Lib.beforeAll("#soap", prefix + 'gridcell[value="The Sky Is Falling"]');
    });
    afterAll(function(){
        Lib.afterAll(prefix);
    });

    // soap is loaded correctly
    describe("soap is loaded correctly", function() {
        it('soap main page is loaded', function () {
            ST.grid(prefix)
                .visible()
                .rendered()
                .and(function(grid)
                {expect(grid.isVisible()).toBeTruthy()});
        });
        it('screenshot should match baseline', function () {
            Lib.screenshot('modernSoap');
        });
        it('soap main page has 10 records', function () {
            ST.grid(prefix)
                .and(function(list) {
                    expect(list.getStore().getCount()).toBe(10);
                });
        });
    });

    // sorting test
    describe("sorting test", function() {
        var column = ['Title','Manufacturer'];
        var cell = ['1','2'];
        var text = ['A Stranger in the Mirror','Warner Books'];
        var text2 = ['The Sky Is Falling','William Morrow & Company'];
        function sorting(column,cell,text,text2) {
            it('should sort column ' + column + ' ASC and DESC by clicking on header', function () {
                ST.grid(prefix + "headercontainer gridcolumn[_dataIndex=" + column + "]")
                    .click(1,1);
                ST.grid(prefix)
                    .rowAt(0)
                    .cellAt(cell)
                    .and(function (cell) {
                        expect(cell.el.dom.textContent).toBe(text);
                    });
                ST.grid(prefix+ "headercontainer gridcolumn[_dataIndex=" + column + "]")
                    .click(1,1);
                ST.grid(prefix)
                    .rowAt(0)
                    .cellAt(cell)
                    .and(function (cell) {
                        expect(cell.el.dom.textContent).toBe(text2);
                    });
            });
        }
        for(var i = 0; i < column.length; i++) {
            sorting(column[i],cell[i],text[i],text2[i]);
        }
    });
});