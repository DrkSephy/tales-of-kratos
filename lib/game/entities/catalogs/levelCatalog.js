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
			atkIncrease: 2,
			magIncrease: 1,
			defIncrease: 3, 
			spdIncrease: 1, 
			hpIncrease: 1, 
			tpIncrease: 1, 
			abPoints: 1, 
			skillPoints: 1
		},

		2: {
			expToNext: 100,
			expTotal: 0,
			expOverflow: 0,
			atkIncrease: 1,
			magIncrease: 2,
			defIncrease: 1, 
			spdIncrease: 3, 
			hpIncrease: 1, 
			tpIncrease: 1,
			abPoints: 1, 
			skillPoints: 1
		},

		3: {
			expToNext: 200,
			expTotal: 0, 
			expOverflow: 0, 
			atkIncrease: 2,
			magIncrease: 1,
			defIncrease: 2, 
			spdIncrease: 1, 
			hpIncrease: 2, 
			tpIncrease: 1, 
			abPoints: 1, 
			skillPoints: 1
		},

		4: {
			expToNext: 250,
			expTotal: 0, 
			expOverflow: 0, 
			atkIncrease: 1,
			magIncrease: 1,
			defIncrease: 2, 
			spdIncrease: 1, 
			hpIncrease: 1, 
			tpIncrease: 1,
			abPoints: 2, 
			skillPoints: 2
		},

		5: {
			expToNext: 350,
			expTotal: 0, 
			expOverflow: 0, 
			atkIncrease: 1,
			magIncrease: 1,
			defIncrease: 1, 
			spdIncrease: 1, 
			hpIncrease: 2, 
			tpIncrease: 2,
			abPoints: 1, 
			skillPoints: 2
		},

		6: {
			expToNext: 400,
			expTotal: 0, 
			expOverflow: 0, 
			atkIncrease: 1,
			magIncrease: 1,
			defIncrease: 0, 
			spdIncrease: 2, 
			hpIncrease: 1, 
			tpIncrease: 0,
			abPoints: 1, 
			skillPoints: 3
		},

		7: {
			expToNext: 575,
			expTotal: 0, 
			expOverflow: 0, 
			atkIncrease: 1,
			magIncrease: 0,
			defIncrease: 1, 
			spdIncrease: 1, 
			hpIncrease: 5, 
			tpIncrease: 0,
			abPoints: 1, 
			skillPoints: 1
		},

		8: {
			expToNext: 700,
			expTotal: 0, 
			expOverflow: 0, 
			atkIncrease: 1,
			magIncrease: 1,
			defIncrease: 2, 
			spdIncrease: 1, 
			hpIncrease: 1, 
			tpIncrease: 1,
			abPoints: 1, 
			skillPoints: 1
		},

		9: {
			expToNext: 825,
			expTotal: 0, 
			expOverflow: 0, 
			atkIncrease: 2,
			magIncrease: 4,
			defIncrease: 4, 
			spdIncrease: 5, 
			hpIncrease: 3, 
			tpIncrease: 5,
			abPoints: 1, 
			skillPoints: 5
		},

		10: {
			expToNext: 975,
			expTotal: 0, 
			expOverflow: 0, 
			atkIncrease: 6,
			magIncrease: 2,
			defIncrease: 2, 
			spdIncrease: 4, 
			hpIncrease: 2, 
			tpIncrease: 6,
			abPoints: 5, 
			skillPoints: 3
		},

	});
});