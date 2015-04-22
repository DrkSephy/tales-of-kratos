ig.module(
	'game.entities.menus.skillFour'
)
.requires(
	'game.entities.abstractions.artebox'
)
.defines(function(){
	EntitySkillFour = EntityArteBox.extend({

	    type: ig.Entity.TYPE.B,

	    size: {x: 32, y: 32},
	    animSheet: new ig.AnimationSheet('media/hellpyre.png', 32, 32),

	    init: function(x, y, settings){
	    	this.parent(x, y, settings);
	    	this.addAnim('idle', 0.1, [0]);
	    },

	    update: function(){
	    	if(ig.game.skillsCatalog['skill4'].active){
	    		this.currentAnim = this.anims.idle;
	    	} else 
	    		this.currentAnim.alpha = 0.3;
	    },

	   	clicked: function() {
	        /* Handle the click */
	        var player = ig.game.getEntitiesByType( EntityPlayer )[0];
	        console.log("Clicked skill4 icon");
	        if(ig.game.skillsCatalog['healthIncrease1'].active && ig.game.skillsCatalog['attack4'].active
	        	&& ig.game.skillsCatalog['defense3'].active && ig.game.skillsCatalog['healthIncrease5'].active
	        	&& ig.game.skillsCatalog['mana3'].active && ig.game.skillsCatalog['attack5'].active
		        && ig.game.skillsCatalog['defense4'].active){
		        if(!ig.game.skillsCatalog['skill4'].active && player.abilityPoints >= ig.game.skillsCatalog['skill4'].points){
		        	ig.game.artesCatalog['hellPyre'].active = true;
		        	ig.game.skillsCatalog['skill4'].active = true;
		        	player.abilityPoints -= ig.game.skillsCatalog['skill4'].points;
		        }
		    }
	    },
	});
});