ig.module(
	'game.entities.catalogs.skills'
)
.requires(
	'impact.game'
)
.defines(function() {
	ig.global.SkillsCatalog = ig.Class.extend({

		// Blue route
		healthIncrease1: {
			increase: 100,
			active: false
		},

		attack1: {
			increase: 20,
			active: false
		},

		defense1: {
			increase: 20,
			active: false
		},

		health3: {
			increase: 80,
			active: false
		},

		mana1: {
			increase: 20,
			active: false
		},


		healthIncrease2: {
			increase: 200,
			active: false
		}
	});
});