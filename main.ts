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
    for (let index = 0; index <= 8; index++) {
        tot += Universe[findCell(num, neighbors[index])]
    }
    return tot
}
function findCell (num: number, num2: number) {
    tot = num + num2
    if (tot < 0) {
        tot = tot + 25
    }
    if (tot > 24) {
        tot = tot - 25
    }
    return tot
}
function doGen () {
    for (let index = 0; index <= 24; index++) {
        cellGen(index, cntNbors(index))
    }
    for (let index = 0; index <= 24; index++) {
        Universe[index] = Next[index]
    }
    showUni()
}
function showUni () {
    for (let index = 0; index <= 24; index++) {
        findCoord(index)
        if (Universe[index] == 0) {
            led.unplot(sx, sy)
        } else {
            led.plot(sx, sy)
        }
    }
}
input.onButtonPressed(Button.A, function () {
    doGen()
})
input.onButtonPressed(Button.B, function () {
    for (let index = 0; index <= 24; index++) {
        if (8 < randint(0, 10)) {
            Universe[index] = 1
        }
    }
    showUni()
})
function findCoord (num: number) {
    sy = Math.trunc(num / 5)
    sx = num % 5
}
let sy = 0
let sx = 0
let tot = 0
let nxt = 0
let val = 0
let Next: number[] = []
let Universe: number[] = []
let neighbors: number[] = []
neighbors = [-6, -5, -4, -1, 1, 4, 5, 6]
Universe = [0]
for (let index = 0; index < 24; index++) {
    Universe.push(0)
}
Next = [0]
for (let index = 0; index < 24; index++) {
    Next.push(0)
}
