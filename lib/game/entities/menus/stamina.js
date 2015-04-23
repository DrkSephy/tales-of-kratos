ig.module(
	'game.entities.menus.stamina'
)
.requires(
	'game.entities.abstractions.artebox'
)
.defines(function(){
	EntityStamina = EntityArteBox.extend({

	    type: ig.Entity.TYPE.B,

	    size: {x: 32, y: 32},
	    animSheet: new ig.AnimationSheet('media/hp.png', 32, 32),

	    init: function(x, y, settings){
	    	this.parent(x, y, settings);
	    	this.addAnim('idle', 0.1, [0]);
	    	if(!ig.game.skillsCatalog['healthIncrease1'].active){
	        	var player = ig.game.getEntitiesByType( EntityPlayer )[0];
	        	ig.game.skillsCatalog['healthIncrease1'].active = true;
	        }
	    },

	    update: function(){
	    	if(ig.game.skillsCatalog['healthIncrease1'].active){
	    		this.currentAnim = this.anims.idle;
	    	} else 
	    		this.currentAnim.alpha = 0.3;
	    },

	   	clicked: function() {
	        /* Handle the click */
	        console.log("Clicked stamina icon");
	    },
	});
});