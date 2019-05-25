/**
 * @file CheckoutForm.js
 * @name UI/Forms/Checkout Form
 * @author Vitezslav Miech
 * @created 2017/08/02
 * Tested on Chrome, Firefox, Edge, iOS tablet, Android phone, IE11
 */

describe("CheckoutForm", function() {

	var prefix = '#kitchensink-view-forms-checkout',
		containers = ['Contact Information', 'Shipping Address', 'Billing Address', 'Payment Information'],
		fieldNames = ['firstName', 'lastName', 'email', 'phone', 'shipping_address','shipping_city', 'shipping_state', 
						'shipping_postalcode', 'billing_address','billing_city', 'billing_state', 'billing_postalcode',
						 'payment_name', 'payment_number', 'payment_month', 'payment_year'];

	var actualCard;
	var Form = {
		field: function(id, title) {
            return ST.textField('[name='+fieldNames[id]+']');
        },
        fieldInput: function(num) {
            return ST.element('textfield[name='+fieldNames[num]+'] => input');  
        },
		button: function(text) {
            return ST.component('button[_text='+text+']');
        },
        card: function(title) {
            return ST.component('container[title='+title+']');
        },
        swipeCard: function(trigger) {
        	Form.button(trigger).click();
        },
        goToCard: function(number) {
        	var card;
        	ST.component('form-checkout container[title][_hidden=false]')
        		.and(function(c) {
        		    card = c.title;
        			actualCard = containers.indexOf(card) +1;
        			if(actualCard > number) {
		        		for (var i = 0; i < actualCard - number; i++) {
					   		Form.swipeCard('Back');
					   		ST.wait(2000);
					    }
					    ST.wait(function(){
		        			return Ext.ComponentQuery.query('form-checkout container[title]:visible')[1].title != card;
		        		});
		        	} else if (actualCard < number){
		        		for (var i = 0; i < number - actualCard; i++) {
					   		Form.swipeCard('Next');
					   		ST.wait(2000);
					    }
					    ST.wait(function(){
		        			return Ext.ComponentQuery.query('form-checkout container[title]:visible')[1].title != card;
		        		});
		        	}
		        });
        	
        },
        clear: function(id, set) {
            set = false || set;
            if(set) {                
                ST.wait(500);
	            Form.field(id)
	                .and(function(field) {
	                    field.reset();
	                });
            } else {
                Form.field(id)
                    .down('=> div.x-cleartrigger')
                    .click();    
            }
        },
        statePicker: function(id) {
            return ST.comboBox('[name='+fieldNames[id]+']');
        },
        statePickerList: function() {
            return ST.component('simplelistitem[id="ext-simplelistitem-1"]');
        },
        fieldBillingstate: function() {
			return ST.component('comboboxfield[name="billing_state"]');
		},
        editStateField: function(id, text, numberOnly) {
        	Form.field(id).type(text);
			Form.statePickerList().click().wait(2000)	
	            .and(function() {
	                     	expect((this.future.cmp.el.dom.innerText).trim()).toBe(text);
	            });
        },
        editField: function(id, text, numberOnly) {
        	Form.field(id)
	            .type(text)
	            .and(function() {
	            	if(numberOnly){
	            		expect(this.future.cmp.getValue()).toBe(parseInt(text));
	            	} else {
	                	expect(this.future.cmp.getValue()).toBe(text);
	            	}
	            });
        },
        checkShip: function() {
        	ST.component('checkboxfield[reference=sameAsShipping]')
        		.down('=> input')
        		.click();
        },
        resetForm: function(idStart, idEnd) {
        	for (var i = idStart; i < idEnd; i++) {
        		if(i==15) {
        			Form.field(i)
    					.type('12');	
        		} else {
        			Form.field(i)
    					.type('asdf');	
        		}
    			
    		}
    		Form.button('Reset')
    			.click();
    		for(var i=idStart; i<idEnd; i++) {
                Form.fieldInput(i)
                    .and(function(field) {
                        expect(field.dom.value).toBe('');        
                    });
            }
        }

	};

    beforeAll(function() {
        Lib.beforeAll("#form-checkout", prefix);
        ST.component(prefix).visible();
    });
    
    afterAll(function(){
            ST.component('tooltip')
                .and(function() {
                    this.future.cmp.hide();
                });
        Lib.afterAll(prefix);
        ST.wait(3000);
    });
    
    it('Example should load correctly', function() {
        Lib.screenshot('checkoutFormUI', 10);
    });

    describe('Editable fields', function() {
        
        describe('Contact Information', function() {

            it('First Name ', function() {
        		Form.editField(0, 'text');
                Form.clear(0);
            });  
		    
		    it('Last Name ', function() {
        		Form.editField(1, 'text');
                Form.clear(1);
            });

	        it('Email', function() {
	            Form.editField(2, 'text')
	            Form.clear(2);
	        });

            it('Phone Number', function() {
        		Form.editField(3, 'text');
                Form.clear(3);
            });
        });

        describe('Shipping Address', function() {
        	beforeAll(function() {
        	Form.goToCard(2);
        	ST.component(prefix).visible();
        	});

            it('Street Address ', function() {
                ST.wait(5000);
        		Form.editField(4, 'text');
                Form.clear(4);
            });

            it('City', function() {
        		Form.editField(5, 'text');
                Form.clear(5);
            });
            
	        it('State', function() {
	       Form.editStateField(6, 'Ohio');
	       Form.clear(6, true);
	        });

            it('Postal Code', function() {
        		Form.editField(7, 'text');
                Form.clear(7);
            });
        }); 

        describe('Billing Address', function() {
        	beforeAll(function() {
        		Form.goToCard(3);
        		ST.component(prefix).visible();
        		Form.checkShip();
        	});

            it('Street Address ', function() {
                ST.wait(2000);
        		Form.editField(8, 'text');
                Form.clear(8);
            });

            it('City', function() {
        		Form.editField(9, 'text');
                Form.clear(9);
            });

	        it('State', function() {
	            Form.field(10).type('New York');
	            Form.field(10).type({
                    key: 'TAB'
                 });
                Form.field(10).wait(2000)
                	.and(function() {
	                	expect(this.future.cmp._inputValue).toBe('New York');
	            });
	         });
	        
            it('Postal Code', function() {
        		Form.editField(11, 'text');
                Form.clear(11);
            });
        });

        describe('Payment Information', function() {
        	beforeAll(function() {
        		Form.goToCard(4);
        	});

            it('Name On Card', function() {
        		Form.editField(12, 'text');
                Form.clear(12);
            });

            it('Card Number', function() {
        		Form.editField(13, 'text');
                Form.clear(13);
            });

	        it('Month', function() {
	            Form.field(14).type('June');
	            Form.field(14).type({
                    key: 'TAB'
                 });
                Form.field(14).wait(2000)
                	.and(function() {
				    	expect(this.future.cmp._inputValue).toBe('June');
	            });
	            Form.clear(14, true);
	        });

            it('Year', function() {
        		Form.editField(15, '123', true);
                Form.clear(15);
            });
        });   
           
    });

    describe('Fields validation', function() {
    	
    	describe('Required fields', function() {
    		beforeAll(function() {
    			Form.goToCard(4);
	            Form.button('Submit')
	            	.click();
	            ST.component('messagebox[_title=Invalid]')
	                .visible()
	                .down('button')
	                .click()
	                .hidden();    
	        });

	        describe('Contact Information', function() {
	        	beforeAll(function() {
	        		Form.goToCard(1);
	        		ST.component(prefix).visible();
	        		ST.wait(2000);
        		});
		        var incM = 0;
		        for(var i=0; i<2; i++){
		            it('Invalid mark of ' +fieldNames[i], function() {
		                Lib.Forms.validateError('textfield[name='+fieldNames[incM]+']', false, '', 'This field is required'); 
		                incM++; 
		            });
		        }        
		        var incT = 0;
		        for(var i=0; i<2; i++){
		            it('tooltip is displayed on ' +fieldNames[i], function() {
		                Lib.Forms.tooltipError('textfield[name='+fieldNames[incT]+']', 'This field is required');
		                incT++;
		            });
		        }
		    });

		    describe('Shipping Address', function() {
	        	beforeAll(function() {
	        		Form.goToCard(2);
        		});
		    
		        inSM = 4;
		        for(var i=4; i<8; i++){
		            it('Invalid mark of ' +fieldNames[i], function() {		                
		                Lib.Forms.validateError('textfield[name='+fieldNames[inSM]+']', false, '', 'This field is required'); 
		                inSM++; 
		            });
		        }        
		        inST = 4;
		        for(var i=4; i<8; i++){
		            it('tooltip is displayed on ' +fieldNames[i], function() {
		                Lib.Forms.tooltipError('textfield[name='+fieldNames[inST]+']', 'This field is required');
		                inST++;
		            });
		        }
		    });

		    describe('Billing Address', function() {
	        	beforeAll(function() {
	        		Form.goToCard(3);
	        		Form.button('Reset')
    			.click();
	        		Form.checkShip();
        		});

        		inBM = 8;
		        for(var i=8; i<12; i++){
		            it('Invalid mark of ' +fieldNames[i], function() {
		                Lib.Forms.validateError('textfield[name='+fieldNames[inBM]+']', false, '', 'This field is required'); 
		                inBM++; 
		            });
		        }        
		        inBT = 8;
		        for(var i=8; i<12; i++){
		            it('tooltip is displayed on ' +fieldNames[i], function() {
		                Lib.Forms.tooltipError('textfield[name='+fieldNames[inBT]+']', 'This field is required');
		                inBT++;
		            });
		        }
		    });
		    
		    describe('Payment Information', function() {
	        	beforeAll(function() {
	        		Form.goToCard(4);
	        		Form.button('Reset')
    			.click();
        		});

        		inPM = 12;
		        for(var i=12; i<16; i++){
		            it('Invalid mark of ' +fieldNames[i], function() {
		                Lib.Forms.validateError('textfield[name='+fieldNames[inPM]+']', false, '', 'This field is required'); 
		                inPM++; 
		            });
		        }        
		        inPT = 12;
		        for(var i=12; i<16; i++){
		            it('tooltip is displayed on ' +fieldNames[i], function() {
		                Lib.Forms.tooltipError('textfield[name='+fieldNames[inPT]+']', 'This field is required');
		                inPT++;
		            });
		        }
		    });
    	});

    	describe('Field validators', function() {

    		it('Email validator', function() {
    			Form.goToCard(1);
    			ST.component(prefix).visible();
    			ST.wait(2000);
    			Lib.Forms.validateError('textfield[name='+fieldNames[2]+']', false, 'wrong', 'Is not a valid email address'); 
    			Lib.Forms.tooltipError('textfield[name='+fieldNames[2]+']', 'Is not a valid email address');
    			Form.clear(2);
    		});

    		it('Phone validator', function() {
    			Form.goToCard(1);
    			Lib.Forms.validateError('textfield[name='+fieldNames[3]+']', false, '45', 'Is not a valid phone number'); 
    			Lib.Forms.tooltipError('textfield[name='+fieldNames[3]+']', 'Is not a valid phone number');
    			Form.clear(3);
    		});

    		it('Postal regex validator', function() {
    			Form.goToCard(2);
    			Lib.Forms.validateError('textfield[name='+fieldNames[7]+']', false, '23', 'Is in the wrong format'); 
    			Lib.Forms.tooltipError('textfield[name='+fieldNames[7]+']', 'Is in the wrong format');
    			Form.clear(7);
    		});	        
		});

		describe('Field minimun', function() {
			
			it('Year minimum', function() {
				Form.goToCard(4);
				var date = new Date();
				Lib.Forms.validateError('textfield[name='+fieldNames[15]+']', false,  (date.getFullYear()-1).toString(), 'The minimum value for this field is '+date.getFullYear()); 
    			Lib.Forms.tooltipError('textfield[name='+fieldNames[15]+']', 'The minimum value for this field is '+date.getFullYear());
    			Form.clear(15);
			});
		});		      
    });

    	describe('Card navigation', function() {

    		it('Navigation via buttons', function() {    		
		    for (var i = 3; i >= 0; i--) {
		       	Form.card(containers[i]).visible();
		    	if(i!=0){
		    		Form.swipeCard('Back');	
		    	}
		    }		    
		    for (var i = 0; i < containers.length; i++) {
    			Form.card(containers[i]).visible();
		   		if(i!=3){
		   			Form.swipeCard('Next');	
		    	}
		    }
    	});

    	it('Navigation via indicator', function() {    		
    		for (var i=3; i>=0; i--) {
		    	Form.card(containers[i]).visible();
		    	if(i!=0){
		    	   ST.element("//span[contains(@class,'indicator-item')][1]")
		    		.click();
		    	   ST.wait(2000);
		    	}
		    }		    
		    for (var i= 0; i < containers.length; i++) {		        
    			Form.card(containers[i]).visible();
		   		if(i!=3){
		   			ST.element("//span[contains(@class,'indicator-item')][last()]")
		   				.click();	
		    	}		    			
		    }
       	});
           
    });
    
   

    describe('ComboBox selection', function() {
    	describe('State comboBox', function() {
    		it('Shipping state', function() {
    		    Form.swipeCard('Back');
    		    	ST.component(prefix).visible();
    			ST.wait(2000);
    		    Form.swipeCard('Back');
    		    	ST.component(prefix).visible();
    			ST.wait(2000);
    		Lib.Forms.testCombobox('textfield[name='+fieldNames[6]+']', 'state', 'Alabama', 'AL');
    		});

    		it('Billing state', function() {
    			Form.goToCard(3);
    			//Form.checkShip();
    			Lib.Forms.testCombobox('textfield[name='+fieldNames[10]+']', 'state', 'Alabama', 'AL');
    		});
    	});

    		it('Month comboBox', function() {
    			Form.goToCard(4);
    			Lib.Forms.testCombobox('textfield[name='+fieldNames[14]+']', 'name', 'April', 4);
    		});
           
    });

    describe('Segmented button selection', function() {

    	beforeAll(function() {
    		Form.goToCard(4);
    	});

		it("Toggle card button", function() {   		
			ST.component(prefix + ' segmentedbutton')
			.visible();
			var cards = ['Visa', 'MasterCard', 'AMEX', 'Discover']	
			for(var i=0; i<4; i++) {
			Form.button(cards[i])
				.click()
				.and(function(btn){
					expect(btn._pressed).toBe(true);
				})
			}
    	});
           
    });

    describe('Reset', function() {

    	it('Contact Information', function() {
    	    Form.goToCard(0);
    		Form.resetForm(0, 4);
    	});

    	it('Shipping Address', function() {
    		Form.goToCard(2);
    		Form.resetForm(4, 8);
    	});

    	it('Billing Address', function() {
    		Form.goToCard(3);
    		Form.resetForm(8, 12);
    	});

    	it('Payment Information', function() {
    		Form.goToCard(4);
    		Form.resetForm(12, 16);
    	});
           
    });

    describe('Confirm form', function() {

    	it('Submit invalid', function() {
    		Form.goToCard(4);
    		Form.button('Submit')
    			.click();
    		ST.component('messagebox[_title=Invalid]')
                .visible()
                .down('button')
                .click()
                .hidden(); 
    	});
           
    	it('Submit valid', function() {
    		Form.goToCard(1);    		  
    		ST.button('button[text="Reset"]').click();    		
			for(var i=0; i<2; i++) {
				Form.field(i)
					.setValue('text');
			}
    		Form.goToCard(2);
    		ST.button('button[text="Reset"]').click();
    		for(var i=4; i<6; i++) {
    			Form.field(i)
    				.setValue('text');
    		}
    		Lib.Picker.clickToShowPicker('textfield[name='+fieldNames[6]+']');
            Lib.Picker.selectValueInPickerSlot('textfield[name='+fieldNames[6]+']', 'Alabama', 'state');
    		Form.field(7)
    			.setValue('12345')
    			.and(function() {
    				Form.goToCard(4);
    				ST.button('button[text="Reset"]').click();
    			});

    		for(var i=12; i<14; i++) {
    			Form.field(i)
    				.setValue('text');
    		}
    		const d = new Date();
    		var y=d.getFullYear();
    		const monthNames = ["January", "February", "March", "April", "May", "June",
                     "July", "August", "September", "October", "November", "December"
                    ];
            var m=monthNames[d.getMonth()];    		
    		Lib.Picker.clickToShowPicker('textfield[name='+fieldNames[14]+']');
            Lib.Picker.selectValueInPickerSlot('textfield[name='+fieldNames[14]+']', m, 'name');
    		Form.field(15)
    			.setValue(y);    		
    		Form.button('Submit')
    			.click();
    		ST.component('messagebox[_title=Success!]')
                .visible()
                .down('button')
                .click()
                .hidden(); 
    	});
    });

    it("should open source window when clicked", function() {
        Lib.sourceClick("form-checkout");
    });
});