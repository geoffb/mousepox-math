import * as tape from "tape";
import { astar } from "../lib/astar";
import { Grid } from "../lib/Grid";

tape("astar", (t) => {
	// Testing grid
	const grid = new Grid(10, 10);
	grid.set(5, 5, 1);

	const path1 = astar(grid, 0, 0, 9, 9);
	if (path1 !== undefined) {
		t.equal(path1.length, 19);
	} else {
		t.fail("No path found");
	}

	const path2 = astar(grid, 0, 0, 5, 5);
	t.equal(path2, undefined);

	t.end();
});
