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

		skill1: {
			active: false
		},

		attack2: {
			increase: 20,
			active: false
		},

		// Red route
		defense2: {
			increase: 10,
			active: false
		},

		mana2: {
			increase: 30,
			active: false
		},

		skill2: {
			active: false
		},

		attack3: {
			increase: 40,
			active: false
		},

		healthIncrease4: {
			increase: 100,
			active: false
		},

		skill3: {
			active: false
		},

		healthIncrease2: {
			increase: 200,
			active: false
		},

		// Green route
		attack4: {
			increase: 30,
			active: false
		}
	});
});