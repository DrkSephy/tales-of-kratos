ig.module(
    'game.entities.misc.killblock'
    )
.requires(
    'impact.entity',
    'game.entities.player'
)
.defines(function(){
    EntityKillblock = ig.Entity.extend({

	health: 10000000,
    // The following properties tell Weltmeister how
    // to render the object inside the edit view.
    // The following draws a blue 8x8 box.
    _wmScalable: true,
    _wmDrawBox: true,
    _wmBoxColor: 'rgba(0,0,255,0.7)',
    size: {x: 8, y: 8},

    type: ig.Entity.TYPE.B,
    checkAgainst: ig.Entity.TYPE.BOTH,
    collides: ig.Entity.COLLIDES.PASSIVE,


	update: function(){ },
	
    collideWith: function(other) {
    	other.kill();
    },

    check: function( other ) { 
        other.receiveDamage( 30, this );
      

    },

    kill: function(){
        this.parent();
    },
    
    }); 
});









