/**
* @file TooltipsAlignOptions.js
* @name Kitchen Sink (Modern)/Components/Tooltips/TooltipsAlignOptions.js
* @author Miroslav Meca
* @created 2016/11/1
* @date 1.11.2016
* @edited 2016/12/09
* 
* Tested on: Ubuntu 16.04 (Chrome, Firefox, Opera), Android 5, 6,
*            Windows 10 Edge, iOS 8, 9 Safari (iPad)
* Passed on: All tested
*
 * @updatedBy Jiří Znoj
 * @updated 17. 5. 2017
 *
 * Tested on:
 *      desktop: Chrome 58, Edge 14, FF 53, IE 11, Opera 45
 *      tablets: Android 6, iOS 10
 *
*/

describe('Tooltip Align Options', function(){
    if( Lib.isPhone ){
        it('Example is not available on phone devices', function(){
            pending('This examples are not for mobile devices!!!');
        });
    } else {
    /**
     * Custom variables for application
     **/
    var examplePrefix = 'tip-aligning{isVisible()} ';
    var exampleUrlPostfix='#tip-aligning';
    var Tooltips = {
        /**
         * Get Component
         * @param prefix - prefix/path from XType for the component
         * @param item - XType for the item which we want
         * @param key - unique key which clearly identifies the component 
         * @param without - switch for it when we don't using examplePrefix
         * @return {ST.component}
         **/
        getComponent: function(prefix, item, key, without){
            return ST.component((without ? '' : examplePrefix) + prefix + ' '
                        + item + (key? '[' + key + ']': ''));
        },
        getField: function(prefix, item, key, without){
            return ST.field((without ? '' : examplePrefix) + prefix + ' '
                        + item + (key? '[' + key + ']': ''));
        },
        getTooltip: function(key){
            return ST.component('tooltip' + (key? '[' + key + ']' : '[_title=Confirm choice of destination]'));
        },
        getThumb: function(key){
            return ST.component('thumb[' + key + ']');
        },
        getSegmentButton: function(first, keyValue){
            return this.getComponent('toolbar segmentedbutton[id=' + Ext.ComponentQuery.query(examplePrefix + 'toolbar segmentedbutton')[(first? 0: 1)].getId() + ']',
                'button', '_text=' + (keyValue? keyValue : 'T'));
        },
        /**
         * Checked TipClass, if it is the same like expectClass
         * @param expectClass - the value which we want to compare
         **/
        isTipClass: function(expectClass, hidden){
            if(hidden){
                ST.absent('tooltip[_title=Confirm choice of destination] => div.x-anchor-el');
            } else {
                ST.element('tooltip[_title=Confirm choice of destination] => div.x-anchor-el')
                    .and(function(){
                        expect(this.future.el.dom.classList[1]).toBe(expectClass);
                    });
            }
        },
        /**
         * Checked segment buttons, if they are correct pressed
         * @param charFirst - the value which we want to compare with first group segment button
         * @param charSecond - the value which we want to compare with second group segment button
         **/
        arePressedSegmentButtons: function(charFirst, charSecond){
            this.getSegmentButton(true, charFirst)
                .and(function(){
                    expect(this.future.cmp.isPressed()).toBe(true);
                });
            this.getSegmentButton(false, charSecond)
                .wait(function(){ return this.cmp.isPressed() === true; })
                .and(function(){
                    expect(this.future.cmp.isPressed()).toBe(true);
                });
        },
        setCheckBoxWithWait: function (checked){
            return Tooltips.getComponent('toolbar', 'checkboxfield', '_label=Anchor')
                    .visible()
                    .wait(function(){ return this.cmp.isChecked() === checked});
        },
        /**
         * Group functions which checks position tooltip in the time or tooltip with button
         * @param XY1 - the position with X and Y axis
         * @param XY2 - the position with X and Y axis
         **/
        isXNotGreaterYNotLess: function(XY1, XY2){
            expect(XY1[0]).not.toBeGreaterThan(XY2[0]);
            expect(XY1[1]).not.toBeLessThan(XY2[1]);
        },
        isXNotGreaterYNotGreater: function(XY1, XY2){
            expect(XY1[0]).not.toBeGreaterThan(XY2[0]);
            expect(XY1[1]).not.toBeGreaterThan(XY2[1]);
        },
        isXNotLessYNotGreater: function(XY1, XY2){
            expect(XY1[0]).not.toBeLessThan(XY2[0]);
            expect(XY1[1]).not.toBeGreaterThan(XY2[1]);
        },
        isValueOfSlider: function(slider, value){
            slider.and(function(){
                expect(this.future.cmp.getValue()[0]).toBeGreaterThan(value-5);
                expect(this.future.cmp.getValue()[0]).toBeLessThan(value+5);
            });
        },
        closeAndReopenTooltip: function(){
            ST.element('tooltip[_title=Confirm choice of destination] => div.x-tool-type-close').click();
            this.getTooltip('').hidden();
            if (ST.os.deviceType === "Desktop") {
                ST.play([
                    {type: "mouseover", target:'[_text=Confirm selection]' }
                ]);
                }
            else {
                ST.play([
                    {type: "touchstart", target:'[_text=Confirm selection]' },
                    {type: "touchend", target:'[_text=Confirm selection]' }
                ]);
            }
            this.getTooltip('').visible();
        }
    };
    var charButtons = [ 'T', 'R', 'B', 'L'];
    beforeAll(function() {
        Lib.beforeAll(exampleUrlPostfix, examplePrefix, ST.isIE?500:200);
        Tooltips.getTooltip('').visible();
        if(ST.component('sourceoverlay panelheader paneltool').visible()){
                ST.component('sourceoverlay panelheader paneltool').click()
        }
    });
    afterAll(function(){
        Lib.afterAll(examplePrefix);
        Tooltips.getTooltip('id^=ext-tooltip')
            .and(function() {
                this.future.cmp.hide();
            });
    });
    describe('Default display UI', function(){
        it('Should load correctly', function() { 
            Lib.screenshot('UI_appMain_Tooltips_Align_Options');
        });
        it('Should be displayed correctly texts', function(){
            Tooltips.getTooltip('_title="Confirm choice of destination"').visible()
                .and(function(){
                    expect(this.future.cmp.getTitle()).toBe('Confirm choice of destination');
                    expect(this.future.cmp.getHtml()).toBe('<ul><li>Condition one.</li><li>Condition two</li><li>Condition three</li></ul>');
                });
            Tooltips.getComponent('','paneltitle[text="Draggable button with configurable tooltip"]').visible()
                .and(function(el){
                    expect(this.future.cmp.getText()).toBe('Draggable button with configurable tooltip');
                });
            Tooltips.getComponent('', 'button', '_ui=action').visible()
                .and(function(){
                    expect(this.future.cmp.getText()).toBe('Confirm selection');
                });
            Tooltips.getComponent('toolbar', 'fieldcontainer', 'label="Tip Align"').visible()
                .and(function(){
                    expect(this.future.cmp.getLabel()).toBe('Tip Align');
                });
            Tooltips.getComponent('toolbar', 'fieldcontainer', 'label="Target Align"').visible()
                .and(function(){
                    expect(this.future.cmp.getLabel()).toBe('Target Align');
                });
            Tooltips.getComponent('toolbar', 'checkboxfield').visible()
                .and(function(){
                    expect(this.future.cmp.getLabel()).toBe('Anchor');
                });
        });
        it('Default pressed Tip and Target buttons and checked Anchor', function(){
            Tooltips.getSegmentButton(true, charButtons[0])
                .and(function(){ expect(this.future.cmp.isPressed()).toBe(true); });
            Tooltips.getSegmentButton(false, charButtons[2])
                .and(function(){ expect(this.future.cmp.isPressed()).toBe(true); });
            Tooltips.getComponent('toolbar', 'checkboxfield', '_label=Anchor')
                .and(function(){ expect(this.future.cmp.isChecked()).toBe(true); });
        });
    });
    describe('Toolbar components', function(){
        var textTipClasses = [ 'x-top', 'x-right', 'x-bottom', 'x-left', 'x-hidden-display'];
        var countButtons = [];
        var beforeAlign = '';
        /**
         * waitAndSetAlign is function for waiting on change align of the tooltip
         **/
        function waitAndSetAlign(){
            Tooltips.getTooltip('').visible()
                .wait(function(){ return this.cmp.getAlign() !== beforeAlign; })
                .and(function(){
                    beforeAlign = this.future.cmp.getAlign();
                });
        }
        beforeAll(function(){
            beforeAlign = '';
            Tooltips.getTooltip('').visible();
            Tooltips.getComponent('toolbar', 'segmentedbutton', 'id=' + Ext.ComponentQuery.query(examplePrefix + 'toolbar segmentedbutton')[0].getId() )
                .and(function(){ countButtons[0] = this.future.cmp.getItems().length; });
            Tooltips.getComponent('toolbar', 'segmentedbutton', 'id=' + Ext.ComponentQuery.query(examplePrefix + 'toolbar segmentedbutton')[1].getId())
                .and(function(){ countButtons[1] = this.future.cmp.getItems().length; });
        });
        afterEach(function(){
            Tooltips.getSegmentButton(true, charButtons[0]).click();
            Tooltips.getSegmentButton(false, charButtons[2]).click();
        });
        describe('Checkbox Anchor', function(){
            beforeAll(function(){
                Tooltips.setCheckBoxWithWait(true);
            });
            beforeEach(function(){
                Tooltips.getTooltip('').visible()
                    .and(function(){
                        beforeAlign = this.future.cmp.getAlign();
                    });
            });
            afterEach(function(){
                Tooltips.setCheckBoxWithWait(true);
            });
            it('Should be changed anchor class when the tip/anchor is visible', function(){
                for (var i = 0; i < countButtons[0]; i++){
                    Tooltips.getSegmentButton(true, charButtons[i]).click();
                    for (var j = 0; j < countButtons[1]; j++){
                        Tooltips.getSegmentButton(false, charButtons[j]).click();
                        waitAndSetAlign();
                        Tooltips.isTipClass(textTipClasses[i]);
                    }
                }
            });
            it('Should not be changed anchor class when tip/anchor is hidden', function(){
                Tooltips.setCheckBoxWithWait(true).click();
                for (var i = 0; i < countButtons[0]; i++){
                    Tooltips.getSegmentButton(true, charButtons[i]).click();
                    for (var j = 0; j < countButtons[1]; j++){
                        Tooltips.getSegmentButton(false, charButtons[j]).click();
                        waitAndSetAlign();
                        Tooltips.isTipClass(textTipClasses[4], true);
                    }
                }
                Tooltips.setCheckBoxWithWait(false).click();
            });
            it('Should be correctly anchor class during changes the checkbox and buttons', function(){
                Tooltips.getSegmentButton(true, charButtons[2]).click();
                waitAndSetAlign();
                Tooltips.isTipClass(textTipClasses[2]);
                Tooltips.getSegmentButton(false, charButtons[3]).click();
                waitAndSetAlign();
                Tooltips.isTipClass(textTipClasses[2]);
                Tooltips.setCheckBoxWithWait(true).click();
                Tooltips.isTipClass(textTipClasses[4], true);
                Tooltips.getSegmentButton(true, charButtons[1]).click();
                waitAndSetAlign();
                Tooltips.isTipClass(textTipClasses[4], true);
                Tooltips.getSegmentButton(false, charButtons[0]).click();
                waitAndSetAlign();
                Tooltips.isTipClass(textTipClasses[4], true);
                Tooltips.setCheckBoxWithWait(false).click();
                Tooltips.isTipClass(textTipClasses[1]);
            });
        });
        describe('Segment Buttons', function(){
            var positionButtonXY = [];
            beforeAll(function(){
                Tooltips.getComponent('', 'button', '_text=Confirm selection', '') 
                    .and(function(){ positionButtonXY = this.future.el.getXY(); });
            });
            beforeEach(function(){
                Tooltips.getTooltip('').visible()
                    .and(function(){
                        beforeAlign = '';
                    });
            });
            it('Should be correctly default pressed buttons', function(){
                for (var i = 0; i < countButtons[0]; i++){
                    Tooltips.getSegmentButton(true, charButtons[i]).click();
                    waitAndSetAlign();
                    Tooltips.arePressedSegmentButtons(charButtons[i], charButtons[(i+2)%4]);
                }
            });
            it('Should be changed pressed Tip and Target buttons', function(){
                Tooltips.getSegmentButton(true, charButtons[1]).click();
                waitAndSetAlign();
                Tooltips.arePressedSegmentButtons(charButtons[1], charButtons[3]);
                Tooltips.getSegmentButton(false, charButtons[0]).click();
                waitAndSetAlign();
                Tooltips.arePressedSegmentButtons(charButtons[1], charButtons[0]);
                Tooltips.getSegmentButton(false, charButtons[2]).click();
                waitAndSetAlign();
                Tooltips.arePressedSegmentButtons(charButtons[1], charButtons[2]);
                Tooltips.getSegmentButton(true, charButtons[3]).click();
                waitAndSetAlign();
                Tooltips.arePressedSegmentButtons(charButtons[3], charButtons[1]);
                Tooltips.getSegmentButton(false, charButtons[3]).click();
                waitAndSetAlign();
                Tooltips.arePressedSegmentButtons(charButtons[3], charButtons[3]);
            });
            it('Should be changed tool location after click Tips buttons', function(){
                // Compare X/Y axis (positions) between tooltip and button
                var XY = [[], []];
                Tooltips.getSegmentButton(true, charButtons[0]).click();
                Tooltips.getTooltip('').visible()
                    .wait(function(){ return this.cmp.getAlign() === 't50-b50?'})
                    .and(function(){
                        XY[0] = [this.future.cmp.getX(), this.future.cmp.getY() ];
                        Tooltips.isXNotGreaterYNotLess(XY[0], positionButtonXY);
                    });
                Tooltips.getSegmentButton(true, charButtons[1]).click();
                Tooltips.getTooltip('').visible()
                    .wait(function(){ return this.cmp.getAlign() === 'r50-l50?'})
                    .and(function(){
                        XY[1] = [this.future.cmp.getX(), this.future.cmp.getY() ];
                        Tooltips.isXNotGreaterYNotGreater(XY[1], positionButtonXY);
                    });
                Tooltips.getSegmentButton(true, charButtons[2]).click();
                Tooltips.getTooltip('').visible()
                    .wait(function(){ return this.cmp.getAlign() === 'b50-t50?'})
                    .and(function(){
                        XY[2] = [this.future.cmp.getX(), this.future.cmp.getY() ];
                        Tooltips.isXNotGreaterYNotGreater(XY[2], positionButtonXY);
                    });
                Tooltips.getSegmentButton(true, charButtons[3]).click();
                Tooltips.getTooltip('').visible()
                    .wait(function(){ return this.cmp.getAlign() === 'l50-r50?'})
                    .and(function(){
                        XY[3] = [this.future.cmp.getX(), this.future.cmp.getY() ];
                        Tooltips.isXNotLessYNotGreater(XY[3], positionButtonXY);
                    })
                    .and(function(){
                        // Compare X/Y axis (positions) from all place tooltip and checked whether have correct relation
                        Tooltips.isXNotGreaterYNotLess(XY[0], XY[2]);
                        Tooltips.isXNotGreaterYNotGreater(XY[1], XY[3]);
                        Tooltips.isXNotGreaterYNotLess(XY[0], XY[3]);
                        Tooltips.isXNotGreaterYNotLess(XY[1], XY[2]);
                    });
            });
            it('EXTJS-25197 Should be changed tool location after click Targets buttons', function(){
                // Compare X/Y axis (positions) between tooltip and button
                var XY = [[],[]];
                Tooltips.getTooltip('').visible()
                    .wait(function(){ return this.cmp.getAlign() === 't50-b50?';})
                    .and(function(){
                        beforeAlign = this.future.cmp.getAlign();
                    });
                Tooltips.getSegmentButton(false, charButtons[0]).click();
                waitAndSetAlign();
                Tooltips.getTooltip('').visible()
                    .and(function(){
                        XY[0] = [this.future.cmp.getX(), this.future.cmp.getY() ];
                        //EXTJS-25197
                        Tooltips.isXNotGreaterYNotLess(XY[0], positionButtonXY);
                    });
                Tooltips.getSegmentButton(false, charButtons[1]).click();
                waitAndSetAlign();
                Tooltips.getTooltip('').visible()
                    .and(function(){
                        XY[1] = [this.future.cmp.getX(), this.future.cmp.getY() ];
                        Tooltips.isXNotGreaterYNotLess(XY[1], positionButtonXY);
                    });
                Tooltips.getSegmentButton(false, charButtons[2]).click();
                waitAndSetAlign();
                Tooltips.getTooltip('').visible()
                    .and(function(){
                        XY[2] = [this.future.cmp.getX(), this.future.cmp.getY() ];
                        Tooltips.isXNotGreaterYNotLess(XY[2], positionButtonXY);
                    });
                Tooltips.getSegmentButton(false, charButtons[3]).click();
                waitAndSetAlign();
                Tooltips.getTooltip('').visible()
                    .and(function(){
                        XY[3] = [this.future.cmp.getX(), this.future.cmp.getY() ];
                        Tooltips.isXNotGreaterYNotLess(XY[3], positionButtonXY);
                    })
                    .and(function(){
                        // Compare X/Y axis (positions) from all place tooltip and checked whether have correct relation
                        Tooltips.isXNotLessYNotGreater(XY[0], XY[2]);
                        Tooltips.isXNotLessYNotGreater(XY[1], XY[3]);
                        Tooltips.isXNotLessYNotGreater(XY[0], XY[3]);
                        Tooltips.isXNotLessYNotGreater(XY[1], XY[2]);
                    });
                // Generate random number between from 1 to 3, this number will use as index
                Tooltips.getSegmentButton(true, charButtons[ (Math.round((Math.random() * (3 - 1)))+1) ]).click();
                Tooltips.getSegmentButton(false, charButtons[0]).click();
                waitAndSetAlign();
                Tooltips.getTooltip('').visible()
                    .and(function(){
                        XY[0] = [this.future.cmp.getX(), this.future.cmp.getY() ];
                    });
                Tooltips.getSegmentButton(false, charButtons[1]).click();
                waitAndSetAlign();
                Tooltips.getTooltip('').visible()
                    .and(function(){
                        XY[1] = [this.future.cmp.getX(), this.future.cmp.getY() ];
                    });
                Tooltips.getSegmentButton(false, charButtons[2]).click();
                waitAndSetAlign();
                Tooltips.getTooltip('').visible()
                    .and(function(){
                        XY[2] = [this.future.cmp.getX(), this.future.cmp.getY() ];
                    });
                Tooltips.getSegmentButton(false, charButtons[3]).click();
                waitAndSetAlign();
                Tooltips.getTooltip('').visible()
                    .and(function(){
                        XY[3] = [this.future.cmp.getX(), this.future.cmp.getY() ];
                    })
                    .and(function(){
                        // Compare X/Y axis (positions) from all place tooltip and checked whether have correct relation
                        Tooltips.isXNotGreaterYNotGreater(XY[0], XY[2]);
                        Tooltips.isXNotLessYNotGreater(XY[1], XY[3]);
                        Tooltips.isXNotLessYNotGreater(XY[0], XY[3]);
                        Tooltips.isXNotLessYNotGreater(XY[1], XY[2]);
                    });
            });
        });
        describe('Slider Field', function(){
            var sliderfields = [];
            var thumbs = [];
            beforeAll(function(){
                sliderfields[0] = Tooltips.getComponent('toolbar', 'sliderfield', 'id=' + Ext.ComponentQuery.query(examplePrefix + 'toolbar sliderfield')[0].getId() );
                sliderfields[1] = Tooltips.getComponent('toolbar', 'sliderfield', 'id=' + Ext.ComponentQuery.query(examplePrefix + 'toolbar sliderfield')[1].getId() );
                thumbs[0] = Tooltips.getThumb( 'id=' + Ext.ComponentQuery.query(examplePrefix + 'toolbar sliderfield thumb')[0].getId() );
                thumbs[1] = Tooltips.getThumb( 'id=' + Ext.ComponentQuery.query(examplePrefix + 'toolbar sliderfield thumb')[1].getId() );
            });
            afterEach(function(){
                sliderfields[0].click(sliderfields[0].el.dom.clientWidth*0.5 + 20) ;
                sliderfields[1].click(sliderfields[1].el.dom.clientWidth*0.5 + 20);
            });
            describe('Clicks on sliderfields', function(){
                it('Should click at the values Tip[R]=50 and Target[T]=0,50,100', function(){
                    var position = [[],[]];
                    Tooltips.getSegmentButton(true, charButtons[1]).click();
                    Tooltips.getSegmentButton(false, charButtons[0]).click();
                    Tooltips.getTooltip('').visible()
                        .wait(function(){
                            return this.cmp.getAlign().match(/r([4-5]\d)?-t([4-5]\d)?\??/g);
                        })
                        .and(function(){
                            position[0] = [this.future.cmp.getX(), this.future.cmp.getY() ];
                        });
                    Tooltips.isValueOfSlider(sliderfields[0], 50);
                    sliderfields[1].click(50);
                    Tooltips.isValueOfSlider(sliderfields[1], 0);
                    Tooltips.getTooltip('').visible()
                        .wait(function(){ return this.cmp.getX() != position[0][0]; })
                        .and(function(){
                            position[1] = [this.future.cmp.getX(), this.future.cmp.getY() ];
                            expect(position[1][0]).toBeLessThan(position[0][0]);
                            expect(position[1][1]).toBe(position[0][1]);
                    });
                    sliderfields[1].click(sliderfields[1].el.dom.clientWidth*0.5 + 20);
                    Tooltips.isValueOfSlider(sliderfields[1], 50);
                    Tooltips.getTooltip('').visible()
                        .wait(function(){ 
                            return this.cmp.getX() != position[1][0]; })
                        .and(function(){
                            position[2] = [this.future.cmp.getX(), this.future.cmp.getY() ];
                            expect(position[2][0]).toBe(position[0][0]);
                            expect(position[2][1]).toBe(position[0][1]);
                            expect(position[2][0]).toBeGreaterThan(position[1][0]);
                            expect(position[2][1]).toBe(position[1][1]);
                    });
                    sliderfields[1].click(sliderfields[1].el.dom.clientWidth-1);
                    Tooltips.isValueOfSlider(sliderfields[1], 100);
                    Tooltips.getTooltip('').visible()
                        .wait(function(){ return this.cmp.getX() != position[2][0]; })
                        .and(function(){
                            position[3] = [this.future.cmp.getX(), this.future.cmp.getY() ];
                            expect(position[3][0]).toBeGreaterThan(position[0][0]);
                            expect(position[3][1]).toBe(position[0][1]);
                            expect(position[3][0]).toBeGreaterThan(position[2][0]);
                            expect(position[3][1]).toBe(position[2][1]);
                    });
                });
                it('Should click at the values Tip[R]=0,50,100 and Target[T]=50', function(){
                    var position = [[],[]];
                    Tooltips.getSegmentButton(true, charButtons[1]).click();
                    Tooltips.getSegmentButton(false, charButtons[0]).click();
                    Tooltips.getTooltip('').visible()
                        .wait(function(){
                            return this.cmp.getAlign().match(/r([4-5]\d)?-t([4-5]\d)?\??/g);
                        })
                        .and(function(){
                            position[0] = [this.future.cmp.getX(), this.future.cmp.getY() ];
                        });
                    Tooltips.isValueOfSlider(sliderfields[1], 50);
                    sliderfields[0].click(50);
                    Tooltips.isValueOfSlider(sliderfields[0], 0);
                    Tooltips.getTooltip('').visible()
                        .wait(function(){ return this.cmp.getY() != position[0][1]; })
                        .and(function(){
                            position[1] = [this.future.cmp.getX(), this.future.cmp.getY() ];
                            expect(position[1][0]).toBe(position[0][0]);
                            expect(position[1][1]).toBeGreaterThan(position[0][1]);
                    });
                    sliderfields[0].click(sliderfields[0].el.dom.clientWidth*0.5 + 20);
                    Tooltips.isValueOfSlider(sliderfields[0], 50);
                    Tooltips.getTooltip('').visible()
                        .wait(function(){ return this.cmp.getY() != position[1][1]; })
                        .and(function(){
                            position[2] = [this.future.cmp.getX(), this.future.cmp.getY() ];
                            expect(position[2][0]).toBe(position[0][0]);
                            expect(position[2][1]).toBe(position[0][1]);
                            expect(position[2][0]).toBe(position[1][0]);
                            expect(position[2][1]).toBeLessThan(position[1][1]);
                    });
                    sliderfields[0].click(sliderfields[0].el.dom.clientWidth-5);
                    Tooltips.isValueOfSlider(sliderfields[0], 100);
                    Tooltips.getTooltip('').visible()
                        .wait(function(){ return this.cmp.getY() != position[2][1]; })
                        .and(function(){
                            position[3] = [this.future.cmp.getX(), this.future.cmp.getY() ];
                            expect(position[3][0]).toBe(position[0][0]);
                            expect(position[3][1]).toBeLessThan(position[0][1]);
                            expect(position[3][0]).toBe(position[2][0]);
                            expect(position[3][1]).toBeLessThan(position[2][1]);
                    });
                });
                it('Should click at the values Tip[R]=50 and Target[R]=0,50,100', function(){
                    var position = [[],[]];
                    Tooltips.getSegmentButton(true, charButtons[1]).click();
                    Tooltips.getSegmentButton(false, charButtons[1]).click();
                    Tooltips.getTooltip('').visible()
                        .wait(function(){
                            return this.cmp.getAlign().match(/r([4-5]\d)?-r([4-5]\d)?\??/g);
                        })
                        .and(function(){
                            position[0] = [this.future.cmp.getX(), this.future.cmp.getY() ];
                        });
                    Tooltips.isValueOfSlider(sliderfields[0], 50);
                    sliderfields[1].click(50);
                    Tooltips.isValueOfSlider(sliderfields[1], 0);
                    Tooltips.getTooltip('').visible()
                        .wait(function(){ return this.cmp.getY() != position[0][1]; })
                        .and(function(){
                            position[1] = [this.future.cmp.getX(), this.future.cmp.getY() ];
                            expect(position[1][0]).toBe(position[0][0]);
                            expect(position[1][1]).toBeLessThan(position[0][1]);
                    });
                    sliderfields[1].click(sliderfields[1].el.dom.clientWidth*0.5+20);
                    Tooltips.isValueOfSlider(sliderfields[1], 50);
                    Tooltips.getTooltip('').visible()
                        .wait(function(){ return this.cmp.getY() != position[1][1]; })
                        .and(function(){
                            position[2] = [this.future.cmp.getX(), this.future.cmp.getY() ];
                            expect(position[2][0]).toBe(position[0][0]);
                            expect(position[2][1]).toBe(position[0][1]);
                            expect(position[2][0]).toBe(position[1][0]);
                            expect(position[2][1]).toBeGreaterThan(position[1][1]);
                    });
                    sliderfields[1].click(sliderfields[1].el.dom.clientWidth-5);
                    Tooltips.isValueOfSlider(sliderfields[1], 100);
                    Tooltips.getTooltip('').visible()
                        .wait(function(){ return this.cmp.getY() != position[2][1]; })
                        .and(function(){
                            position[3] = [this.future.cmp.getX(), this.future.cmp.getY() ];
                            expect(position[3][0]).toBe(position[0][0]);
                            expect(position[3][1]).toBeGreaterThan(position[0][1]);
                            expect(position[3][0]).toBe(position[2][0]);
                            expect(position[3][1]).toBeGreaterThan(position[2][1]);
                    });
                });
                it('Should click at the values Tip[R]=0,50,100 and Target[R]=50', function(){
                    var position = [[],[]];
                    Tooltips.getSegmentButton(true, charButtons[1]).click();
                    Tooltips.getSegmentButton(false, charButtons[1]).click();
                    Tooltips.getTooltip('').visible()
                        .wait(function(){
                            return this.cmp.getAlign().match(/r([4-5]\d)?-r([4-5]\d)?\??/g);
                        })
                        .and(function(){
                            position[0] = [this.future.cmp.getX(), this.future.cmp.getY() ];
                        });
                    Tooltips.isValueOfSlider(sliderfields[1], 50);
                    sliderfields[0].click(50);
                    Tooltips.isValueOfSlider(sliderfields[0], 0);
                    Tooltips.getTooltip('').visible()
                        .wait(function(){ return this.cmp.getY() != position[0][1]; })
                        .and(function(){
                            position[1] = [this.future.cmp.getX(), this.future.cmp.getY() ];
                            expect(position[1][0]).toBe(position[0][0]);
                            expect(position[1][1]).toBeGreaterThan(position[0][1]);
                    });
                    sliderfields[0].click(sliderfields[0].el.dom.clientWidth*0.5+20);
                    Tooltips.isValueOfSlider(sliderfields[0], 50);
                    Tooltips.getTooltip('').visible()
                        .wait(function(){ return this.cmp.getY() != position[1][1]; })
                        .and(function(){
                            position[2] = [this.future.cmp.getX(), this.future.cmp.getY() ];
                            expect(position[2][0]).toBe(position[0][0]);
                            expect(position[2][1]).toBe(position[0][1]);
                            expect(position[2][0]).toBe(position[1][0]);
                            expect(position[2][1]).toBeLessThan(position[1][1]);
                    });
                    sliderfields[0].click(sliderfields[0].el.dom.clientWidth-5);
                    Tooltips.isValueOfSlider(sliderfields[0], 100);
                    Tooltips.getTooltip('').visible()
                        .wait(function(){ return this.cmp.getY() != position[2][1]; })
                        .and(function(){
                            position[3] = [this.future.cmp.getX(), this.future.cmp.getY() ];
                            expect(position[3][0]).toBe(position[0][0]);
                            expect(position[3][1]).toBeLessThan(position[0][1]);
                            expect(position[3][0]).toBe(position[2][0]);
                            expect(position[3][1]).toBeLessThan(position[2][1]);
                    });
                });
            });
            describe('Drags on sliderfields', function(){
                it('Should drag at the values Tip[T]=50 and Target[B]=0,50,100', function(){
                    var position = [[],[]];
                    Tooltips.getSegmentButton(true, charButtons[0]).click();
                    Tooltips.getSegmentButton(false, charButtons[2]).click();
                    Tooltips.getTooltip('').visible()
                        .wait(function(){
                            return this.cmp.getAlign().match(/t([4-5]\d)?-b([4-5]\d)?\??/g);
                        })
                        .and(function(){
                            position[0] = [this.future.cmp.getX(), this.future.cmp.getY() ];
                        });
                    Tooltips.isValueOfSlider(sliderfields[0], 50);
                    thumbs[1].and(function(){ Lib.DnD.dragBy(this.future.cmp, -sliderfields[1].el.dom.clientWidth*0.5, 0); });
                    Lib.waitOnAnimations();
                    sliderfields[1].wait(function(){
                        return this.cmp.getValue()[0] < 6;
                    });
                    Tooltips.isValueOfSlider(sliderfields[1], 0);
                    Tooltips.getTooltip('').visible()
                        .wait(function(){ return this.cmp.getX() != position[0][0]; })
                        .and(function(){
                            position[1] = [this.future.cmp.getX(), this.future.cmp.getY() ];
                        });

                    thumbs[1].and(function(){ Lib.DnD.dragBy(this.future.cmp, sliderfields[1].el.dom.clientWidth*0.5-25, 0); });
                    Tooltips.isValueOfSlider(sliderfields[1], 50);
                    Tooltips.getTooltip('').visible()
                        .wait(function(){ return this.cmp.getX() != position[1][0]; })
                        .and(function(){
                            position[2] = [this.future.cmp.getX(), this.future.cmp.getY() ];
                        });

                    thumbs[1].and(function(){ Lib.DnD.dragBy(this.future.cmp, sliderfields[1].el.dom.clientWidth*0.5+10, 0); });
                    Tooltips.isValueOfSlider(sliderfields[1], 100);
                    Tooltips.getTooltip('').visible()
                        .wait(function(){ return this.cmp.getX() != position[2][0]; });

                });
                it('Should drag at the values Tip[T]=0,50,100 and Target[B]=50', function(){
                    var position = [[],[]];
                    Tooltips.getSegmentButton(true, charButtons[0]).click();
                    Tooltips.getSegmentButton(false, charButtons[2]).click();
                    Tooltips.getTooltip('').visible()
                        .wait(function(){
                            return this.cmp.getAlign().match(/t([4-5]\d)?-b([4-5]\d)?\??/g);
                        })
                        .and(function(){
                            position[0] = [this.future.cmp.getX(), this.future.cmp.getY() ];
                        });
                    Tooltips.isValueOfSlider(sliderfields[1], 50);
                    thumbs[0].and(function(){ Lib.DnD.dragBy(this.future.cmp, -sliderfields[0].el.dom.clientWidth*0.5, 0); });
                    sliderfields[0].wait(function(){
                        return this.cmp.getValue()[0] < 6;
                    });
                    Tooltips.isValueOfSlider(sliderfields[0], 0);
                    Tooltips.getTooltip('').visible()
                        .wait(function(){ return this.cmp.getX() != position[0][0]; })
                        .and(function(){
                            position[1] = [this.future.cmp.getX(), this.future.cmp.getY() ];
                        });

                    thumbs[0].and(function(){ Lib.DnD.dragBy(this.future.cmp, sliderfields[0].el.dom.clientWidth*0.5-30, 0); });
                    Tooltips.isValueOfSlider(sliderfields[0], 50);
                    Tooltips.getTooltip('').visible()
                        .wait(function(){ return this.cmp.getX() != position[1][0]; })
                        .and(function(){
                            position[2] = [this.future.cmp.getX(), this.future.cmp.getY() ];
                        });

                    thumbs[0].and(function(){ Lib.DnD.dragBy(this.future.cmp, sliderfields[0].el.dom.clientWidth*0.5+10, 0); });
                    Tooltips.isValueOfSlider(sliderfields[0], 100);
                    Tooltips.getTooltip('').visible()
                        .wait(function(){ return this.cmp.getX() != position[2][0]; });

                });
                it('Should drag at the values Tip[T]=50 and Target[L]=0,50,100', function(){
                    var position = [[],[]];
                    Tooltips.getSegmentButton(true, charButtons[0]).click();
                    Tooltips.getSegmentButton(false, charButtons[3]).click();
                    Tooltips.getTooltip('').visible()
                        .wait(function(){
                            return this.cmp.getAlign().match(/t([4-5]\d)?-l([4-5]\d)?\??/g);
                        })
                        .and(function(){
                            position[0] = [this.future.cmp.getX(), this.future.cmp.getY() ];
                        });
                    Tooltips.isValueOfSlider(sliderfields[0], 50);
                    thumbs[1].and(function(){ Lib.DnD.dragBy(this.future.cmp, -sliderfields[1].el.dom.clientWidth*0.5, 0); });
                    sliderfields[1].wait(function(){
                        return this.cmp.getValue()[0] < 6;
                    });
                    Tooltips.isValueOfSlider(sliderfields[1], 0);
                    Tooltips.getTooltip('').visible()
                        .wait(function(){ return this.cmp.getY() != position[0][1]; })
                        .and(function(){
                            position[1] = [this.future.cmp.getX(), this.future.cmp.getY() ];
                        });

                    thumbs[1].and(function(){ Lib.DnD.dragBy(this.future.cmp, sliderfields[1].el.dom.clientWidth*0.5-30, 0); });
                    Tooltips.isValueOfSlider(sliderfields[1], 50);
                    Tooltips.getTooltip('').visible()
                        .wait(function(){ return this.cmp.getY() != position[1][1]; })
                        .and(function(){
                            position[2] = [this.future.cmp.getX(), this.future.cmp.getY() ];
                        });

                    thumbs[1].and(function(){ Lib.DnD.dragBy(this.future.cmp, sliderfields[1].el.dom.clientWidth*0.5+10, 0); });
                    Tooltips.isValueOfSlider(sliderfields[1], 100);
                    Tooltips.getTooltip('').visible()
                        .wait(function(){ return this.cmp.getY() != position[2][1]; });
                });
                it('Should drag at the values Tip[T]=0,50,100 and Target[L]=50', function(){
                    var position = [[],[]];
                    Tooltips.getSegmentButton(true, charButtons[0]).click();
                    Tooltips.getSegmentButton(false, charButtons[3]).click();
                    Tooltips.getTooltip('').visible()
                        .wait(function(){
                            return this.cmp.getAlign().match(/t([4-5]\d)?-l([4-5]\d)?\??/g);
                        })
                        .and(function(){
                            position[0] = [this.future.cmp.getX(), this.future.cmp.getY() ];
                        });
                    Tooltips.isValueOfSlider(sliderfields[1], 50);
                    thumbs[0].and(function(){ Lib.DnD.dragBy(this.future.cmp, -sliderfields[0].el.dom.clientWidth*0.5, 0); });
                    sliderfields[0].wait(function(){
                        return this.cmp.getValue()[0] < 6;
                    });
                    Tooltips.isValueOfSlider(sliderfields[0], 0);
                    Tooltips.getTooltip('').visible()
                        .wait(function(){ return this.cmp.getX() != position[0][0]; })
                        .and(function(){
                            position[1] = [this.future.cmp.getX(), this.future.cmp.getY() ];
                        });

                    thumbs[0].and(function(){ Lib.DnD.dragBy(this.future.cmp, sliderfields[0].el.dom.clientWidth*0.5-30, 0); });
                    Tooltips.isValueOfSlider(sliderfields[0], 50);
                    Tooltips.getTooltip('').visible()
                        .wait(function(){ return this.cmp.getX() != position[1][0]; })
                        .and(function(){
                            position[2] = [this.future.cmp.getX(), this.future.cmp.getY() ];
                        });

                    thumbs[0].and(function(){ Lib.DnD.dragBy(this.future.cmp, sliderfields[0].el.dom.clientWidth*0.5+10, 0); });
                    Tooltips.isValueOfSlider(sliderfields[0], 100);
                    Tooltips.getTooltip('').visible()
                        .wait(function(){ return this.cmp.getX() != position[2][0]; });
                });
            });
        });
        /**
         * Some themes allow you to close the door.
         * However when user hover over with mouse on the tootlip button so tooltip moving don't have to work correctly.
         **/
        describe('Close tooltip and again open', function(){
            var sliderfields = [];
            var thumbs = [];
            beforeAll(function(){
                sliderfields[0] = Tooltips.getComponent('toolbar', 'sliderfield', 'id=' + Ext.ComponentQuery.query(examplePrefix + 'toolbar sliderfield')[0].getId() );
                sliderfields[1] = Tooltips.getComponent('toolbar', 'sliderfield', 'id=' + Ext.ComponentQuery.query(examplePrefix + 'toolbar sliderfield')[1].getId() );
                thumbs[0] = Tooltips.getThumb( 'id=' + Ext.ComponentQuery.query(examplePrefix + 'toolbar sliderfield thumb')[0].getId() );
                thumbs[1] = Tooltips.getThumb( 'id=' + Ext.ComponentQuery.query(examplePrefix + 'toolbar sliderfield thumb')[1].getId() );
            });
            beforeEach(function(){
                if(Lib.isTablet){
                    pending('EXTJS-22963');
                }
                Tooltips.closeAndReopenTooltip();
            });
            afterEach(function(){
                sliderfields[0].click(sliderfields[0].el.dom.clientWidth*0.5 + 20);
                sliderfields[1].click(sliderfields[1].el.dom.clientWidth*0.5 + 20);
            });
            it('Should be close and open tooltip', function(){
                if(Lib.isTablet){
                    pending('EXTJS-22963');
                }
                ST.element('tooltip[_title=Confirm choice of destination] => div.x-tool-type-close').click();
                Tooltips.getTooltip('').hidden().and(function(){
                    expect(this.future.cmp.isHidden()).toBe(true);
                });
                if (ST.os.deviceType === "Desktop") {
                    ST.play([
                        {type: "mouseover", target:'[_text=Confirm selection]' }
                    ]);
                }
                else {
                    ST.play([
                        {type: "touchstart", target:'[_text=Confirm selection]' },
                        {type: "touchend", target:'[_text=Confirm selection]' }
                    ]);
                }
                Tooltips.getTooltip('').visible().and(function(){
                    expect(this.future.cmp.isHidden()).toBe(false);
                });
            });
            it('Should click at the values Tip[R]=50 and Target[T]=0,50,100', function(){
                var position = [[],[]];
                Tooltips.getSegmentButton(true, charButtons[1]).click();
                Tooltips.getSegmentButton(false, charButtons[0]).click();
                Tooltips.getTooltip('').visible()
                    .wait(function(){
                        return this.cmp.getAlign().match(/r([4-5]\d)?-t([4-5]\d)?\??/g);
                    })
                    .and(function(){
                        position[0] = [this.future.cmp.getX(), this.future.cmp.getY() ];
                    });
                Tooltips.isValueOfSlider(sliderfields[0], 50);
                sliderfields[1].click(50);
                Tooltips.isValueOfSlider(sliderfields[1], 0);
                Tooltips.getTooltip('').visible()
                    .wait(function(){ return this.cmp.getX() != position[0][0]; })
                    .and(function(){
                        position[1] = [this.future.cmp.getX(), this.future.cmp.getY() ];
                        expect(position[1][0]).toBeLessThan(position[0][0]);
                        expect(position[1][1]).toBe(position[0][1]);
                });
                sliderfields[1].click(sliderfields[1].el.dom.clientWidth*0.5 + 20);
                Tooltips.isValueOfSlider(sliderfields[1], 50);
                Tooltips.getTooltip('').visible()
                    .wait(function(){ return this.cmp.getX() != position[1][0]; })
                    .and(function(){
                        position[2] = [this.future.cmp.getX(), this.future.cmp.getY() ];
                        expect(position[2][0]).toBe(position[0][0]);
                        expect(position[2][1]).toBe(position[0][1]);
                        expect(position[2][0]).toBeGreaterThan(position[1][0]);
                        expect(position[2][1]).toBe(position[1][1]);
                });
                sliderfields[1].click(sliderfields[1].el.dom.clientWidth-5);
                Tooltips.isValueOfSlider(sliderfields[1], 100);
                Tooltips.getTooltip('').visible()
                    .wait(function(){ return this.cmp.getX() != position[2][0]; })
                    .and(function(){
                        position[3] = [this.future.cmp.getX(), this.future.cmp.getY() ];
                        expect(position[3][0]).toBeGreaterThan(position[0][0]);
                        expect(position[3][1]).toBe(position[0][1]);
                        expect(position[3][0]).toBeGreaterThan(position[2][0]);
                        expect(position[3][1]).toBe(position[2][1]);
                });
            });
            it('Should click at the values Tip[R]=0,50,100 and Target[T]=50', function(){
                var position = [[],[]];
                Tooltips.getSegmentButton(true, charButtons[1]).click();
                Tooltips.getSegmentButton(false, charButtons[0]).click();
                Tooltips.getTooltip('').visible()
                    .wait(function(){
                        return this.cmp.getAlign().match(/r([4-5]\d)?-t([4-5]\d)?\??/g);
                    })
                    .and(function(){
                        position[0] = [this.future.cmp.getX(), this.future.cmp.getY() ];
                    });
                Tooltips.isValueOfSlider(sliderfields[1], 50);
                sliderfields[0].click(50);
                Tooltips.isValueOfSlider(sliderfields[0], 0);
                Tooltips.getTooltip('').visible()
                    .wait(function(){ return this.cmp.getY() != position[0][1]; })
                    .and(function(){
                        position[1] = [this.future.cmp.getX(), this.future.cmp.getY() ];
                        expect(position[1][0]).toBe(position[0][0]);
                        expect(position[1][1]).toBeGreaterThan(position[0][1]);
                });
                sliderfields[0].click(sliderfields[0].el.dom.clientWidth*0.5 + 20) ;
                Tooltips.isValueOfSlider(sliderfields[0], 50);
                Tooltips.getTooltip('').visible()
                    .wait(function(){ return this.cmp.getY() != position[1][1]; })
                    .and(function(){
                        position[2] = [this.future.cmp.getX(), this.future.cmp.getY() ];
                        expect(position[2][0]).toBe(position[0][0]);
                        expect(position[2][1]).toBe(position[0][1]);
                        expect(position[2][0]).toBe(position[1][0]);
                        expect(position[2][1]).toBeLessThan(position[1][1]);
                });
                sliderfields[0].click(sliderfields[0].el.dom.clientWidth-5);
                Tooltips.isValueOfSlider(sliderfields[0], 100);
                Tooltips.getTooltip('').visible()
                    .wait(function(){ return this.cmp.getY() != position[2][1]; })
                    .and(function(){
                        position[3] = [this.future.cmp.getX(), this.future.cmp.getY() ];
                        expect(position[3][0]).toBe(position[0][0]);
                        expect(position[3][1]).toBeLessThan(position[0][1]);
                        expect(position[3][0]).toBe(position[2][0]);
                        expect(position[3][1]).toBeLessThan(position[2][1]);
                });
            });
            it('Should drag at the values Tip[T]=50 and Target[L]=0,50,100', function(){
                var position = [[],[]];
                Tooltips.getSegmentButton(true, charButtons[0]).click();
                Tooltips.getSegmentButton(false, charButtons[3]).click();
                Tooltips.getTooltip('').visible()
                    .wait(function(){
                        return this.cmp.getAlign().match(/t([4-5]\d)?-l([4-5]\d)?\??/g);
                    })
                    .and(function(){
                        position[0] = [this.future.cmp.getX(), this.future.cmp.getY() ];
                    });
                Tooltips.isValueOfSlider(sliderfields[0], 50);
                thumbs[1].and(function(){ Lib.DnD.dragBy(this.future.cmp, -sliderfields[0].el.dom.clientWidth*0.50, 0); });
                sliderfields[1].wait(function(){
                    return this.cmp.getValue()[0] < 6;
                });
                Tooltips.isValueOfSlider(sliderfields[1], 0);
                Tooltips.getTooltip('').visible()
                    .wait(function(){ return this.cmp.getY() != position[0][1]; })
                    .and(function(){
                        position[1] = [this.future.cmp.getX(), this.future.cmp.getY() ];
                    });

                thumbs[1].and(function(){ Lib.DnD.dragBy(this.future.cmp, sliderfields[0].el.dom.clientWidth*0.5-85,
                     0); });
                Tooltips.isValueOfSlider(sliderfields[1], 50);
                Tooltips.getTooltip('').visible()
                    .wait(function(){ return this.cmp.getY() != position[1][1]; })
                    .and(function(){
                        position[2] = [this.future.cmp.getX(), this.future.cmp.getY() ];
                    });

                thumbs[1].and(function(){ Lib.DnD.dragBy(this.future.cmp, sliderfields[0].el.dom.clientWidth*0.5+10, 0); });
                Tooltips.isValueOfSlider(sliderfields[1], 100);
                Tooltips.getTooltip('').visible()
                    .wait(function(){ return this.cmp.getY() != position[2][1]; });

            });
            it('Should drag at the values Tip[T]=0,50,100 and Target[L]=50', function(){
                var position = [[],[]];
                Tooltips.getSegmentButton(true, charButtons[0]).click();
                Tooltips.getSegmentButton(false, charButtons[3]).click();
                Tooltips.getTooltip('').visible()
                    .wait(function(){
                        return this.cmp.getAlign().match(/t([4-5]\d)?-l([4-5]\d)?\??/g);
                    })
                    .and(function(){
                        position[0] = [this.future.cmp.getX(), this.future.cmp.getY() ];
                    });
                Tooltips.isValueOfSlider(sliderfields[1], 50);
                thumbs[0].and(function(){ Lib.DnD.dragBy(this.future.cmp, -sliderfields[0].el.dom.clientWidth*0.5, 0); });
                sliderfields[0].wait(function(){
                    return this.cmp.getValue()[0] < 6;
                });
                Tooltips.isValueOfSlider(sliderfields[0], 0);
                Tooltips.getTooltip('').visible()
                    .wait(function(){ return this.cmp.getX() != position[0][0]; })
                    .and(function(){
                        position[1] = [this.future.cmp.getX(), this.future.cmp.getY() ];
                    });

                thumbs[0].and(function(){ Lib.DnD.dragBy(this.future.cmp, sliderfields[0].el.dom.clientWidth*0.5-30, 0); });
                Tooltips.isValueOfSlider(sliderfields[0], 50);
                Tooltips.getTooltip('').visible()
                    .wait(function(){ return this.cmp.getX() != position[1][0]; })
                    .and(function(){
                        position[2] = [this.future.cmp.getX(), this.future.cmp.getY() ];
                    });

                thumbs[0].and(function(){ Lib.DnD.dragBy(this.future.cmp, sliderfields[0].el.dom.clientWidth*0.5+10, 0); });
                Tooltips.isValueOfSlider(sliderfields[0], 100);
                Tooltips.getTooltip('').visible()
                    .wait(function(){ return this.cmp.getX() != position[2][0]; });

            });
        });
    });

    it('Source code view should work correctly', function(){
        Lib.sourceClick('.tip.TipAligning');
    });
    }
});
