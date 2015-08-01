(function(exports) {
	function PlayerBulletGroup(game) {
		Phaser.Group.call(this, game);

		for(var i = 0; i < PlayerBulletGroup.InitialSize; i++) {
			var bullet = new PlayerBullet(game, 0, 0);
			bullet.kill();
		}
	}

	PlayerBulletGroup.prototype = Object.create(Phaser.Group.prototype);
	PlayerBulletGroup.prototype.constructor = PlayerBulletGroup;

	_.extend(PlayerBulletGroup.prototype, {
		obtain: function(x, y) {
			var bullet = this.getFirstExists(false);
			if(!!bullet) {
				bullet.reset(x, y);
			}
			else {
				bullet = new PlayerBullet(this.game, x, y);
				this.add(bullet);
			}

			return bullet;
		}
	});

	exports.PlayerBulletGroup = PlayerBulletGroup;
})(this);
