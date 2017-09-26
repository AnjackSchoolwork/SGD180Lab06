/*
	TODO:
		- Build method to load all images prior to starting game
*/

modes = {}
modes.inMenu = 0
modes.inLevel = 1
modes.exiting = 2

player = {}
player.speed = 0
player.maxSpeed = 100
player.acceleration = 5
player.deceleration = -20
player.leftAngle = -45
player.rightAngle = 45
player.startX = 400
player.startY = 300

function setup() {

	gameMode = modes.inLevel
	scene = new Scene()

	player.sprite = initializeEntity(scene, 'img/player_car_small.png', 128, 64, player.startX, player.startY, 0, player.speed)

	scene.start()
}

function update() {
	scene.clear()

	setPlayerVector2d()

	if (gameMode == modes.inLevel) {
		player.sprite.update()
	}
}

function loadConfig() {

}

function initializeEntity(scene, image, w, h, x, y, angle, speed) {
	console.log(angle)

	if (angle == null)
		angle = 0

	if (speed == null)
		speed = 0

	if (x == null)
		x = scene.width / 2

	if (y == null)
		y = scene.height / 2

	var tempSprite = new Sprite(scene, image, w, h)
	tempSprite.setAngle(angle)
	tempSprite.setSpeed(speed)
	

	return tempSprite
}

function setPlayerVector2d() {

	if (keysDown[K_UP]) {
		// increase speed
		if (player.speed < player.maxSpeed) {
			player.speed += player.acceleration
		}
	}

	if (keysDown[K_DOWN]) {
		// reduce speed
		if (player.speed > 0) {
			player.speed -= player.deceleration
		}
	}

	player.sprite.setAngle(0)

	if (keysDown[K_LEFT]) {
		// steer left
		player.sprite.setAngle(player.leftAngle)
	}

	if (keysDown[K_RIGHT]) {
		// steer right
		player.sprite.setAngle(player.rightAngle)
	}

	if (player.sprite.speed < 0)
		player.sprite.setSpeed(0)
}