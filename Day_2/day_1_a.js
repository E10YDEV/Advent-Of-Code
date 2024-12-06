let columnHTML = document.getElementsByTagName("pre");
let text = columnHTML[0].innerHTML;
let lines = text.split("\n").map(item => item.split(" ").map(Number));

lines.pop();

function checkLevels(arr) {
	let increasing = null;

	for (let i = 0; i < arr.length - 1; i++) {
		let diff = Math.abs(arr[i] - arr[i + 1]);

		if (diff < 1 || diff > 3) {
			return false;
		}

		if (increasing === null) {
			increasing = arr[i] < arr[i + 1];
		} else {
			if (increasing && arr[i] > arr[i + 1]) {
				return false;
			} else if (!increasing && arr[i] < arr[i + 1]) {
				return false;
			}
		}
	}

	return true;
}

function checkLevelsWithRemoval(arr) {
	let increasing = null;

	for (let i = 0; i < arr.length - 1; i++) {
		let diff = Math.abs(arr[i] - arr[i + 1]);

		if (diff < 1 || diff > 3) {
			return removeAndTest(arr);
		}

		if (increasing === null) {
			increasing = arr[i] < arr[i + 1];
		} else {
			if (increasing && arr[i] > arr[i + 1]) {
				return removeAndTest(arr);
			} else if (!increasing && arr[i] < arr[i + 1]) {
				return removeAndTest(arr);
			}
		}
	}

	return true;
}

function removeAndTest(arr) {
	for (let i = 0; i < arr.length; i++) {
		let copyArray = [...arr];
		copyArray.splice(i, 1);
		if (checkLevels(copyArray)) {
			return true;
		}
	}
	return false;
}

let results = lines.reduce((sum, arr) => sum + (checkLevelsWithRemoval(arr) ? 1 : 0), 0);

console.log(results);
