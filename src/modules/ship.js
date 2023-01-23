const Ship = (len) => {
	let length = len;
	let hitCount = 0;
	let sunk = false;

	const hit = () => { hitCount++ };

	const isSunk = () => {
        if (hitCount === length) {
            sunk = true;
        } 
        return sunk;
    };

	return { hit, isSunk, length, hitCount, sunk };
};

module.exports = Ship;
