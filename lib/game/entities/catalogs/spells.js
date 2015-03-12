ig.module(
	'game.entities.catalogs.spells'
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
			element: 'fire',
			points: 0
		},

		lightning: {
			tp: 5,
			dmg: 7,
			time: 2,
			element: 'lightning',
			points: 0
		},

		wind: {
			tp: 5,
			dmg: 5,
			time: 3,
			element: 'wind',
			points: 0
		},

		heal: {
			tp: 10,
			dmg: -10,
			time: 3,
			element: 'heal',
			points: 0
		}
	});
});