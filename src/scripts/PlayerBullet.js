(function(exports) {

	function PlayerBullet(game, x, y) {
		Phaser.Sprite.call(this, game, x, y, 'player-bullet');
		this.anchor.setTo(0.75, 0.5);

		this.outOfBoundsKill = true;
		this.checkWorldBounds = true;

		game.physics.enable(this, Phaser.Physics.ARCADE);
		// set collision box

	}

	_.extend(PlayerBullet, {
		preload: function(load) {
			load.image('player-bullet', 'assets/img/player bullet.png');
		}
	});

	PlayerBullet.prototype = Object.create(Phaser.Sprite.prototype);
	PlayerBullet.prototype.constructor = PlayerBullet;

	_.extend(PlayerBullet.prototype, {
		fire: function() {
			var x, y, speed;

			if(arguments.length > 2) {
				x = arguments[0];
				y = arguments[1];
				speed = arguments[2]
			}
			else {
				x = arguments[0].x;
				y = arguments[0].y;
				speed = arguments[1];
			}

			var theta = Math.atan2(y, x);
			this.game.physics.arcade.velocityFromRotation(theta, speed, this.body.velocity);
			this.rotation = theta;
		}
	});

	exports.PlayerBullet = PlayerBullet;

})(this);
