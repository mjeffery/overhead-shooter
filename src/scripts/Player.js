(function(exports){ 
	function Player(game, x, y) {
		Phaser.Sprite.call(this, game, x, y, 'player');

		this.anchor.setTo(0.5, 0.5);
		this.leftStick = new Phaser.Point();
		this.rightStick = new Phaser.Point();

		game.physics.enable(this, Phaser.Physics.ARCADE);

		this.bullets = new PlayerBulletGroup(game);

		game.input.gamepad.start();
	}

	_.extend(Player, {
		preload: function(load) {
			load.image('player', 'assets/img/player.png');
		},
		Controls: {
			Deadzone: 0.1
		},
		Physics: {
			Speed: 500
		}
	}); 

	Player.prototype = Object.create(Phaser.Sprite.prototype);
	Player.prototype.constructor = Player;

	_.extend(Player.prototype, {

		isGamepadEnabled: function() {
			var gamepad = this.game.input.gamepad;
			return gamepad.supported && gamepad.active && gamepad.pad1.connected;
		},

		think: function() {
			if(this.isGamepadEnabled()) {
				var pad = this.game.input.gamepad.pad1;		

				var lx = pad.axis(Phaser.Gamepad.XBOX360_STICK_LEFT_X);
				var ly = pad.axis(Phaser.Gamepad.XBOX360_STICK_LEFT_Y);
				var leftStick = this.leftStick;

				leftStick.setTo(lx, ly);

				var magnitude = leftStick.getMagnitude();
					
				this.body.velocity.copyFrom(leftStick);
				this.body.velocity.setMagnitude(magnitude * Player.Physics.Speed);

				var rx = pad.axis(Phaser.Gamepad.XBOX360_STICK_RIGHT_X);
				var ry = pad.axis(Phaser.Gamepad.XBOX360_STICK_RIGHT_Y);
				var rightStick = this.rightStick; 

				rightStick.setTo(rx, ry);

				if(!rightStick.isZero()) {
					var bullet = this.bullets.obtain(this.x, this.y);
					bullet.fire(rightStick, 400);

					this.rotation = Math.atan2(rightStick.y, rightStick.x);
				}
				
			}

			this.updateWeapon();
		},

		updateWeapon: function() {
			if(this.isGamepadEnabled()) {
				var pad = this.game.input.gamepad.pad1;		
				var rightStick = this.rightStick; 

				var rx = pad.axis(Phaser.Gamepad.XBOX360_STICK_RIGHT_X);
				var ry = pad.axis(Phaser.Gamepad.XBOX360_STICK_RIGHT_Y);
				rightStick.setTo(rx, ry);

				if(!rightStick.isZero()) {
					var bullet = this.bullets.obtain(this.x, this.y);
					bullet.fire(rightStick, 400);

					this.rotation = Math.atan2(rightStick.y, rightStick.x);
				}

			}	
		}
	});

	exports.Player = Player;

})(this);
