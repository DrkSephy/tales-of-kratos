ig.module(
	'game.entities.menus.skillsMenu'
)
.requires(
	'impact.entity'
)
.defines(function(){
	EntitySkillsMenu = ig.Entity.extend({
		name: 'skillsmenu',
		type: ig.Entity.TYPE.B,
	    checkAgainst: ig.Entity.TYPE.A,
	    size: {x: 320, y: 240},
	    animSheet: new ig.AnimationSheet('media/skillmenu.png', 320, 240),

	    init: function(x, y, settings){
	    	this.parent(x, y, settings);
	    	this.addAnim('idle', 0.1, [0]);
	    },

	    update: function(){
	    	this.currentAnim = this.anims.idle;
	    },
	});
});