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
			active: false,
			points: 1
		},

		attack1: {
			increase: 20,
			active: false,
			points: 1
		},

		defense1: {
			increase: 20,
			active: false,
			points: 1
		},

		health3: {
			increase: 80,
			active: false,
			points: 3
		},

		mana1: {
			increase: 20,
			active: false,
			points: 1
		},

		skill1: {
			active: false,
			points: 5
		},

		attack2: {
			increase: 20,
			active: false,
			points: 2
		},

		// Red route
		defense2: {
			increase: 10,
			active: false,
			points: 2
		},

		mana2: {
			increase: 30,
			active: false,
			points: 2
		},

		skill2: {
			active: false,
			points: 5
		},

		attack3: {
			increase: 40,
			active: false,
			points: 3
		},

		healthIncrease4: {
			increase: 100,
			active: false,
			points: 4
		},

		skill3: {
			active: false,
			points: 5
		},

		healthIncrease2: {
			increase: 200,
			active: false,
			points: 2
		},

		// Green route
		attack4: {
			increase: 30,
			active: false,
			points: 4
		},

		defense3: {
			increase: 30,
			active: false,
			points: 3
		},

		healthIncrease5: {
			increase: 200,
			active: false,
			points: 5
		},

		mana3: {
			increase: 40,
			active: false,
			points: 3
		},

		attack5: {
			increase: 50,
			active: false,
			points: 5
		},

		defense4: {
			increase: 50,
			active: false,
			points: 4
		},

		skill4: {
			active: false,
			points: 5
		}
	});
});