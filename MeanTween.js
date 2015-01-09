/*!
 * Mean Tween
 * Tweening with Freedom

 * Copyright (c) 2015, Marcin Horoszko
 * Release under the MIT license

 * https://github.com/cinkonaap/mean-tween

 * @version 0.0.1
 * @date 7.01.2015 
 */

var MeanTween = MeanTween || {};

(function () {
    MeanTween = function () {
        this._context = undefined;

        this._startTime = undefined;
        this._currentTime = undefined;
        this._targetTime = undefined;
        this._t = undefined;
        this._e = undefined;
        this._v = undefined;

        this._preStep = undefined;
        this._postStep = undefined;

        this._stepFunction = undefined;
        this._completeFunction = undefined;
        this._loopFunction = undefined;

        this._stepCallback = undefined;
        this._delayCallback = undefined;

        this._duration = undefined;
        this._delay = undefined;
        this._loopDelay = undefined;
        this._loopTimes = undefined;

        this._interpolationMethod = undefined;

        this._isInfinite = undefined;
        this._loopCount = 0;
    };

    MeanTween.prototype.interpolation = function (interpolation) {
        this._interpolationMethod = interpolation;

        return this;
    };

    MeanTween.prototype.step = function (stepFunction) {
        this._stepFunction = stepFunction;

        return this;
    };

    MeanTween.prototype.loop = function (loopFunction) {
        this._loopFunction = loopFunction;

        return this;
    };

    MeanTween.prototype.complete = function (completeFunction) {
        this._completeFunction = completeFunction;

        return this;
    };

    MeanTween.prototype._iteranceTween = function () {
        this._preStep = function () {
            var lastTime = this._currentTime;
            var lastT = this._t;

            this._currentTime = T._getTime();

            var reachedLoop = false;

            // clamp poly
            this._t = (this._currentTime - this._startTime) / this._duration;
            if( this._t > 1 ) {
                reachedLoop = true;
                this._t -= 1;
                this._e = this._t - lastT + 1;
            } else {
                this._e = this._t - lastT;
            }

            this._v = this._interpolationMethod(this._t, 0, 1, 1);

            return !reachedLoop;
        };

        this._postStep = function () {
            if( this._currentTime > this._targetTime ) {
                this._loopCount++;

                if( this._loopFunction != undefined ) {
                    this._loopFunction.call();
                }

                this._currentTime = this._startTime = T._getTime();
                this._targetTime = this._currentTime + ( this._duration * ( 1 - this._t ) );
            }

            if(this._loopTimes != undefined && this._loopCount > this._loopTimes) {
                return true;
            }

            return false;
        };

        return this;
    };

    MeanTween.prototype.times = function (times, loopDelay) {
        this._loopTimes = times || 1;
        this._loopDelay = loopDelay || false;

        this._iteranceTween();
    };

    MeanTween.prototype.infinite = function (loopDelay) {
        this._isInfinite = true;
        this._loopDelay = loopDelay || false;

        return this._iteranceTween();
    };

    MeanTween.prototype.delay = function (delay) {
        this._delay = delay;

        return this;
    };

    MeanTween.prototype.go = function () {
        var scope = this;

        var runFunction = function () {
            this._currentTime = this._startTime = T._getTime();
            this._t = 0;
            this._v = 0;
            this._targetTime = this._currentTime + this._duration;

            this._stepCallback = setTimeout(timeoutFunction, 0);
        }.bind(this);

        var timeoutFunction = function () {
            if( this._preStep() || !this._loopDelay ) {
                if( this._stepFunction != undefined ) {
                    // api : t, e, v, d
                    this._stepFunction.call(this._context, this._t, this._e, this._v, this._duration);
                }

                if(!this._postStep()) {
                    this._stepCallback = setTimeout(timeoutFunction, 0);
                } else {
                    this._dispose();
                }
            } else {
                this._postStep();

                this._delayCallback = setTimeout(runFunction, this._delay);
            }
        }.bind(this);

        if( this._delay != undefined && this._delay != 0 ) {
            this._delayCallback = setTimeout(runFunction, this._delay);
        } else {
            runFunction();
        }

        return (function () {
            var timer = scope;

            return {
                pause: function () {

                },
                resume: function () {

                },
                stop: function () {
                    timer._dispose();
                },
                t: function () {
                    return timer._t;
                }
            }
        })();

    };

    MeanTween.animate = function (context, duration) {
        var timer = new MeanTween();

        timer._context = context;

        timer._duration = duration;

        timer._interpolationMethod = T.Interpolation.LINEAR;

        timer._loopDelay = false;

        timer._preStep = function () {
            var lastTime = this._currentTime;
            var lastT = this._t;

            this._currentTime = T._getTime();

            // clamp poly
            this._t = Math.max( 0, Math.min( 1, (this._currentTime - this._startTime) / this._duration ) );
            this._e = this._t - lastT;
            this._v = this._interpolationMethod(this._t, 0, 1, 1);

            return true;
        };

        timer._postStep = function () {
            if( this._currentTime > this._targetTime ) {
                if( this._completeFunction != undefined ) {
                    this._completeFunction.call();
                }
                return true;
            }

            return false;
        };

        return timer;
    };

    MeanTween.prototype._dispose = function () {
        clearTimeout(this._delayCallback);
        clearTimeout(this._stepCallback);

        delete this;
    };

    MeanTween.Interpolation = {
        LINEAR: function (t, b, c, d) {
            return 1 * t / 1 + 0;
        },

        SINE_EASE_IN: function (t, b, c, d) {
            return -c * Math.cos(t / d * (Math.PI / 2)) + c + b;
        },
        SINE_EASE_OUT: function (t, b, c, d) {
            return c * Math.sin( t / d * (Math.PI / 2)) + b;
        },
        SINE_EASE_IN_OUT: function (t, b, c, d) {
            return -c / 2 * (Math.cos(Math.PI * t / d) - 1) + b;
        },

        QUAD_EASE_IN: function (t, b, c, d) {
            t /= d;
            return c * t * t + b;
        },
        QUAD_EASE_OUT: function (t, b, c, d) {
            t /= d;
            return -c * t * ( t - 2 ) + b;
        },
        QUAD_EASE_IN_OUT: function (t, b, c, d) {
            t /= d / 2;
            if (t < 1) return c / 2 * t * t + b;
            t--;
            return -c / 2 * (t * ( t - 2 ) - 1) + b;
        },

        CUBIC_EASE_IN: function (t, b, c, d) {
            t /= d;
            return c * t * t * t + b;
        },
        CUBIC_EASE_OUT: function (t, b, c, d) {
            t /= d;
            t--;
            return c * (t * t * t + 1) + b;
        },
        CUBIC_EASE_IN_OUT: function (t, b, c, d) {
            t /= d / 2;
            if (t < 1) return c / 2 * t * t * t + b;
            t -= 2;
            return c / 2 * (t * t * t + 2) + b;
        },

        QUINT_EASE_IN: function (t, b, c, d) {
            t /= d;
            return c * t * t * t * t * t + b;
        },
        QUINT_EASE_OUT: function (t, b, c, d) {
            t /= d;
            t--;
            return c * (t * t * t * t * t + 1) + b;
        },
        QUINT_EASE_IN_OUT: function (t, b, c, d) {
            t /= d / 2;
            if (t < 1) return c / 2 * t * t * t * t * t + b;
            t -= 2;
            return c / 2 * (t * t * t * t * t + 2) + b;
        },

        EXP_EASE_IN: function (t, b, c, d) {
            return c * Math.pow(2, 10 * (t / d - 1 )) + b;
        },
        EXP_EASE_OUT: function (t, b, c, d) {
            return c * (-Math.pow( 2, -10 * t/d ) + 1) + b;
        },
        EXP_EASE_IN_OUT: function (t, b, c, d) {
            t /= d / 2;
            if (t < 1) return c / 2 * Math.pow(2, 10 * (t - 1)) + b;
            t--;
            return c / 2 * (-Math.pow( 2, -10 * t ) + 2) + b;
        },

        CIRC_EASE_IN: function (t, b, c, d) {
            t /= d;
            return -c * (Math.sqrt(1 - t * t) - 1) + b;
        },
        CIRC_EASE_OUT: function (t, b, c, d) {
            t /= d;
            t--;
            return c * Math.sqrt(1 - t * t) + b;
        },
        CIRC_EASE_IN_OUT: function (t, b, c, d) {
            t /= d / 2;
            if (t < 1) return -c / 2 * (Math.sqrt(1 - t * t) - 1) + b;
            t -= 2;
            return c / 2 * (Math.sqrt(1 - t * t) + 1) + b;
        }
    };

    MeanTween._getTime = function () {
        var date = new Date();
        return date.getTime();
    };

    var T = MeanTween;
}());