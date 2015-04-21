ig.module(
	'game.entities.catalogs.levelCatalog'
)
.requires(
	'impact.game'
)
.defines(function(){
	ig.global.LevelCatalog = ig.Class.extend({
		
		1: {
			expToNext: 50,
			expTotal: 0, 
			expOverflow: 0
		},

		2: {
			expToNext: 100,
			expTotal: 0,
			expOverflow: 0
		},

		3: {
			expToNext: 200,
			expTotal: 0, 
			expOverflow: 0
		}

	});
});