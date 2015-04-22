ig.module(
	'game.entities.menus.attackThree'
)
.requires(
	'game.entities.abstractions.artebox'
)
.defines(function(){
	EntityAttackThree = EntityArteBox.extend({

	    type: ig.Entity.TYPE.B,

	    size: {x: 32, y: 32},
	    animSheet: new ig.AnimationSheet('media/attack.png', 32, 32),

	    init: function(x, y, settings){
	    	this.parent(x, y, settings);
	    	this.addAnim('idle', 0.1, [0]);
	    },

	    update: function(){
	    	if(ig.game.skillsCatalog['attack3'].active){
	    		this.currentAnim = this.anims.idle;
	    	} else 
	    		this.currentAnim.alpha = 0.3;
	    },

	   	clicked: function() {
	        /* Handle the click */
	        var player = ig.game.getEntitiesByType( EntityPlayer )[0];
	        console.log("Clicked attack3 icon");
	        if(ig.game.skillsCatalog['healthIncrease1'].active && ig.game.skillsCatalog['defense2'].active 
	        	&& ig.game.skillsCatalog['mana2'].active && ig.game.skillsCatalog['skill2'].active){
		        if(!ig.game.skillsCatalog['attack3'].active && player.abilityPoints >= ig.game.skillsCatalog['attack3'].points){
		        	player.stats.str += ig.game.skillsCatalog['attack3'].increase;
		        	ig.game.skillsCatalog['attack3'].active = true;
		        	player.abilityPoints -= ig.game.skillsCatalog['attack3'].points;
		        }
		    }
	    },
	});
});