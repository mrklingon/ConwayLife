function cellGen (cell: number, count: number) {
    val = Universe[cell]
    if (count < 2) {
        nxt = 0
    }
    if (count == 2) {
        nxt = val
    }
    if (count == 3) {
        nxt = 1
    }
    if (count > 3) {
        nxt = 0
    }
    Next[cell] = nxt
}
function cntNbors (num: number) {
    tot = 0
    for (let index = 0; index <= 7; index++) {
        tot = tot + Universe[findCell(num, neighbors[index])]
    }
    return tot
}
function findCell (num: number, num2: number) {
    total = num + num2
    if (total < 0) {
        total = total + 25
    }
    if (total > 24) {
        total = total - 25
    }
    return total
}
function doGen () {
    for (let index2 = 0; index2 <= 24; index2++) {
        cellGen(index2, cntNbors(index2))
    }
    for (let index3 = 0; index3 <= 24; index3++) {
        Universe[index3] = Next[index3]
    }
    showUni()
    Chk_Extinct()
}
function Chk_Extinct () {
    Pop = 0
    for (let index = 0; index <= unisize; index++) {
        if (1 == Universe[index]) {
            Pop += 1
        }
    }
    if (Pop == 0) {
        basic.showIcon(IconNames.No)
        basic.pause(100)
        basic.showIcon(IconNames.Sad)
        basic.pause(100)
        music.startMelody(music.builtInMelody(Melodies.Funeral), MelodyOptions.Once)
        basic.showLeds(`
            . . . . .
            . . . . .
            . . . . .
            . . . . .
            . . . . .
            `)
    }
}
function showUni () {
    for (let index4 = 0; index4 <= 24; index4++) {
        findCoord(index4)
        if (Universe[index4] == 0) {
            led.unplot(sx, sy)
        } else {
            led.plot(sx, sy)
        }
    }
}
input.onButtonPressed(Button.A, function () {
    doGen()
})
input.onButtonPressed(Button.AB, function () {
    pattern = 1 + pattern
    if (3 < pattern) {
        pattern = 0
    }
    if (0 == pattern) {
        Universe[11] = 1
        Universe[12] = 1
        Universe[13] = 1
        Universe[18] = 1
        Universe[22] = 1
    }
    if (1 == pattern) {
        Universe[11] = 1
        Universe[12] = 1
        Universe[13] = 1
    }
    if (2 == pattern) {
        Universe[2] = 1
        Universe[7] = 1
        Universe[12] = 1
        Universe[17] = 1
        Universe[22] = 1
    }
    if (3 == pattern) {
        Universe[11] = 1
        Universe[12] = 1
        Universe[13] = 1
        Universe[17] = 1
        Universe[6] = 1
    }
    showUni()
})
input.onButtonPressed(Button.B, function () {
    for (let index5 = 0; index5 <= 24; index5++) {
        if (8 < randint(0, 10)) {
            Universe[index5] = 1
        }
    }
    showUni()
})
input.onGesture(Gesture.Shake, function () {
    Chk_Extinct()
    basic.showString("Pop:")
    basic.showString(convertToText(Pop))
    showUni()
})
function findCoord (num: number) {
    sy = Math.trunc(num / 5)
    sx = num % 5
}
let sy = 0
let sx = 0
let Pop = 0
let total = 0
let nxt = 0
let val = 0
let Next: number[] = []
let Universe: number[] = []
let neighbors: number[] = []
let pattern = 0
let tot = 0
let unisize = 0
unisize = 24
tot = 0
pattern = 0
neighbors = [-6, -5, -4, -1, 1, 4, 5, 6]
Universe = [0]
for (let index = 0; index < 24; index++) {
    Universe.push(0)
}
Next = [0]
for (let index = 0; index < 24; index++) {
    Next.push(0)
}
images.createBigImage(`
    # . . # . # # . # #
    # . . . . # . . # .
    # . . # . # # . # #
    # . . # . # . . # .
    # # . # . # . . # #
    `).scrollImage(1, 200)
images.createBigImage(`
    . . . . . . . . . .
    . . . . # # . . . .
    . . . . # # . # # .
    . # # . . . . # # .
    . # # . . . . . . .
    `).scrollImage(1, 200)
basic.showLeds(`
    . . . . .
    . . . . .
    . . . . .
    . . . . .
    . . . . .
    `)
