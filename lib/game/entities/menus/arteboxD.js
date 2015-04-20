ig.module(
	'game.entities.menus.arteboxD'
)
.requires(
	'game.entities.abstractions.artebox'
)
.defines(function(){
	EntityArteBoxD = EntityArteBox.extend({

	    type: ig.Entity.TYPE.B,

	    size: {x: 32, y: 32},
	    animSheet: new ig.AnimationSheet('media/demonfangskill.png', 32, 32),

	    init: function(x, y, settings){
	    	this.parent(x, y, settings);
	    	this.addAnim('idle', 0.1, [0]);
	    },

	    update: function(){
	    	if(ig.game.artesCatalog['demonFang'].active){
	    		this.currentAnim = this.anims.idle;
	    	} else {
	    		this.currentAnim.alpha = 0.3;
	    	}
	    },

	   	clicked: function() {
	        /* Handle the click */
	        console.log("Clicked arte icon");
	    },
	});
});