/**
 * 广度优先搜索
 * https://github.com/trekhleb/javascript-algorithms/blob/master/src/data-structures/graph/Graph.js
 * @param {Graph} graph
 * @param {GraphVertex} startVertex
 */
export default function BreathFirstSearch(graph, startVertex) {
  const queue = [];
  const levelOrder = [];

  queue.push(startVertex);

  while (queue.length) {
    const current = queue.shift();

    levelOrder.push(current);

    graph.getNeighbors(current).forEach((next) => {
      queue.push(next);
    });
  }

  return {
    levelOrder,
  };
}
