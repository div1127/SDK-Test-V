describe('Color Selector', function() {

    beforeAll(function () {
        Lib.beforeAll("#color-selector");
    });

    afterAll(function () {
        Lib.afterAll("color-selector");
    });

    describe('Initialization', function() {
        it('should have loaded Modern Color Picker', function() {
            expect(Ext.isModern).toBeTruthy();
        });
        
        it('should have #color-selector in url', function() {
            ST.getUrl(function(url) {
                expect(url).toContain('#color-selector');
            });
        });
    });
    
    describe('Color', function () {
    
        it('should have initial color as green', function () {
            ST.textField('textfield[label="HEX"]').and(function (field) {
                expect(field.getValue()).toBe('#FF0000');
            });
        });
    
        it('should sync RGB and Hue on HEX change', function () {
            ST.textField('textfield[label="HEX"]').setValue('#FF0000').and(function (field) {
                expect(field.getValue()).toBe('#FF0000');
            });
            
            ST.textField('numberfield[label="R"]').and(function (field) {
                expect(field.getValue()).toBe(255);
            });
    
            ST.textField('numberfield[label="G"]').and(function (field) {
                expect(field.getValue()).toBe(0);
            });
    
            ST.textField('numberfield[label="B"]').and(function (field) {
                expect(field.getValue()).toBe(0);
            });
    
            ST.textField('numberfield[reference="hnumberfield"]').and(function (field) {
                expect(field.getValue()).toBe(0);
            });
        });
    
        it('should sync RGB and HEX on Hue change', function () {
    
            ST.textField('numberfield[reference="hnumberfield"]').setValue(240).and(function (field) {
                expect(field.getValue()).toBe(240);
            });
    
            ST.textField('textfield[label="HEX"]').and(function (field) {
                expect(field.getValue()).toBe('#0000FF');
            });
            
            ST.textField('numberfield[label="R"]').and(function (field) {
                expect(field.getValue()).toBe(0);
            });
    
            ST.textField('numberfield[label="G"]').and(function (field) {
                expect(field.getValue()).toBe(0);
            });
    
            ST.textField('numberfield[label="B"]').and(function (field) {
                expect(field.getValue()).toBe(255);
            });
        });
        
        it('should sync Hue and HEX on RGB change', function () {
    
            ST.textField('numberfield[label="R"]').setValue(255).and(function (field) {
                expect(field.getValue()).toBe(255);
            });
    
            ST.textField('numberfield[label="G"]').setValue(255).and(function (field) {
                expect(field.getValue()).toBe(255);
            });
    
            ST.textField('numberfield[label="B"]').setValue(0).and(function (field) {
                expect(field.getValue()).toBe(0);
            });
    
            ST.textField('textfield[label="HEX"]').and(function (field) {
                expect(field.getValue()).toBe('#FFFF00');
            });
    
            ST.textField('numberfield[reference="hnumberfield"]').and(function (field) {
                expect(field.getValue()).toBe(60);
            });
        });
        
        it('should sync Color on Sauration change', function () {
    
            ST.textField('numberfield[reference="snumberfield"]').setValue(0).and(function (field) {
                expect(field.getValue()).toBe(0);
            });
    
            ST.textField('numberfield[label="R"]').and(function (field) {
                expect(field.getValue()).toBe(255);
            });
    
            ST.textField('numberfield[label="G"]').and(function (field) {
                expect(field.getValue()).toBe(255);
            });
    
            ST.textField('numberfield[label="B"]').and(function (field) {
                expect(field.getValue()).toBe(255);
            });
    
            ST.textField('textfield[label="HEX"]').and(function (field) {
                expect(field.getValue()).toBe('#FFFFFF');
            });
        });
        
        it('should sync Color on Value change', function () {
    
            ST.textField('numberfield[reference="vnumberfield"]').setValue(0).and(function (field) {
                expect(field.getValue()).toBe(0);
            });
    
            ST.textField('numberfield[label="R"]').and(function (field) {
                expect(field.getValue()).toBe(0);
            });
    
            ST.textField('numberfield[label="G"]').and(function (field) {
                expect(field.getValue()).toBe(0);
            });
    
            ST.textField('numberfield[label="B"]').and(function (field) {
                expect(field.getValue()).toBe(0);
            });
    
            ST.textField('textfield[label="HEX"]').and(function (field) {
                expect(field.getValue()).toBe('#000000');
            });
        });
    
        it("should have color preview same as selected value", function() {
            
            if (ST.browser.is.IE || ST.browser.is.Edge) {
                ST.element('>> .x-colorpreview-filter-el').and(function(el) {
                    expect(el.dom.style.backgroundColor).toBe('rgba(0, 0, 0, 1)');
                });
            }
            else {
                ST.element('>> .x-colorpreview-filter-el').and(function(el) {
                    expect(el.dom.style.backgroundColor).toBe('rgb(0, 0, 0)');
                });
            }
        });
    
        it("should have 'selected color' text color as selected ", function() {
    
            ST.textField('textfield[label="HEX"]').setValue('#000000').and(function (field) {
                ST.component('color-selector panel paneltitle').get('text').and(function() {
                    expect(this.future.data.text).toContain(field.getValue());
                });
            });
            
        });
    });
    
    describe('Color Formats', function() {
    
        var colorselector;
    
        it('should return color in RGB format', function() {
    
            colorselector = Ext.create({
                xtype: 'colorselector',
                format: 'rgb',
                value: '#00ff00'
            });
            
            expect(colorselector.getValue()).toBe('rgb(0,255,0)');
        });
    
        it('should return color in RGBA format', function() {
    
            colorselector = Ext.create({
                xtype: 'colorselector',
                format: 'rgba',
                value: '#00ff00'
            });
            
            expect(colorselector.getValue()).toBe('rgba(0,255,0,1)');
        });
    
        it('should return color in HEX8 format', function() {
    
            colorselector = Ext.create({
                xtype: 'colorselector',
                format: 'hex8',
                value: '#00ff00'
            });
            
            expect(colorselector.getValue()).toBe('00ff00ff');        
        });
        
        it('should return color in HEX format', function() {
    
            colorselector = Ext.create({
                xtype: 'colorselector',
                format: 'hex6',
                value: '#00ff00'
            });
            
            expect(colorselector.getValue()).toBe('00ff00');
        });
        
        it('should return color in HEX format by default', function() {
    
            colorselector = Ext.create({
                xtype: 'colorselector',
                value: '#00ff00'
            });
            
            expect(colorselector.getValue()).toBe('00ff00');
        });
    
        it('should have default color as ff0000', function() {
    
            colorselector = Ext.create({
                xtype: 'colorselector',
            });
            
            expect(colorselector.getValue()).toBe('ff0000');
        });
    });
    
    
    describe('Color Button', function() {
        
        it("should match swatch color to selected value", function() {
    
            if (ST.browser.is.IE || ST.browser.is.Edge) {
                ST.element('>> .x-colorbutton-filter-el').and(function(el) {
                    expect(el.dom.style.backgroundColor).toBe('rgba(0, 0, 0, 1)');
                });
            }
            else {
                ST.element('>> .x-colorbutton-filter-el').and(function(el) {
                    expect(el.dom.style.backgroundColor).toBe('rgb(0, 0, 0)');
                });
            }
        });
    });
});
