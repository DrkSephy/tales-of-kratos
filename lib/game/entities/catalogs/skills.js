ig.module(
	'game.entities.catalogs.skills'
)
.requires(
	'impact.game'
)
.defines(function() {
	ig.global.SkillsCatalog = ig.Class.extend({

		healthIncrease1: {
			increase: 100,
			active: false
		},

		healthIncrease2: {
			increase: 200,
			active: false
		}
	});
});