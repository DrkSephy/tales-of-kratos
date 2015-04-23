ig.module(
	'game.entities.menus.staminaFive'
)
.requires(
	'game.entities.abstractions.artebox'
)
.defines(function(){
	EntityStaminaFive = EntityArteBox.extend({

	    type: ig.Entity.TYPE.B,

	    size: {x: 32, y: 32},
	    animSheet: new ig.AnimationSheet('media/hp.png', 32, 32),

	    init: function(x, y, settings){
	    	this.parent(x, y, settings);
	    	this.addAnim('idle', 0.1, [0]);
	    },

	    update: function(){
	    	if(ig.game.skillsCatalog['healthIncrease5'].active){
	    		this.currentAnim = this.anims.idle;
	    	} else 
	    		this.currentAnim.alpha = 0.3;
	    },

	   	clicked: function() {
	        /* Handle the click */
	        var player = ig.game.getEntitiesByType( EntityPlayer )[0];
	        console.log("Clicked healthIncrease5 icon");
	        if(ig.game.skillsCatalog['healthIncrease1'].active && ig.game.skillsCatalog['attack4'].active
	        	&& ig.game.skillsCatalog['defense3'].active){
		        if(!ig.game.skillsCatalog['healthIncrease5'].active && player.abilityPoints >= ig.game.skillsCatalog['healthIncrease5'].points){
		        	player.stats.maxHP += ig.game.skillsCatalog['healthIncrease5'].increase;
		        	player.health += ig.game.skillsCatalog['healthIncrease5'].increase;
		        	ig.game.skillsCatalog['healthIncrease5'].active = true;
		        	player.abilityPoints -= ig.game.skillsCatalog['healthIncrease5'].points;
		        }
		    }
	    },
	});
});