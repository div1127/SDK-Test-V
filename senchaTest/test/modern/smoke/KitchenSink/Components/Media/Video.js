/**
 * @file Video.js
 * @author Vojtech Cerveny
 * @date 31.8.2016
 *
 * On touch devices it is not possible how to control video, because restriction in browsers.
 * Tested on: iOS9 phone, iOS9 tablet, Android6 phone, Android6 tablet, Chrome, Firefox, Opera, Edge on WinPhone
 * Passed on: all tested
 */
describe('Video example', function () {
    var Cmp = {
        video: function () {
            return ST.component('video');
        }
    };
    var El = {
        video: function () {
            return ST.element('>> video');
        }
    };

    beforeAll(function() {
        //to prevent randomBugs
        ST.options.timeout = 10000;
        Lib.beforeAll("#video-basic", "video-basic");
    });
    afterAll(function(){
        Lib.afterAll("video-basic");
        //restore default value
        ST.options.timeout = 5000;
    });

    it('is loaded properly', function () {
        Cmp.video()
            .rendered();
    });

    it('screenshot should be same', function(){
        Lib.screenshot("modern_Video");
    });

    if (Lib.isDesktop) {
        describe('Video', function () {
            //after tests video should be paused, because if you run just test for play, it never stops itself (JZ)
            afterAll(function(){
                El.video()
                    .and(function (video) {
                        if(!video.dom.paused) {
                            video.dom.pause();
                        }
                    });
            });

            xit('is playing via HTML5 video .play() and currentTime is greater than 1.5s', function () {
                El.video()
                    .and(function (video) {
                        video.dom.play();
                        //it is better to have waiting like this than hardcoded 2000ms, because it takes some time to
                        //start play video - on IE11 and Edge browser fails sometimes when computer is little bit more
                        //busy than just play test for just one browser... (JZ)
                        ST.wait(function(){
                            return (video.dom.currentTime > 1.5);
                        });
                    })
                    .and(function (video) {
                        expect(video.dom.currentTime).toBeGreaterThan(1.50);
                    });
            });

            xit('is paused via HTML5 video .pause() after 1.5s', function () {
                El.video()
                    .and(function (video) {
                        video.dom.play();
                        //it is better to verify, that video started to play for provided pause like this, rather than hardcorded time (JZ)
                        ST.wait(function(){
                            return (video.dom.currentTime > 1.5);
                        });
                    })
                    .and(function (video) {
                        video.dom.pause();
                        expect(video.dom.paused).toBeTruthy();
                    });
            });

            it('property video.error is not defined = no error on video', function () {
                El.video()
                    .and(function (video) {
                        expect(video.error).not.toBeDefined();
                    });
            });
        });
    } else {
        describe('Video', function () {
            it('is playing via HTML5 video .play() and currentTime is greater than 1.5s', function () {
                pending('HTML5 video methods are forbidden on touch devices');
            });
        });
    }

    describe('Source code', function () {
        it('should open, check and close', function () {
            Lib.sourceClick('Video');
        });
    });
});

