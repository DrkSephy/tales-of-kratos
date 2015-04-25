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
			expOverflow: 0,
			atkIncrease: 90
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

		4: {
			expToNext: 400, 
			expTotal: 0, 
			expOverflow: 0
		}

		5: {
			expToNext: 800, 
			expTotal: 0, 
			expOverflow: 0
		}

		6: {
			expToNext: 1600, 
			expTotal: 0, 
			expOverflow: 0
		}

		7: {
			expToNext: 3200, 
			expTotal: 0, 
			expOverflow: 0
		}

		8: {
			expToNext: 6400, 
			expTotal: 0, 
			expOverflow: 0
		}

		9: {
			expToNext: 12800, 
			expTotal: 0, 
			expOverflow: 0
		}

		10: {
			expToNext: 25600, 
			expTotal: 0, 
			expOverflow: 0
		}
	});
});