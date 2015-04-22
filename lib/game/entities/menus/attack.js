ig.module(
	'game.entities.menus.attack'
)
.requires(
	'game.entities.abstractions.artebox'
)
.defines(function(){
	EntityAttack = EntityArteBox.extend({

	    type: ig.Entity.TYPE.B,

	    size: {x: 32, y: 32},
	    animSheet: new ig.AnimationSheet('media/attack.png', 32, 32),

	    init: function(x, y, settings){
	    	this.parent(x, y, settings);
	    	this.addAnim('idle', 0.1, [0]);
	    },

	    update: function(){
	    	if(ig.game.skillsCatalog['attack1'].active){
	    		this.currentAnim = this.anims.idle;
	    	} else 
	    		this.currentAnim.alpha = 0.3;
	    },

	   	clicked: function() {
	        /* Handle the click */
	        console.log("Clicked attack1 icon");
	        if(ig.game.skillsCatalog['healthIncrease1'].active){
		        if(!ig.game.skillsCatalog['attack1'].active){
		        	var player = ig.game.getEntitiesByType( EntityPlayer )[0];
		        	player.stats.str += ig.game.skillsCatalog['attack1'].increase;
		        	ig.game.skillsCatalog['attack1'].active = true;
		        	player.abilityPoints -= ig.game.skillsCatalog['attack1'].points;
		        }
		    }
	    },
	});
});