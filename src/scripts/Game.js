(function(exports) {
	function Game() {}

	Game.preload = function(load) {
		load.image('test-tileset', 'assets/img/test tileset.png');
		load.tilemap('test-room', 'assets/tilemap/test room.json', null, Phaser.Tilemap.TILED_JSON);
	}

	Game.prototype = {
		create: function() {
			var game = this.game;

			game.physics.startSystem(Phaser.Physics.ARCADE);

			var map = game.add.tilemap('test-room');
			map.addTilesetImage('test tileset', 'test-tileset');
			map.setCollisionBetween(2, 11);
			map.setCollisionBetween(13, 15);

			var layer = this.walls = map.createLayer('terrain');
			layer.resizeWorld();

			var player = this.player = new Player(game, 128, 128);
			game.add.existing(player);

			game.camera.follow(player);
		},
		update: function() {
			var physics = this.game.physics.arcade;
			var player = this.player;
			var walls = this.walls;

			player.think();

			physics.collide(player, walls);

			
		},
	}

	exports.Game = Game;	
})(this);
