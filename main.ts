namespace SpriteKind {
    export const Gas = SpriteKind.create()
}
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    projectile = sprites.createProjectileFromSprite(img`
        3 3 3 3 3 3 3 3 
        3 . . . . . . 3 
        3 . 3 3 3 3 . 3 
        3 . 3 . . 3 . 3 
        3 . 3 . . 3 . 3 
        3 . 3 3 3 3 . 3 
        3 . . . . . . 3 
        3 3 3 3 3 3 3 3 
        `, mySprite, 0, -70)
    projectile.startEffect(effects.ashes)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Gas, function (sprite, otherSprite) {
    statusbar.value = 100
    otherSprite.destroy()
})
statusbars.onZero(StatusBarKind.Energy, function (status) {
    game.over(false)
})
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Enemy, function (sprite, otherSprite) {
    sprite.destroy(effects.bubbles, 500)
    otherSprite.destroy(effects.smiles, 500)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    info.changeLifeBy(-1)
    otherSprite.destroy(effects.disintegrate, 500)
})
let myEnemy: Sprite = null
let myFuel: Sprite = null
let projectile: Sprite = null
let statusbar: StatusBarSprite = null
let mySprite: Sprite = null
effects.starField.startScreenEffect()
mySprite = sprites.create(img`
    . . . . . . . 9 9 . . . . . . . 
    . . . . . . 9 . . 9 . . . . . . 
    . . . . . . 9 . . 9 . . . . . . 
    . . . . . 9 . 9 9 . 9 . . . . . 
    . . . . . 9 . 9 9 . 9 . . . . . 
    . . . . 9 . 9 9 9 9 . 9 . . . . 
    . . . . 9 . 9 9 9 9 . 9 . . . . 
    . . . 9 . 9 9 9 9 9 9 . 9 . . . 
    . . . 9 . 9 . . . . 9 . 9 . . . 
    . . 9 . 9 9 . 9 9 . 9 9 . 9 . . 
    . . 9 . 9 9 . . . . 9 9 . 9 . . 
    . 9 . 9 9 9 . 9 9 9 9 9 9 . 9 . 
    . 9 . 9 9 9 . 9 9 9 9 9 9 . 9 . 
    9 . 9 9 9 9 9 9 9 9 9 9 9 9 . 9 
    9 . . . . . . . . . . . . . . 9 
    9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 
    `, SpriteKind.Player)
controller.moveSprite(mySprite)
mySprite.setFlag(SpriteFlag.StayInScreen, true)
statusbar = statusbars.create(20, 4, StatusBarKind.Energy)
statusbar.attachToSprite(mySprite, -22, 0)
game.onUpdateInterval(5000, function () {
    myFuel = sprites.createProjectileFromSide(img`
        . . . . . 3 3 b 3 3 d d 3 3 . . 
        . . . . 3 1 1 d 3 d 1 1 1 1 3 . 
        . . . 3 d 1 1 1 d 1 1 1 d 3 1 3 
        . . 3 d d 1 1 1 d d 1 1 1 3 3 3 
        . 3 1 1 d 1 1 1 1 d d 1 1 b . . 
        . 3 1 1 1 d 1 1 1 1 1 d 1 1 3 . 
        . b d 1 1 1 d 1 1 1 1 1 1 1 3 . 
        . 4 b 1 1 1 1 d d 1 1 1 1 d 3 . 
        . 4 4 d 1 1 1 1 1 1 d d d b b . 
        . 4 d b d 1 1 1 1 1 1 1 1 3 . . 
        4 d d 5 b d 1 1 1 1 1 1 1 3 . . 
        4 5 d 5 5 b b d 1 1 1 1 d 3 . . 
        4 5 5 d 5 5 d b b b d d 3 . . . 
        4 5 5 5 d d d d 4 4 b 3 . . . . 
        . 4 5 5 5 4 4 4 . . . . . . . . 
        . . 4 4 4 . . . . . . . . . . . 
        `, 0, 50)
    myFuel.x = randint(5, 155)
    myFuel.setKind(SpriteKind.Gas)
})
game.onUpdateInterval(500, function () {
    myEnemy = sprites.createProjectileFromSide(img`
        2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 
        2 . . . . . . . . . . . . . . 2 
        2 . 2 2 2 2 2 2 2 2 2 2 2 2 . 2 
        . 2 . 2 2 2 . . . . 2 2 2 . 2 . 
        . 2 . 2 2 2 . 2 2 2 2 2 2 . 2 . 
        . . 2 . 2 2 . . . 2 2 2 . 2 . . 
        . . 2 . 2 2 . 2 2 2 2 2 . 2 . . 
        . . . 2 . 2 . . . . 2 . 2 . . . 
        . . . 2 . 2 2 2 2 2 2 . 2 . . . 
        . . . . 2 . 2 2 2 2 . 2 . . . . 
        . . . . 2 . 2 2 2 2 . 2 . . . . 
        . . . . . 2 . 2 2 . 2 . . . . . 
        . . . . . 2 . 2 2 . 2 . . . . . 
        . . . . . . 2 . . 2 . . . . . . 
        . . . . . . 2 . . 2 . . . . . . 
        . . . . . . . 2 2 . . . . . . . 
        `, 0, 50)
    myEnemy.x = randint(5, 155)
    myEnemy.setKind(SpriteKind.Enemy)
})
game.onUpdateInterval(300, function () {
    statusbar.value += -1
})
