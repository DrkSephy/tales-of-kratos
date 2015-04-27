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
			atkIncrease: 2,
			magIncrease: 1,
			defIncrease: 3, 
			spdIncrease: 1, 
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
			defIncrease: 3, 
			spdIncrease: 1, 
			hpIncrease: 1, 
			tpIncrease: 1, 
			abPoints: 1, 
			skillPoints: 1
		},

		4: {
			expToNext: 250,
			expTotal: 0, 
			expOverflow: 0, 
			atkIncrease: 0,
			magIncrease: 0,
			defIncrease: 0, 
			spdIncrease: 0, 
			hpIncrease: 0, 
			tpIncrease: 0,
			abPoints: 1, 
			skillPoints: 1
		},

		5: {
			expToNext: 350,
			expTotal: 0, 
			expOverflow: 0, 
			atkIncrease: 0,
			magIncrease: 0,
			defIncrease: 0, 
			spdIncrease: 0, 
			hpIncrease: 0, 
			tpIncrease: 0,
			abPoints: 1, 
			skillPoints: 1
		},

		6: {
			expToNext: 400,
			expTotal: 0, 
			expOverflow: 0, 
			atkIncrease: 0,
			magIncrease: 0,
			defIncrease: 0, 
			spdIncrease: 0, 
			hpIncrease: 0, 
			tpIncrease: 0,
			abPoints: 1, 
			skillPoints: 1
		},

		7: {
			expToNext: 575,
			expTotal: 0, 
			expOverflow: 0, 
			atkIncrease: 0,
			magIncrease: 0,
			defIncrease: 0, 
			spdIncrease: 0, 
			hpIncrease: 0, 
			tpIncrease: 0,
			abPoints: 1, 
			skillPoints: 1
		},

		8: {
			expToNext: 700,
			expTotal: 0, 
			expOverflow: 0, 
			atkIncrease: 0,
			magIncrease: 0,
			defIncrease: 0, 
			spdIncrease: 0, 
			hpIncrease: 0, 
			tpIncrease: 0,
			abPoints: 1, 
			skillPoints: 1
		},

		9: {
			expToNext: 825,
			expTotal: 0, 
			expOverflow: 0, 
			atkIncrease: 0,
			magIncrease: 0,
			defIncrease: 0, 
			spdIncrease: 0, 
			hpIncrease: 0, 
			tpIncrease: 0,
			abPoints: 1, 
			skillPoints: 1
		},

		10: {
			expToNext: 975,
			expTotal: 0, 
			expOverflow: 0, 
			atkIncrease: 0,
			magIncrease: 0,
			defIncrease: 0, 
			spdIncrease: 0, 
			hpIncrease: 0, 
			tpIncrease: 0,
			abPoints: 1, 
			skillPoints: 1
		},

	});
});