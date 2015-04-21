ig.module(
	'game.entities.menus.spellmenu'
)
.requires(
	'impact.entity'
)
.defines(function(){
	EntitySpellMenu = ig.Entity.extend({

	    type: ig.Entity.TYPE.B,
	    checkAgainst: ig.Entity.TYPE.A,
	    collides: ig.Entity.COLLIDES.ACTIVE,

	    size: {x: 16, y: 16},
	    animSheet: new ig.AnimationSheet('media/wizardhat.png', 16, 16),
	    zIndex: 100,

	    init: function(x, y, settings){
	    	this.parent(x, y, settings);
	    	this.addAnim('idle', 0.1, [0]);
	    },

	    update: function(){
	    	this.currentAnim = this.anims.idle;
	    },


	});
});