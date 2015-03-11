ig.module(
	'game.entities.artes'
)
.requires(
	'impact.game'
)
.defines(function() {
	ig.global.ArtesCatalog = ig.Class.extend({

		lightningBlade: {
			tp : 10,
			dmg: 20,
			element: 'lightning',
			level: 1,
			points: 0
		},

		hellPyre: {
			tp: 20,
			dmg: 40,
			element: 'fire',
			level: 1,
			points: 0
		}
	});
});