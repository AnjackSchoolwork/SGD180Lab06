/*
	TODO:
		- Build method to load all images prior to starting game
*/

drag = -1

modes = {}
modes.inMenu = 0
modes.inLevel = 1
modes.exiting = 2

player = {}
player.maxSpeed = 100
player.acceleration = 5
player.deceleration = -20
player.turnRadius = 5
player.startX = 400
player.startY = 300

function setup() {

	gameMode = modes.inLevel
	scene = new Scene()

	player.sprite = initializeEntity(scene, 'img/player_car_small_long.png', 192, 64, player.startX, player.startY, 0, player.speed)

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
	console.log(x)

	if (angle == null)
		angle = 0

	if (speed == null)
		speed = 0

	if (x == null)
		x = scene.width / 2

	if (y == null)
		y = scene.height / 2

	var tempSprite = new Sprite(scene, image, w, h)
	tempSprite.setPosition(x, y)
	tempSprite.setAngle(angle)
	tempSprite.setSpeed(speed)
	

	return tempSprite
}

function setPlayerVector2d() {

	if (keysDown[K_UP]) {
		// increase speed
		if (player.sprite.speed < player.maxSpeed) {
			player.sprite.changeSpeedBy(player.acceleration)
		}
	}

	if (keysDown[K_DOWN]) {
		// reduce speed
		if (player.sprite.speed > 0 - player.maxSpeed / 2) {
			if (player.sprite.speed > 0) {
				player.sprite.changeSpeedBy(player.deceleration)
			}
			else {
				player.sprite.changeSpeedBy(-player.acceleration)
			}
		}
	}
	
	if (keysDown[K_LEFT]) {
		// steer left
		if(player.sprite.speed != 0)
			player.sprite.changeAngleBy(-player.turnRadius)
	}

	if (keysDown[K_RIGHT]) {
		// steer right
		if(player.sprite.speed != 0)
			player.sprite.changeAngleBy(player.turnRadius)
	}

	// This gets a little jittery. Commenting it out until I figure out the fix.
	//if (keysDown[K_SPACE]) {
	//	if (player.sprite.speed <= player.deceleration * 2.5 && player.sprite.speed >= player.deceleration * -2.5)
	//		player.sprite.setSpeed(0)
	//	else if (player.sprite.speed != 0)
	//		player.sprite.changeSpeedBy(player.deceleration * 2 * (player.sprite.speed / Math.abs(player.sprite.speed)))
	//}

	if (player.sprite.speed < player.acceleration && player.sprite.speed > 0 - player.acceleration)
		player.sprite.setSpeed(0)
	else if (player.sprite.speed != 0)
		player.sprite.changeSpeedBy(drag * (player.sprite.speed / Math.abs(player.sprite.speed)))
}