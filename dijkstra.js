import PriorityQueue from "./priority-queue";

/**
 * Dijkstra 算法用于寻找「非负加权有向图」单源最短路径。
 * 将 distances[startVertex] 初始化为 0，其他顶点的 distances[] 初始化为 Infinity；
 * 然后将 distances[] 中最小（利用 Priority Queue）的非树松弛（relaxation）顶点加入树种；
 * 如此这般，直到所有的顶点都加入树。
 *
 * 时间复杂度：O(ElogV)
 * 空间复杂度：O(V)
 */

/**
 * @typedef {Object} ShortestPaths
 * @property {Object} distances - shortest distances to all vertices
 * @property {Object} previousVertices - shortest paths to all vertices.
 */

/**
 * Implementation of Dijkstra algorithm of finding the shortest paths to graph nodes.
 * https://github.com/trekhleb/javascript-algorithms/blob/master/src/algorithms/graph/dijkstra/dijkstra.js
 * https://github.com/trekhleb/javascript-algorithms/blob/master/src/data-structures/graph/Graph.js
 * @param {Graph} graph - graph we're going to traverse.
 * @param {GraphVertex} startVertex - traversal start vertex.
 * @return {ShortestPaths}
 */
export default function dijkstra(graph, startVertex) {
  const distances = {};
  const visited = {};
  const previousVertices = {};
  const queue = new PriorityQueue();

  graph.getAllVertices().forEach((v) => {
    distances[v.getKey()] = Infinity;
    previousVertices[v.getKey()] = null;
  });

  distances[startVertex.getKey()] = 0;
  queue.insert(startVertex, distances[startVertex.getKey()]);

  while (!queue.isEmpty) {
    /**
     * 找到最近的顶点
     */
    const current = queue.delete();

    current.getNeighbors().forEach((neighbor) => {
      if (!visited[neighbor.getKey()]) {
        const edge = graph.findEdge(current, neighbor);

        const distance = distances[neighbor.getKey()];
        const distanceToNeighborFromCurrent =
          distances[currentVertex.getKey()] + edge.weight;

        /**
         * 松弛
         */
        if (distanceToNeighborFromCurrent < distance) {
          distances[neighbor.getKey()] = distanceToNeighborFromCurrent;

          if (queue.hasValue(neighbor)) {
            queue.changePriority(neighbor, distanceToNeighborFromCurrent);
          }

          previousVertices[neighbor.getKey()] = current;
        }

        if (!queue.hasValue(neighbor)) {
          queue.add(neighbor, distanceToNeighborFromCurrent);
        }
      }
    });

    visited[current.getKey()] = true;
  }

  return {
    distances,
    previousVertices,
  };
}
