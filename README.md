# Tweening with freedom!

## Main 

Are you tired of limiting tween libraries, because all you want is encapsulated delay/tween functionallity, interpolation methods and DIY tweening stuff.

If that is the case, this library is for you.

## How to use ( API for now )

#### Minimalistic example
```javascript
var currentRotation = 0;
MaxTween.animate($element, 1500).step(function (t, e, v, d) {
    currentRotation = currentRotation + e * 360;
    this.css('transform', 'rotate('+ currentRotation +'deg)');
}).go();
```

#### API methods
```javascript
animate(element, miliseconds)
delay(miliseconds)
infinite()
interpolation(MeanTween.Interpolation)

step(callback(context, time, elapsed, value, duration))
complete(callback())
loop(callback())

go()
```

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

All rights for tweening functions goes to [Robert Penner](www.robertpenner.com)

## Features to implement

- Parallel / Sequence animations
- Tweening single/multiple property 
      ```javascript
      .property(from, to)
      .properties( { 'x' : [ 0, 100 ] } ) 
      ```
