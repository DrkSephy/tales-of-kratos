/*
 * minimap
 * https://github.com/dryas/impactjs-minimap
 *
 * v1.1.0
 *
 * A plugin for the ImpactJS engine to display minimaps and a radar for entities.
 *
 * Benjamin Kaiser
 * me@benjaminkaiser.biz
 * http://www.benjaminkaiser.biz
 *
 * This work is licensed under the MIT License (MIT). To view a copy of this license, visit https://github.com/dryas/impactjs-minimap/blob/master/LICENSE.
 *
 * It would be very nice when you inform me, with an short email, when you are using this plugin in a project. Thanks.
 */

ig.module(
	'plugins.minimap.minimap'
)
.requires(
	'impact.game'
)
.defines(function() {
	ig.Game.inject({

	// Cache for the map canvases:
	maps: [],

	/*
	 * drawMiniMap(name, posx, posy, entities = [])
	 *
	 * Draws a map on the screen.
	 *
	 * Parameters:
	 *      name           = Name of the map to display (same as
	 *                       used on generateMiniMap())
	 *      posx           = Position (X) where the map should be displayed
	 *      posy           = Position (Y) where the map should be displayed
	 *      entities       = Array of entities which position should be 
	 *                       displayed on the map
	 *      showviewport   = [true/false] Show the current viewport on Map
	 *      viewportcolor  = Define color of screenclipping
	 */
	drawMiniMap: function(name, posx, posy, entities, showviewport, viewportcolor)
	{
		// Needed parameters:
		if (typeof name === 'undefined')
			throw "minimap plugin [drawMiniMap()]: no name parameter set";

		// Optional parameters "posx" and "posy". Set to ("posx", "posy") 0 by default:
		posx = typeof posx !== 'undefined' ? posx : 0;
		posy = typeof posy !== 'undefined' ? posy : 0;

		// Optional parameter "viewport" and "viewportcolor":
		viewport = typeof viewport !== 'undefined' ? viewport : false;
		viewportcolor = typeof viewportcolor !== 'undefined' ? viewportcolor : '#f0f';

		// Get scaling factor:
		var s = ig.system.scale;

		// Get canvas and 2d context:
		var ctx = ig.system.context;

		// Save current state of the canvas:
		ctx.save();

		// Draw minimap background:
		ctx.drawImage(this.maps[name], posx, posy);

		// Draw entities position on the minimap:
		if (typeof entities !== 'undefined')
		{
			for(var entityid = 0; entityid < entities.length; entityid++)
			{
				// Get entities by type:
				var entity = this.getEntitiesByType(entities[entityid]);

				for (i=0; i < entity.length; i++) 
				{
					// Calculate x and y:
					x = posx + (this.maps[name + '_offsetX'] * s) + (((this.maps[name].width - ((this.maps[name + '_offsetX'] * 2) * s))) * (entity[i].pos.x / ig.game.collisionMap.pxWidth));
					y = posy + (this.maps[name + '_offsetY'] * s) + (((this.maps[name].height - ((this.maps[name + '_offsetY'] * 2) * s)))* (entity[i].pos.y / ig.game.collisionMap.pxHeight));

					// Draw entity as dot on the map or use an icon:
					if (typeof entity[i].miniMap['icon'] !== 'undefined')
					{
						typeof entity[i].miniMap['iconOffset']['x'] !== 'undefined' ? entity[i].miniMap['iconOffset']['x'] : 0;
						typeof entity[i].miniMap['iconOffset']['y'] !== 'undefined' ? entity[i].miniMap['iconOffset']['y'] : 0;

						var mapIcon = new ig.Image(entity[i].miniMap['icon']);

						// Draw Icon:
						mapIcon.draw(
							(x / s) + (this.maps[name].width / ig.game.collisionMap.width / 2) - (entity[i].miniMap['mapSize'] / 2) - (mapIcon.width / 2) + entity[i].miniMap['iconOffset']['x'],
							(y / s) + (this.maps[name].height / ig.game.collisionMap.height / 2) - (entity[i].miniMap['mapSize'] / 2) - (mapIcon.height / 2) + entity[i].miniMap['iconOffset']['y']
						);
					}
					else
					{
						typeof entity[i].miniMap['mapSize'] !== 'undefined' ? entity[i].miniMap['mapSize'] : 5;
						typeof entity[i].miniMap['mapColor'] !== 'undefined' ? entity[i].miniMap['mapColor'] : '#FFFFFF';

						ctx.fillStyle = entity[i].miniMap['mapColor'];

						// Draw square:
						ctx.fillRect(
							x + ((this.maps[name].width / ig.game.collisionMap.width) / 2) - (entity[i].miniMap['mapSize'] / 2),
							y + ((this.maps[name].height / ig.game.collisionMap.height) / 2) - (entity[i].miniMap['mapSize'] / 2),
							entity[i].miniMap['mapSize'],
							entity[i].miniMap['mapSize']
						);
					}
				}
			}
		}

		// Draw viewport:
		if (showviewport)
		{
			// Load background map data:
			var bglayers = ig.game.backgroundMaps;

			// Get the current layer:
			var map = bglayers[0];

			var viewportx = ((this.maps[name].width / s * (ig.system.width / ig.game.collisionMap.pxWidth)) * s) - (this.maps[name + '_offsetX'] * 2);
			var viewporty = ((this.maps[name].width / s * (ig.system.height / ig.game.collisionMap.pxWidth)) * s) - (this.maps[name + '_offsetY'] * 2);
			// Add 0.5 to the starting position (workaround to draw sharp shapes):
			var xa = ((this.maps[name + '_offsetX'] * s) + (this.maps[name].width - (this.maps[name + '_offsetX'] * s * 2)) * (map.scroll.x / ig.game.collisionMap.pxWidth)) + posx + + 0.5;
			var ya = ((this.maps[name + '_offsetY'] * s) + (this.maps[name].height - (this.maps[name + '_offsetY'] * s * 2)) * (map.scroll.y / ig.game.collisionMap.pxHeight)) + posy + 0.5;

			ctx.lineWidth = 1;
			ctx.strokeStyle = viewportcolor;
			ctx.strokeRect(
				xa,
				ya,
				viewportx,
				viewporty
			);
		}

		// Restore former state of the canvas:
		ctx.restore();
	},

	/*
	 * generateMiniMap(name, width, height, layer = [0])
	 *
	 * Generates a map, needs to be called in the init function.
	 *
	 * Parameters:
	 *      name      = Name of the map to generate (need to be used at
	 *                  drawMiniMap())
	 *      width     = Width of the minimap
	 *      height    = Height of the minimap
	 *      layer     = Array of layer ids that should be displayed on
	 *                  the generated map
	 *
	 * ATTENTION: Do NOT call it in the draw function because this will have
	 *            a big impact on performance, if the map needs to be redrawn
	 *            on every frame!
	 */
	generateMiniMap: function(name, width, height, layer)
	{
		// Needed parameters:
		if (typeof name === 'undefined')
			throw "minimap plugin [generateMiniMap()]: no name parameter set";
		if (typeof width === 'undefined')
			throw "minimap plugin [generateMiniMap()]: no width parameter set";
		if (typeof height === 'undefined')
			throw "minimap plugin [generateMiniMap()]: no height parameter set";

		// Optional parameter "layer". Set to (Layer) 0 by default:
		layer = typeof layer !== 'undefined' ? layer : [0];

		// Get scaling factor:
		var s = ig.system.scale;

		// create the minimap canvas
		var maptemp = ig.$new('canvas');
		maptemp.width = width * s;
		maptemp.height = height * s;

		// Get the canvas 2d context for map creation:
		var ctx = maptemp.getContext('2d');

		// Set solid background color for map:
		if(ig.game.clearColor)
		{
			ctx.fillStyle = ig.game.clearColor;
			ctx.fillRect(0, 0, maptemp.width, maptemp.height);
		}

		// Load background map data:
		var bglayers = ig.game.backgroundMaps;

		// Cycle through all layers that should be included in the map:
		for(var layerid = 0; layerid < layer.length; layerid++)
		{
			// Get the current layer:
			var map = bglayers[layer[layerid]];

			// Set fixed tilesize factor:
			var fWidth = 4;
			var fHeight = 4;

			// Calculate size of the tileset:
			var w = map.tiles.width * s;
			var h = map.tiles.height * s;
			var ws = w / map.tilesize * fWidth;
			var hs = h / map.tilesize * fHeight;

			// Resize tileset of the current map:
			var ts = ig.$new('canvas');
			var tsctx = ts.getContext('2d');
			ts.width = ws;
			ts.height = hs;
			tsctx.drawImage(map.tiles.data, 0, 0, w, h, 0, 0, ws, hs);

			this.maps[name + '_offsetX'] = Math.floor((width - (map.width * Math.floor(width / map.width))) / 2);
			this.maps[name + '_offsetY'] = Math.floor((height - (map.height * Math.floor(height / map.height))) / 2);

			// draw the map
			var tile = 0;

			for(var x = 0; x < map.width; x++)
			{
				for(var y = 0; y < map.height; y++)
				{
					// Does a tile exists on this position?
					if((tile = map.data[y][x]))
					{
						ctx.drawImage(
							ts,
							Math.floor(((tile-1) * s) % (ws/fWidth)) * fWidth,
							(Math.floor((tile-1) * s / (ws/fHeight)) * fHeight) * s,
							fWidth * s,
							fHeight * s,
							((x * Math.floor(width / map.width)) + this.maps[name + '_offsetX']) * s,
							((y * Math.floor(height / map.height)) + this.maps[name + '_offsetY']) * s,
							Math.floor(width / map.width) * s,
							Math.floor(height / map.height) * s
						);
					}
				}
			}

			// Cache map:
			this.maps[name] = maptemp;
		}
	}
	})
});