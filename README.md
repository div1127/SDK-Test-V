# SDK-Test-V


## How-To run tests

> *Note that this guide is not for development purposes*

Install SenchaTest (ST is 2.1.0 recommended)

Clone a git repo -  `git clone git@github.com:sencha/SDK-Test.git && cd SDK-Test`

Checkout branch based on ExtJS you want to test:
`git checkout 6.5-qastaging`

   * 6.5-qastaging for latest tests (ExtJS 6.5+)
   * 6.1-qastaging for ExtJS 6.2
   * 6.x-qastaging for ExtJS 6.0.x



Open SDK-Test/senchaTest project in SenchaTest

Update Location URL in Test project settings - this URL should point to root folder of deployed online examples.

E.g.  http://examples.sencha.com/extjs/6.5.0/examples/
or    http://localhost:1841/build/examples/   in case you host SDK examples using Cmd

Choose Scenario, Browser and Test suite you want to run and run tests.


## Guide


Test automation for the Ext JS / Sencha Touch SDK's

Automated tests have to run reliably on all P1 platforms, mainly **Chrome, IE11, Edge, FF, Safari 10,9,  Android 5,6 tablet and phones, iOS 9,10 tablets and phones**. Other platforms are nice to have, tests should be runnable, but there is no need to fix all random failures. 
 
Add comment to file header about tested platforms 
When fixing tests we have clear idea which platforms worked or didn't work previously 
 
Divide tests into **well-named** describes – it helps to narrow down reproducible test case and find root cause of failures. Describes are used to group together several related specs (it). Specs should be atomic and verify single feature/functionality.
Example : 
```javascript
describe('demo example') { 
    describe('grid panel 1'){ 
        describe('header'){ 
            it('title should contain some text') {
                expect(panel.getTitle()).toBe('title');
            }
            it('heder should docked to left'){
            } 
        } 
        describe('toolbar'){            
        } 
        describe('grid'){ 
            describe('header'){ 
            } 
            describe('body'){ 
            } 
        } 
    } 
} 
```
**afterAll/afterEach** - ensure that following tests are not affected when one spec block fails – for example you need to open some window and during test execution test fails, test needs to close that window in afterEach/afterAll section 
 
**ExtJS query locators** - we should rely mostly on ExtJs component selectors and not on HTML selectors (xpath, dynamic Id's). That's because HTML can easily change during the time, so information based on HTML structure are not reliable. 
 
**Prefix** - In KitchenSink each example should have custom **xtype** – use this as prefix for other query locators – this will ensure that you are selecting components within desired example and it should avoid interfering with other examples.  
 
**Shared library** - Factorize functions only if it's used by more tests, if you create function that is used by single test you should keep in the test file only, same applies if you need to use/generate some test data. 
Function that are added to CommonLib must be well documented so it's easy to understand what parameters should be passed, add funtions to appropriate scope – Lib, Lib.d3 ... 
 
 
## Code conventions & Best practicies 
We are following Sencha's code guidelines and general javsascript code style - http://javascript.crockford.com/code.html 
* Use 4 spaces to indent new line (not TAB) 
* camelCase variable naming 
* Capitalized variables should be reserved for PageObjects(SenchaTest) or Global variables 
* Use semicolon - ; at the end of statement 
* Avoid using global variables 
* Don't use white spaces in file/folder names 
* No commented code unless it's TODO 
* Use comments to explain complex/unique piece of code
