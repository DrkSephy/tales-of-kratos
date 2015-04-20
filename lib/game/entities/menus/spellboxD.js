ig.module(
	'game.entities.menus.spellboxD'
)
.requires(
	'game.entities.abstractions.artebox'
)
.defines(function(){
	EntitySpellBoxD = EntityArteBox.extend({

	    type: ig.Entity.TYPE.B,

	    size: {x: 32, y: 32},
	    animSheet: new ig.AnimationSheet('media/heal.png', 32, 32),

	    init: function(x, y, settings){
	    	this.parent(x, y, settings);
	    	this.addAnim('idle', 0.1, [0]);
	    },

	    update: function(){
	    	if(ig.game.spellsCatalog['heal'].active){
	    		this.currentAnim = this.anims.idle;
	    	} else {
	    		this.currentAnim.alpha = 0.3;
	    	}
	    },

	   	clicked: function() {
	        /* Handle the click */
	        console.log("Clicked spell icon");
	    },
	});
});