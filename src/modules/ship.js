const Ship = (len) => {

    const setShipCoordinates = (r, c, shipLength) => {
        row = r;
        colStart = c;
        colEnd = (c + shipLength) - 1;
    }

	const hit = () => { hitCount++ };

	const isSunk = () => {
        if (hitCount === length) {
            sunk = true;
        } 
        return sunk;
    };

    let length = len;
	let hitCount = 0;
	let sunk = false;
    let row;
    let colStart;
    let colEnd;

	return { hit, isSunk, get length() {return length}, get hitCount() {return hitCount}, get sunk() {return sunk}, set sunk(v) {sunk = v}, setShipCoordinates, get row() {return row}, get colStart() {return colStart}, get colEnd() {return colEnd} };
};

module.exports = Ship;
