const Ship = (len) => {
    // Global Variables
    // eslint-disable-next-line prefer-const
    let length = len;
    let hitCount = 0;
    let sunk = false;
    let row;
    let colStart;
    let colEnd;

    const setShipCoordinates = (r, c, shipLength) => {
        row = r;
        colStart = c;
        colEnd = c + shipLength - 1;
    };

    const hit = () => {
        hitCount += 1;
    };

    const isSunk = () => {
        if (hitCount === length) {
            sunk = true;
        }
        return sunk;
    };

    return {
        hit,
        isSunk,
        setShipCoordinates,
        get length() {
            return length;
        },
        get hitCount() {
            return hitCount;
        },
        get sunk() {
            return sunk;
        },
        set sunk(v) {
            sunk = v;
        },
        get row() {
            return row;
        },
        get colStart() {
            return colStart;
        },
        get colEnd() {
            return colEnd;
        },
    };
};

module.exports = Ship;
