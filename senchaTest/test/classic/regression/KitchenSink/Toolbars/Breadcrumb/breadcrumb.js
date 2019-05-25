describe('breadcrumb.js', function() {
  const Breadcrumb = {
    splitButtonExtjs: function() {
      return ST.button('splitbutton[text=Ext JS]');
    },
    splitElementExtjs: function() {
      return ST.element('splitbutton[text=Ext JS] => .x-btn-arrow-el');
    },
    splitMenuExtjs: function() {
      return ST.component('menu[hidden=false]');
    },
    splitMenudd: function() {
      return ST.component('menuitem[text=dd]');
    },
    splitButtondd: function() {
      return ST.button('splitbutton[text=dd]');
    },
    splitButtonElement: function() {
      return ST.element('splitbutton[text=dd] => .x-btn-arrow-el');
    },
    splitButtonFile: function() {
      return ST.component('menuitem[text=DD.js]');
    },

    normalButtonExtjs: function() {
      return ST.button('button[text="Ext JS"][xtype="button"]');
    },
    normalElementExtjs: function() {
      return ST.element('button[text="Ext JS"][xtype="button"]');
    },
    normalButtonDefault: function() {
      return ST.component('breadcrumb[ui="default"]'+
      '[xtype="breadcrumb"][useSplitButtons="false"]'+
      'menu[ui="default"] menuitem[text="container"]');
    },
    normalButtonContainer: function() {
      return ST.button('button[text="container"][xtype="button"]');
    },
    normalMenufile: function() {
      return ST.component('menuitem[text="Container.js"]');
    },
    normalFile: function() {
      return ST.button('button[text="Container.js"]');
    },


  };

  beforeAll(function() {
    KitchenSink.app.redirectTo('#breadcrumb-toolbar');
  });

  it('Checking  splitbutton- breadscrumb Button', function() {
    Breadcrumb.splitButtonExtjs().visible();
    Breadcrumb.splitElementExtjs().click();
    Breadcrumb.splitMenuExtjs().visible();
    Breadcrumb.splitMenudd().click();
    Breadcrumb.splitButtondd().visible();
    Breadcrumb.splitButtonElement().click();
    Breadcrumb.splitMenuExtjs().visible();
    Breadcrumb.splitButtonFile().click();
  });

  it('Checking normalbutton- breadscrumb Button', function() {
    Breadcrumb.normalButtonExtjs().visible();
    Breadcrumb.normalElementExtjs().click();
    Breadcrumb.normalButtonDefault().click();
    Breadcrumb.normalButtonContainer().click();
    Breadcrumb.normalMenufile().click();
    Breadcrumb.normalFile().click();
  });
});

