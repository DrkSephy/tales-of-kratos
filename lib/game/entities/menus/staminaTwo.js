ig.module(
	'game.entities.menus.staminaTwo'
)
.requires(
	'game.entities.abstractions.artebox'
)
.defines(function(){
	EntityStaminaTwo = EntityArteBox.extend({

	    type: ig.Entity.TYPE.B,

	    size: {x: 32, y: 32},
	    animSheet: new ig.AnimationSheet('media/hp.png', 32, 32),

	    init: function(x, y, settings){
	    	this.parent(x, y, settings);
	    	this.addAnim('idle', 0.1, [0]);
	    },

	    update: function(){
	    	if(ig.game.skillsCatalog['healthIncrease2'].active){
	    		this.currentAnim = this.anims.idle;
	    	} else 
	    		this.currentAnim.alpha = 0.1;
	    },

	   	clicked: function() {
	        /* Handle the click */
	        var player = ig.game.getEntitiesByType( EntityPlayer )[0];
	        console.log("Clicked stamina2 icon");
	       	if(ig.game.skillsCatalog['healthIncrease1'].active){
		        if(!ig.game.skillsCatalog['healthIncrease2'].active && player.abilityPoints >= ig.game.skillsCatalog['healthIncrease2'].points){
		        	player.stats.maxHP += 200;
		        	player.health += 200;
		        	ig.game.skillsCatalog['healthIncrease2'].active = true;
		        	player.abilityPoints -= ig.game.skillsCatalog['healthIncrease2'].points;
		        }
		    }
	    },
	});
});