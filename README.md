# Tweening with freedom!

## Motivation 

Are you tired of limiting tween libraries, because all you want is encapsulated delay/tween functionallity, interpolation methods and DIY tweening stuff.

If that is the case, this library is for you.

## How to use

#### Visual Examples 

todo..

#### Code Examples  

Simplistic

```javascript
var currentRotation = 0;

MaxTween
    .animate($element, 1500)
    .step(function (t, e, v, d) {
        currentRotation = currentRotation + e * 360;
        this.css('transform', 'rotate('+ currentRotation +'deg)'); })
    .go();
```

Full

```javascript
var currentRotation = 0;

var tweenObject = MaxTween
    .animate($element, 1500)
    .step(function (t, e, v, d) {
        currentRotation = currentRotation + e * 360;
        this.css('transform', 'rotate('+ currentRotation +'deg)'); })
    .loop(function () {})
    .complete(function () {})
    .delay(3000)
    .times(5, true)
    .interpolation(MeanTween.Interpolation.CUBIC_EASE_IN)
    .go();
    
tweenObject.pause();
tweenObject.resume();
tweenObject.stop();
```
#### API

todo.. ( MeanTween, TweenInstance, TweenHash )

#### Easing functions
- LINEAR
- SINE_EASE_IN
- SINE_EASE_OUT
- SINE_EASE_IN_OUT
- QUAD_EASE_IN
- QUAD_EASE_OUT
- QUAD_EASE_IN_OUT
- CUBIC_EASE_IN
- CUBIC_EASE_OUT
- CUBIC_EASE_IN_OUT
- QUINT_EASE_IN
- QUINT_EASE_OUT
- QUINT_EASE_IN_OUT
- EXP_EASE_IN
- EXP_EASE_OUT
- EXP_EASE_IN_OUT
- CIRC_EASE_IN
- CIRC_EASE_OUT
- CIRC_EASE_IN_OUT

All rights for tweening functions goes to [Robert Penner](http://www.robertpenner.com)

## Features to implement

- Pause / Resume

- Backward / Forward

- Parallel / Sequence animations
```javascript
.parallel() : TweenHash
```
- Tweening single/multiple property 
```javascript
.property(from, to)
.properties( { 'x' : [ 0, 100 ] } ) 
```
