describe("EmailForm", function () {
    var Picker = {
        // will return list or picker based on device
        picker: function () {
            var pId = Ext.first('form-email combobox[label=To]').getPicker().getId();
            return ST.component('#' + pId);
        },
        pickerTrigger: function () {
            return ST.element('combobox => div.x-expandtrigger');
        },
        isPhone: function () {
            return ST.os.deviceType === 'Phone';
        },
        pickerCancelButton: function () {
            ST.button('picker:visible button[text=Cancel]').click();
        },
        pickerDoneButton: function () {
            ST.button('picker:visible button[text=Done]').click();
        },
        selectValueInPickerSlot: function (index, displayField, numberOfItemSelected) {
            if (Picker.isPhone()) {
                ST.component('pickerslot:visible[_displayField=' + displayField + ']')
                    .and(function (cmp) {
                        //need to scroll to desired item to ensure it's visible before click
                        var item = cmp.getItemAt(index);
                        item = Ext.get(item);
                        cmp.scrollToItem(item);
                        ST.element(item)
                            .click();
                        Picker.pickerDoneButton();
                    });

            } else {
                Picker.picker().visible()
                    .and(function (cmp) {
                        var model = cmp.getStore().getAt(index);
                        Lib.ghostClick('simplelistitem:nth-child(' + (index + 1) + ')', true);
                        //Lib.ghostClick('simplelistitem{getRecord().get("to").data.email==="' + name + '"}', true);
                    });
            }
        }
    };

    beforeAll(function () {
        Lib.beforeAll("#form-email");
    });

    afterAll(function () {
        Lib.afterAll("#kitchensink-view-forms-email");
    });

    afterEach(function () {
        Picker.picker().and(function (picker) { picker.hide(); });
        Ext.ComponentQuery.query('combobox')[0].clearValue();
    });

    it("should load email form correctly", function () {
        ST.component("form-email").visible().and(function (component) {
            expect(component).toBeTruthy();
        });
    });

    it("should show picker when clicked", function () {
        Picker.pickerTrigger().click()
            .and(function () {
                Picker.picker().visible();
            });
        //tear down - click Cancel on phone or click out of list on other devices
        if (Picker.isPhone()) {
            Picker.pickerCancelButton();
        } else {
            Picker.pickerTrigger().click()
        }
    });

    it("should select single value", function () {
        Picker.pickerTrigger().click()
            .and(function () {
                Picker.picker().visible();
                Picker.selectValueInPickerSlot(0, 'to');
            }).and(function () {
                var numOfChipsVisible = Ext.ComponentQuery.query("chipview")[0].el.dom.childNodes[0].children.length;
                expect(numOfChipsVisible).toBe(2);
            });
    });

    it("should select multiple value", function () {
        Picker.pickerTrigger().click()
            .and(function () {
                Picker.picker().visible();
                Picker.selectValueInPickerSlot(0, 'to');
                Picker.selectValueInPickerSlot(1, 'to');

            }).and(function () {
                var numOfChipsVisible = Ext.ComponentQuery.query("chipview")[0].el.dom.childNodes[0].children.length;
                expect(numOfChipsVisible).toBe(3);
            });
    });

    it("should clear selection", function () {
        Picker.pickerTrigger().click()
            .and(function () {
                Picker.picker().visible();
                Picker.selectValueInPickerSlot(0, 'to');
            }).and(function () {
                ST.element("//*[contains(@class,'x-close-el')]").click().and(function () {
                    expect(Ext.ComponentQuery.query('combobox')[0].getValue().length).toBe(0);
                });
            });
    });

    it("should be able to type and select", function () {
        ST.comboBox('combobox[reference=\"emailRecipient\"]').type('a').and(function () {
            Picker.selectValueInPickerSlot(0, 'to');
        }).and(function () {
            var selectedEmail = '';
            var email = "angelo@example.com";
            selectedEmail = Ext.ComponentQuery.query("chipview")[0].el.dom.childNodes[0].children[1].innerText;
            expect(selectedEmail.search(email)).toBeGreaterThan(0);
        });
    });
});
