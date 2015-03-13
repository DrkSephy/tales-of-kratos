ig.module(
	'game.entities.menus.artemenu'
)
.requires(
	'impact.entity'
)
.defines(function(){
	EntityArteMenu = ig.Entity.extend({

	    type: ig.Entity.TYPE.B,
	    checkAgainst: ig.Entity.TYPE.A,
	    collides: ig.Entity.COLLIDES.ACTIVE,

	    size: {x: 16, y: 16},
	    animSheet: new ig.AnimationSheet('media/sword.png', 16, 16),
	    zIndex: 100,

	    init: function(x, y, settings){
	    	this.parent(x, y, settings);
	    	this.addAnim('idle', 0.1, [0]);
	    },

	    update: function(){
	    	this.currentAnim = this.anims.idle;
	    },

	    clicked: function() {
	        /* Handle the click */
	        console.log("Clicked sword icon");
	        var player = ig.game.getEntitiesByType('EntityPlayer')[0];
	        if(player.accel.x === 0 && player.accel.y === 0 && ig.game.gameState !== 'spellsMenu'){
		        ig.game.gameState = 'artesMenu';
		        ig.game.menuVisible = true; 
		    }
	    },
	});
});