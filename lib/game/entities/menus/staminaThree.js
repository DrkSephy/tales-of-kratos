ig.module(
	'game.entities.menus.staminaThree'
)
.requires(
	'game.entities.abstractions.artebox'
)
.defines(function(){
	EntityStaminaThree = EntityArteBox.extend({

	    type: ig.Entity.TYPE.B,

	    size: {x: 32, y: 32},
	    animSheet: new ig.AnimationSheet('media/hp.png', 32, 32),

	    init: function(x, y, settings){
	    	this.parent(x, y, settings);
	    	this.addAnim('idle', 0.1, [0]);
	    },

	    update: function(){
	    	if(ig.game.skillsCatalog['health3'].active){
	    		this.currentAnim = this.anims.idle;
	    	} else 
	    		this.currentAnim.alpha = 0.3;
	    },

	   	clicked: function() {
	        /* Handle the click */
	        console.log("Clicked health3 icon");
	        if(!ig.game.skillsCatalog['health3'].active){
	        	var player = ig.game.getEntitiesByType( EntityPlayer )[0];
	        	player.stats.maxHP += ig.game.skillsCatalog['health3'].increase;
	        	player.health += ig.game.skillsCatalog['health3'].increase;
	        	ig.game.skillsCatalog['health3'].active = true;
	        }
	    },
	});
});