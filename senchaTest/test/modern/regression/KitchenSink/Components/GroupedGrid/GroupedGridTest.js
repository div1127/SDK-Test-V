describe("GroupedGridTest", function() {
    beforeAll(function() {
        KitchenSink.app.redirectTo('#grouped-grid');
    });

    var me = {
        getGrid: function() {
            return ST.grid('grouped-grid > grid');
        }
    };

    it('should click on rows', function() {
        // Grouped grid rowclick is not working: https://sencha.jira.com/browse/ORION-2455
        var rowValue = ST.component('gridrow[id="ext-gridrow-2"] gridcell[_rawValue="Creamery"]');

        me.getGrid().rowAt(2).cellAt(1).click().and(function(rowValue) {
            expect(rowValue).contain('Creamery');
        });
    });
});
