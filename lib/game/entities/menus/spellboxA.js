ig.module(
	'game.entities.menus.spellboxA'
)
.requires(
	'game.entities.abstractions.artebox'
)
.defines(function(){
	EntitySpellBoxA = EntityArteBox.extend({

	    type: ig.Entity.TYPE.B,

	    size: {x: 32, y: 32},
	    animSheet: new ig.AnimationSheet('media/fireball.png', 32, 32),

	    init: function(x, y, settings){
	    	this.parent(x, y, settings);
	    	this.addAnim('idle', 0.1, [0]);
	    },

	    update: function(){
	    	this.currentAnim = this.anims.idle;
	    },

	   	clicked: function() {
	        /* Handle the click */
	        console.log("Clicked spell icon");
	    },
	});
});