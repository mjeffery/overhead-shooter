var game = new Phaser.Game(800, 600, Phaser.AUTO, 'game-container');

game.state.add('boot', Boot);
game.state.add('preload', Preload);
game.state.add('game', Game);

game.state.start('boot');

Page.onShow.add(function() { game.input.gamepad.start() });
Page.onHide.add(function() { game.input.gamepad.stop() });
