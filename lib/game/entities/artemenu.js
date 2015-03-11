ig.module(
	'game.entities.artemenu'
)
.requires(
	'impact.entity'
)
.defines(function(){
	EntityArteMenu = ig.Entity.extend({
	    type: ig.Entity.TYPE.B,
	    size: {x: 16, y: 16},
	    animSheet: new ig.AnimationSheet('media/sword.png', 16, 16),

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
	        ig.game.gameState = 'artesMenu';
	        ig.game.menuVisible = true; 
	    }
	});
});