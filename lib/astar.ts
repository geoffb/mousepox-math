import { distance, IPoint } from "./core";
import { Grid } from "./Grid";

/** A grid node */
interface INode {
	x: number;
	y: number;
	f: number;
	g: number;
	parent?: INode;
}

/** Create a node */
function makeNode(x: number, y: number, parent?: INode): INode {
	return { f: 0, g: 0, parent, x, y };
}

/** Add node to a list, keeping in ascending order of F */
function addNode(nodes: INode[], node: INode) {
	const len = nodes.length;
	for (let i = 0; i < len; i++) {
		if (nodes[i].f > node.f) {
			nodes.splice(i, 0, node);
			return;
		}
	}
	nodes.push(node);
}

/** Create a path from a node's root ancestor to itself */
function createPathFromNode(node: INode): IPoint[] {
	let n: INode | undefined = node;
	const path: IPoint[] = [];
	while (n !== undefined) {
		path.push({ x: n.x, y: n.y });
		n = n.parent;
	}
	path.reverse();
	return path;
}

/** Find a path from one point to another using A* */
export function astar(
	grid: Grid,
	x1: number,
	y1: number,
	x2: number,
	y2: number
): IPoint[] | undefined {
	// Create start and goal nodes
	const start = makeNode(x1, y1);
	const goal = makeNode(x2, y2);

	// Creat open and closed node lists
	const open: INode[] = [start];
	const closed: number[] = [];

	// As long as there are open nodes, keeping trying to find a path
	while (open.length > 0) {
		// Grab the first node in the open list
		// (which is pre-sorted by F in ascending order)
		const node = open.shift();
		if (node === undefined) {
			break;
		}

		// Determine if we've reached the goal
		if (node.x === goal.x && node.y === goal.y) {
			// Goal was reached; create path from nodes
			return createPathFromNode(node);
		} else {
			// Not yet at the goal; keep looking by inspecting adjacent nodes
			grid.forEachAdjacent(node.x, node.y, (value, x, y) => {
				if (value !== 0) {
					return;
				} // TODO: All walkable values to be specified
				const index = grid.xyToIndex(x, y);
				if (closed.indexOf(index) === -1) {
					const n = makeNode(x, y, node);
					n.g = node.g + distance(n.x, n.y, node.x, node.y);
					n.f = n.g + distance(n.x, n.y, goal.x, goal.y);
					addNode(open, n);
					closed.push(index);
				}
			});
		}
	}

	// No path was found
	return;
}
