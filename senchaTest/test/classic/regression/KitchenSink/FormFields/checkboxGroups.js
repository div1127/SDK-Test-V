describe('checkboxGroups', function() {
  beforeAll(function() {
    KitchenSink.app.redirectTo('#form-checkboxgroup');
  });

  const chkBox={

    saveButton: function() {
      return ST.button('button[text="Save"]');
    },
    formTittleBar: function() {
      return ST.component('title[text="Form incomplete"]');
    },
    okButton: function() {
      return ST.button('button[text="OK"]');
    },
    individualChkboxTextfield: function() {
      return ST.textField('textfield[name="txt-test1"]');
    },
    dogChkBox: function() {
      return ST.checkBox('checkboxfield[name="fav-animal-dog"]');
    },
    catChkBox: function() {
      return ST.checkBox('checkboxfield[name="fav-animal-cat"]');
    },
    resetButton: function() {
      return ST.button('button[text="Reset"]');
    },
    expandChkBox: function() {
      return ST.component('tool[ariaLabel="Expand field set"]');
    },
    chkboxGroupTextfield: function() {
      return ST.textField('textfield[name="txt-test3"][xtype="textfield"]');
    },
    pageScroller: function() {
      return ST.element('contentPanel[xtype="contentPanel"]');
    },
    item1CustomerChkBox: function() {
      return ST.checkBox('checkboxfield[boxLabel="Item 1"][name="cb-cust-1"]');
    },
    item2CustomerChkBox: function() {
      return ST.checkBox('checkboxfield[ui="default"][name="cb-cust-2"]');
    },
    item3CustomerChkBox: function() {
      return ST.checkBox('checkboxfield[name="cb-cust-3"]');
    },
    item5CustomerChkBox: function() {
      return ST.checkBox('checkboxfield[name="cb-cust-5"]');
    },
    errorMessageLocator: function() {
      return ST.component('checkboxgroup'+
      '[blankText="You must select at least one item in this group"]'+
      '[msgTarget="side"]');
    },
    item1AutoChkBox: function() {
      return ST.checkBox('checkboxfield[name="cb-auto-1"]');
    },
    item2AutoChkBox: function() {
      return ST.checkBox('checkboxfield[name="cb-auto-2"]');
    },
    item3AutoChkBox: function() {
      return ST.checkBox('checkboxfield[name="cb-auto-3"]');
    },
    item4autochkbox: function() {
      return ST.checkBox('checkboxfield[name="cb-auto-4"]');
    },
    item5AutoChkBox: function() {
      return ST.checkBox('checkboxfield[name="cb-auto-5"]');
    },
    submitTittle: function() {
      return ST.component('title[text="Submitted Values"]');
    },
    closeDialog: function() {
      return ST.component('tool[type="close"]');
    },
  };

  it('validate without checking checkbox', function() {
    chkBox.saveButton().click();
    chkBox.formTittleBar().text('Form incomplete');
    chkBox.okButton().click();
  });

  it('validate ResetButton', function() {
    chkBox.individualChkboxTextfield().type('demoTesting');
    chkBox.dogChkBox().click();
    chkBox.catChkBox().click();
    chkBox.resetButton().click();
  });

  it('validate  checkbox group  window', function() {
    chkBox.individualChkboxTextfield().type('demoTesting');
    chkBox.dogChkBox().click();
    chkBox.catChkBox().click();
    chkBox.expandChkBox().click();
    chkBox.chkboxGroupTextfield().type('checkbox groupTesting');
    chkBox.pageScroller().scroll(800, 800);
    chkBox.item1CustomerChkBox().click();
    chkBox.item2CustomerChkBox().click();
    chkBox.item3CustomerChkBox().click();
    chkBox.item5CustomerChkBox().click();
    chkBox.saveButton().click();
    chkBox.submitTittle().visible().wait(2000);
    chkBox.closeDialog().click();
  });

  it('validate error message without clicking checkbox group ', function() {
    chkBox.item1CustomerChkBox().click();
    chkBox.item2CustomerChkBox().click();
    chkBox.item3CustomerChkBox().click();
    chkBox.item5CustomerChkBox().click();
    chkBox.saveButton().click();
    chkBox.formTittleBar().text('Form incomplete');
    chkBox.okButton().click().wait(2000);
    chkBox.errorMessageLocator().visible();
  });

  it('Verify by checking and un-checking by individual check boxes',
      function() {
        chkBox.chkboxGroupTextfield()
            .type(' ').type('testing individual checkbox');

        chkBox.item1AutoChkBox().click();
        chkBox.item1AutoChkBox().checked().and(function(checked) {
          expect(checked).toBeTruthy();
        });
        chkBox.item2AutoChkBox().click().unchecked().and(function(checkBox) {
          expect(checkBox).toBeTruthy();
        });
        chkBox.item3AutoChkBox().click().checked().and(function(checkBox) {
          expect(checkBox).toBeTruthy();
        });
        chkBox.item4autochkbox().click().checked().and(function(checkBox) {
          expect(checkBox).toBeTruthy();
        });
        chkBox.item5AutoChkBox().click().checked().and(function(checkBox) {
          expect(checkBox).toBeTruthy();
        });
      });
});

