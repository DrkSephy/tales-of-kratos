ig.module(
	'game.entities.catalogs.skills'
)
.requires(
	'impact.game'
)
.defines(function() {
	ig.global.SkillsCatalog = ig.Class.extend({

		healthIncrease: {
			increase: 100,
			active: false
		},
	});
});