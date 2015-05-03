//Screenshaker plugin for impactjs.  Has been tested and works in 
//impact 1.19 and 1.20.  Will probably work in other versions, but
//i haven't tested those.
/*
           DO WHAT THE FUCK YOU WANT TO PUBLIC LICENSE
                   Version 2, December 2004

Copyright (C) 2012 Dave Homan <owlbear@slouchcou.ch>
Created during production of Drugbound <http://drugbound.com>

Everyone is permitted to copy and distribute verbatim or modified
copies of this license document, and changing it is allowed as long
as the name is changed.

           DO WHAT THE FUCK YOU WANT TO PUBLIC LICENSE
  TERMS AND CONDITIONS FOR COPYING, DISTRIBUTION AND MODIFICATION

 0. You just DO WHAT THE FUCK YOU WANT TO.
*/


ig.module(
    'plugins.screenshaker.screenshaker'
)
.requires(
    'impact.entity'
)
.defines(function(){
EntityScreenshaker = ig.Entity.extend({
    //damped harmonic oscillator about the origin 0,0.  follows the eqn:
    //   F = -kx - cv, or:
    //  a = -(kx + cv)/m
    // doesn't work if this exists in ig.game.entities array.  please use
    // new EntityScreenshaker() to create.
    gravityFactor: 0,
    pos: {x:0, y:0},
    lastPos: {x:0, y:0},
    maxVel: {x:1000, y:1000},
    k: 150,  //spring constant
    c: 10,  //damping constant
    m: 1,   //mass
    trap: 0.3,
    resetTime: 2.0,
    resetTimer: null,
    timedShakeTimer: null,
    timedShakeIntensity: 100,
    
    init: function(x,y,settings){
        this.parent(0,0,settings);  
    },
    update: function(){
        this.lastPos.x = this.pos.x;
        this.lastPos.y = this.pos.y;
        this.accel.x = (-this.k * this.pos.x + -this.c * this.vel.x)/this.m;
        this.accel.y = (-this.k * this.pos.y + -this.c * this.vel.y)/this.m;
        this.parent();
        this.handleMovementTrace(null);
        if (this.resetTimer && this.resetTimer.delta() >= 0){
            this.pos.x = 0;
            this.pos.y = 0;
            this.last.x = 0;
            this.last.y = 0;
            this.vel.x = 0;
            this.vel.y = 0;
            this.accel.x = 0;
            this.accel.y = 0;
            this.resetTimer = null;
        }
    },
    draw: function(){
        //do nothing.  invisible entity
    },
    handleMovementTrace: function(result){
        this.pos.x += this.vel.x * ig.system.tick;
        this.pos.y += this.vel.y * ig.system.tick;
    },
    kill: function(){
        //do nothing.  invincible
    },
    applyImpulse: function(x,y){
        this.vel.x -= x;
        this.vel.y -= y;
        //ig.log('impulse x and y = ' + x + ", " + y);
        if (this.resetTimer){
            this.resetTimer.reset();
        }
        else {
            this.resetTimer = new ig.Timer(this.resetTime);
        }
    }
    
    
}); 
ScreenShaker = ig.Class.extend({
    spring: new EntityScreenshaker(),
    
    update: function(){
        if (this.timedShakeTimer){
            if (this.timedShakeTimer.delta() <= 0){
                var randomAngle = randomRange(0, Math.PI*2);
                this.applyImpulse(this.timedShakeIntensity * Math.cos(randomAngle),
                                  this.timedShakeIntensity * Math.sin(randomAngle))
            }
            else {  //time is up.
                this.timedShakeTimer = null;
            }
        }
        this.spring.update();
    },
    shakeScreen: function(screenPos){
        screenPos.x = screenPos.x - this.spring.lastPos.x + this.spring.pos.x;
        screenPos.y = screenPos.y - this.spring.lastPos.y + this.spring.pos.y;
    },
    applyImpulse: function(x,y){
        this.spring.applyImpulse(x,y);   
    },
    timedShake: function(intensity, time){
        this.timedShakeIntensity = intensity;
        this.timedShakeTimer = new ig.Timer(time);
    }
});
});