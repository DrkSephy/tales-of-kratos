ig.module(
	'game.entities.catalogs.artes'
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
			active: true,
			level: 1,
			points: 0
		},

		hellPyre: {
			tp: 20,
			dmg: 40,
			element: 'fire',
			active: false,
			level: 1,
			points: 0
		},

		sonicThrust: {
			tp : 10,
			dmg: 20,
			element: 'wind',
			active: false,
			level: 1,
			points: 0
		},

		demonFang: {
			tp : 5,
			dmg: 20,
			element: 'wind',
			active: true,
			level: 1,
			points: 0
		},
	});
});