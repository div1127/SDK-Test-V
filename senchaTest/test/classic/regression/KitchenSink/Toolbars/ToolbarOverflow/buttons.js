/**
 * Toolbars and menus: Overflow Toolbar
 * By Jiri Znoj
 * tested on:
 *          desktop:
 *              Chrome 49
 *          tablet:
 *          mobile:
 *          themes:
 *              Triton
 *          OS:
 *              Windows 10
 *
 */
describe("Checking all buttons", function() {
    //------------------------------------------------variables-------------------------------------------------------//
    var buttons = ['Copy'];
    var buttonsMessage = ['Action.*You clicked "Copy"'];
    var splitButtons = ['Menu', 'Cut'];
    var splitButtonsMessage = ['Action.*You clicked "Menu Button"', 'Action.*You clicked "Cut"'];
    var menuButtons = ['Paste'];
    var menuItems = ['Menu Button 1', 'Cut Menu Item', 'Paste Menu Item'];
    var menuItemsMessage = ['Action.*You clicked "Menu Item 1"', 'Action.*You clicked "Cut menu"', 'Action.*You clicked "Paste menu"'];
    var hamburgerButtons = 'x-toolbar-more-icon';
    var hiddenButtons = ['Format'];
    var hiddenButtonsMessageBox = ['Action.*You clicked "Format"'];
    var hiddenCheckBox = ['Sell', 'Buy'];
    var hiddenCheckBoxMessageBox = ['Action.*Right ToggleButton Buy', 'Action.*Right ToggleButton Sell'];
    var dateMessageBoxText = "^Action date.*You picked";
    var panelText=['panel[title=null][@componentCls=x-panel]'];

    //------------------------------------------------navigation------------------------------------------------------//

    beforeAll(function() {
        KitchenSink.app.redirectTo("#toolbar-overflow");
    });

    //------------------------------------------------tests-----------------------------------------------------------//


    describe('Click on buttons in panel', function () {
        for (var i = 0; i < splitButtons.length; i++) {
            Lib.testSplitButtons(panelText, splitButtons[i], menuItems[i]);
        }

        for (i = 0; i < buttons.length; i++) {
            Lib.testButtons(panelText, buttons[i]);
        }

        for (i = 0; i < menuButtons.length; i++) {
            Lib.testMenuButton(panelText, menuButtons[i], menuItems[i + splitButtons.length]);
        }
    });

    xdescribe('actions in hidden menu', function () {
        var counter = 0;
        beforeEach(function() {
            ST.button(Components.hamburgerButton(hamburgerButtons))
                .visible()
                .click();
        });
        afterEach(function(){
            ST.component(panelText)
                .click()
        });

        Lib.testMenuItem(null, Components.menuitem(hiddenButtons[0]), hiddenButtonsMessageBox[0]);

        Lib.testCheckButtons("", hiddenCheckBox[0], true, undefined, hiddenCheckBox[1], undefined, hiddenCheckBoxMessageBox[0]);

        Lib.testCheckButtons("", hiddenCheckBox[1], false, undefined, hiddenCheckBox[0], undefined, hiddenCheckBoxMessageBox[1]);

        Lib.testMenuItemChooseColor(null, Components.menuitem("Choose a Color"), "^Color Selected.*You choose");

    });

    xdescribe("date Picker", function(){
        var splitButtonText = "splitbutton[tooltip ^= Choose]";
        var okButtonText = ">> div.x-monthpicker-buttons a:first-child";

        //has to open and close monthpicker before getting buttons 'OK' or 'Cancel', they are not loaded yet
        beforeAll(function(){

            ST.button(Components.hamburgerButton(hamburgerButtons))
                .visible()
                .click();

            ST.component('menu datefield')
                .and(function(datefield){
                    ST.button('@' + datefield.getId() + '-trigger-picker')
                        .click();
            });

            ST.button(splitButtonText)
                .visible()
                .click();

            ST.component(okButtonText)
                .click();

            ST.component(panelText)
                .click();

        });

        beforeEach(function() {
            ST.button(Components.hamburgerButton(hamburgerButtons))
                .visible()
                .click();

            ST.component('menu datefield')
                .and(function(datefield){
                    ST.button('@' + datefield.getId() + '-trigger-picker')
                        .click();
                });
        });

        afterEach(function(){
            ST.component(panelText)
                .click()
        });

        /* function just for testing
        describe("separately check day and month", function(){
            var day = 27;
            var month = 2;
            var year = 1990;
            chooseMonthAndYearInDatepicker(month, year, undefined, true, true);
            chooseDayInDatepicker(day, undefined);
        });
        */

        describe("Set whole random date", function() {
            Lib.chooseDateInDatepicker(27, 2, 1990, undefined, true, true, dateMessageBoxText);
        });

        describe("Use today in calendar", function() {
            Lib.dateTodayButton(undefined, dateMessageBoxText);
        });

        describe("Set date by textField", function() {
            it('TextField in calendar is editable, clear old and write date into -inputEl', function () {
              
                //Insert string into textarea.
                ST.component('menu datefield')
                    .and(function(datefield){
                        datefield.setValue(null);
                        // ST.component('@' + datefield.getId() + '-inputEl')
                        //     .click()
                        //     .contentEmpty()
                        //     .focus()
                        //     .type('02/02/1950');


                        var fieldForPlay = [
                            { type: "tap", target: '@' + datefield.getId() + '-inputEl' },
                            { type: "type", target: '@' + datefield.getId() + '-inputEl', text: "02/02/1950" },
                            //{ type: "tap", target: panelText},
                            { type: "mousedown", target: panelText},
                            { animation: null, delay: 1000, target: "@msg-div", fn: function (done) {
                                    console.log(this.targetEl.dom.outerText);
                                    expect(this.targetEl.dom.outerText).toMatch(".*02\/02\/1950.*");
                                    done();
                                }
                            },
                            //TODO napsat BUG na mouseup and animation ignore
                            { type: "mouseup", target: panelText},
                            { type: "click", target: panelText}
                        ];

                        ST.play(fieldForPlay);
                    });

                //ST.play(fieldForPlay);
            });
            it('Control text in calendar -inputEl is still present after closing datePicker and correct date is chosen', function () {
                //Insert string into textarea.
                ST.component('menu datefield')
                    .and(function(datefield){
                        ST.component('@' + datefield.getId() + '-inputEl')
                            .and(function (editor){
                                expect(editor.rawDateText).toBe('02/02/1950');
                            });
                    });
            });
        });
    });
});

    xdescribe("Panel", function(){
        //------------------------------------------------variables-------------------------------------------------------//
        var panelText = Components.panel("Standard");
    
        //------------------------------------------------tests-----------------------------------------------------------//
        describe('Check panel', function () {
            it('Standard panel is visible', function () {
                ST.component(panelText)
                    .visible()
                    .and(function (page) {
                    expect(page.rendered).toBeTruthy();
                });
        });

    });

    describe('Drag & drop panel', function () {
        Lib.movePanelComplex(panelText, 120);
        // Lib.movePanel(panelText, 120, 1, 20);
        // Lib.movePanel(panelText, 90, -1, 20);
        // Lib.movePanel(panelText, 120, 1, 20, true);
        // Lib.movePanel(panelText, 90, -1, 20, true);
    });

    describe('Resize panel', function () {
        Lib.resizePanelComplex(panelText, 60);
        // Lib.resizePanel(panelText, 20, 1);
        // Lib.resizePanel(panelText, 20, -1);
        // Lib.resizePanel(panelText, 20, 1, true);
        // Lib.resizePanel(panelText, 20, -1, true);
    });

});