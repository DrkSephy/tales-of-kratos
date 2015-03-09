ig.module(
	'game.entities.spells'
)
.requires(
	'impact.game'
)
.defines(function() {
	ig.global.SpellsCatalog = ig.Class.extend({

		fireball: {
			tp: 5,
			dmg: 5,
			time: 3,
			element: 'fire'
		},

		lightning: {
			tp: 5,
			dmg: 7,
			time: 2,
			element: 'lightning'
		},

		wind: {
			tp: 5,
			dmg: 5,
			time: 3,
			element: 'wind'
		},

		heal: {
			tp: 10,
			dmg: -10,
			time: 3,
			element: 'heal'
		}
	});
});