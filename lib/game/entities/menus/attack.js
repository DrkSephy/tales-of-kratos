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
	        var player = ig.game.getEntitiesByType( EntityPlayer )[0];
	        console.log("Clicked attack1 icon");
	        console.log(ig.game.skillsCatalog['healthIncrease1'].active)
	        if(ig.game.skillsCatalog['healthIncrease1'].active){
		        if(!ig.game.skillsCatalog['attack1'].active && player.abilityPoints >= ig.game.skillsCatalog['attack1'].points){
		        	player.stats.str += ig.game.skillsCatalog['attack1'].increase;
		        	ig.game.skillsCatalog['attack1'].active = true;
		        	player.abilityPoints -= ig.game.skillsCatalog['attack1'].points;
		        }
		    }
	    },
	});
});