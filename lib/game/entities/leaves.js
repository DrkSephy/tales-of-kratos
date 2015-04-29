ig.module(
    'game.entities.leaves'
).requires(
    'impact.entity'
).defines(function(){

    EntityLeaves = ig.Entity.extend({
        _wmDrawBox: true,
        _wmScalable: true,
        _wmBoxColor: 'rgba(255, 170, 66, 0.7)',
        duration: 1,
        count: 5,
        nextEmit: null,
        init: function( x, y, settings ) {
            this.parent( x, y, settings );
            this.size.x = ig.system.width;
            this.nextEmit = new ig.Timer();
            // start right away
            this.nextEmit.set( 0 );
        },
        update: function(){
            if(  this.nextEmit.delta() >= 0 && this.count > 0 ) {
                this.count--;
                this.nextEmit.set( this.duration / this.count );
                var x = this.randomRange(ig.game.screen.x, ig.game.screen.x + ig.system.width);
                var y = ig.game.screen.y;
                ig.game.spawnEntity( EntityGreenLeaf, x, y );
                ig.game.spawnEntity( EntityPinkLeaf, x, y );
                ig.game.spawnEntity( EntityOrangeLeaf, x, y );
            }
        },
        randomRange: function(min, max){
            return Math.random() * (max - min) + min;
        }
    });

    EntityGreenLeaf= ig.Entity.extend({
        animSheet: new ig.AnimationSheet( 'media/smallleaf.png', 16, 16 ),
        size: {x: 16, y: 16},
        offset: {x: 0, y: 0},
        vel: {x: 80, y: 10},
        maxVel: {x: 60, y: 60},
        type: ig.Entity.TYPE.NONE,
        checkAgainst: ig.Entity.TYPE.NONE,
        collides: ig.Entity.COLLIDES.NEVER,
        bounciness: 0,
        friction: {x:0, y: 0},
        init: function( x, y, settings ) {
            this.parent( x, y, settings );
            this.addAnim( 'idle', 0.50, [0, 1, 2, 3] );
            this.vel.x = (Math.random() * 2 - 1) * this.vel.x;
            this.vel.y = (Math.random() * 2 - 1) * this.vel.y;
        },
        update: function() {
            if( this.pos.y > ig.game.screen.y  + ig.system.height ) {
                // move it to the top screen
               this.pos.y = ig.game.screen.y - 0;
            }
            // out of right bound
            if(this.pos.x > ig.game.screen.x + ig.system.width){
                this.pos.x = ig.game.screen.x;
            }
            // out of left bound
            if(this.pos.x < ig.game.screen.x){
                this.pos.x = ig.game.screen.x + ig.system.width;
            }
            this.parent();
        },
        handleMovementTrace: function(res){
            this.pos.x += this.vel.x * ig.system.tick;
            this.pos.y += this.vel.y * ig.system.tick;
        }
    });

    EntityOrangeLeaf= ig.Entity.extend({
            animSheet: new ig.AnimationSheet( 'media/smallleaf.png', 16, 16 ),
            size: {x: 16, y: 16},
            offset: {x: 0, y: 0},
            vel: {x: 80, y: 23},
            maxVel: {x: 60, y: 60},
            type: ig.Entity.TYPE.NONE,
            checkAgainst: ig.Entity.TYPE.NONE,
            collides: ig.Entity.COLLIDES.NEVER,
            bounciness: 0,
            friction: {x:0, y: 0},
            init: function( x, y, settings ) {
                this.parent( x, y, settings );
                this.addAnim( 'idle', 0.50, [4, 5, 6, 7] );
                this.vel.x = (Math.random() * 2 - 1) * this.vel.x;
                this.vel.y = (Math.random() * 2 - 1) * this.vel.y;
            },
            update: function() {
                if( this.pos.y > ig.game.screen.y  + ig.system.height ) {
                    // move it to the top screen
                   this.pos.y = ig.game.screen.y - 0;
                }
                // out of right bound
                if(this.pos.x > ig.game.screen.x + ig.system.width){
                    this.pos.x = ig.game.screen.x;
                }
                // out of left bound
                if(this.pos.x < ig.game.screen.x){
                    this.pos.x = ig.game.screen.x + ig.system.width;
                }
                this.parent();
            },
            handleMovementTrace: function(res){
                this.pos.x += this.vel.x * ig.system.tick;
                this.pos.y += this.vel.y * ig.system.tick;
            }
    });

    EntityPinkLeaf= ig.Entity.extend({
            animSheet: new ig.AnimationSheet( 'media/smallleaf.png', 16, 16 ),
            size: {x: 16, y: 16},
            offset: {x: 0, y: 0},
            vel: {x: 80, y: 23},
            maxVel: {x: 60, y: 60},
            type: ig.Entity.TYPE.NONE,
            checkAgainst: ig.Entity.TYPE.NONE,
            collides: ig.Entity.COLLIDES.NEVER,
            bounciness: 0,
            friction: {x:0, y: 0},
            init: function( x, y, settings ) {
                this.parent( x, y, settings );
                this.addAnim( 'idle', 0.50, [16, 17, 18, 19] );
                this.vel.x = (Math.random() * 2 - 1) * this.vel.x;
                this.vel.y = (Math.random() * 2 - 1) * this.vel.y;
            },
            update: function() {
                if( this.pos.y > ig.game.screen.y  + ig.system.height ) {
                    // move it to the top screen
                   this.pos.y = ig.game.screen.y - 0;
                }
                // out of right bound
                if(this.pos.x > ig.game.screen.x + ig.system.width){
                    this.pos.x = ig.game.screen.x;
                }
                // out of left bound
                if(this.pos.x < ig.game.screen.x){
                    this.pos.x = ig.game.screen.x + ig.system.width;
                }
                this.parent();
            },
            handleMovementTrace: function(res){
                this.pos.x += this.vel.x * ig.system.tick;
                this.pos.y += this.vel.y * ig.system.tick;
            }
    });
});
