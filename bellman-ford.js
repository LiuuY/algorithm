/**
 * Bellman-Ford 算法用于寻找「加权有向图」单源最短路径。
 * 将 distances[startVertex] 初始化为 0，其他顶点的 distances[] 初始化为 Infinity；
 * 然后对于每条路径松弛 V-1 次，即可以找到从 startVertex 到所有节点的最短路径。
 * 如果图中存在负圈，第 V 次松弛可以找到负圈。
 * 同时，对于第 k 次松弛，都能找到从 startVertex 经历 k 条边的最短路径（Bellman-Ford 算法是一种 DP 算法）。
 *
 * 时间复杂度：O(EV)
 * 空间复杂度：O(V)
 */

/**
 * https://github.com/trekhleb/javascript-algorithms/blob/master/src/data-structures/graph/Graph.js
 * @param {Graph} graph
 * @param {GraphVertex} startVertex
 * @return {{distances, previousVertices}}
 */
export default function bellmanFord(graph, startVertex) {
  const distances = {};
  const previousVertices = {};
  const hasCycle = false;

  distances[startVertex.getKey()] = 0;
  graph.getAllVertices().forEach((vertex) => {
    previousVertices[vertex.getKey()] = null;
    if (vertex.getKey() !== startVertex.getKey()) {
      distances[vertex.getKey()] = Infinity;
    }
  });

  for (
    let iteration = 0;
    iteration < graph.getAllVertices().length - 1;
    iteration += 1
  ) {
    Object.keys(distances).forEach((vertexKey) => {
      const vertex = graph.getVertexByKey(vertexKey);

      /**
       * 松弛
       */
      graph.getNeighbors(vertex).forEach((neighbor) => {
        const edge = graph.findEdge(vertex, neighbor);

        const distanceToVertex = distances[vertex.getKey()];
        const distanceToNeighbor = distanceToVertex + edge.weight;
        if (
          distanceToVertex !== Infinity &&
          distanceToNeighbor < distances[neighbor.getKey()]
        ) {
          distances[neighbor.getKey()] = distanceToNeighbor;
          previousVertices[neighbor.getKey()] = vertex;
        }
      });
    });
  }

  /**
   * 在执行一次，用于寻找负圈
   */
  Object.keys(distances).forEach((vertexKey) => {
    const vertex = graph.getVertexByKey(vertexKey);

    /**
     * 松弛
     */
    graph.getNeighbors(vertex).forEach((neighbor) => {
      const edge = graph.findEdge(vertex, neighbor);

      const distanceToVertex = distances[vertex.getKey()];
      const distanceToNeighbor = distanceToVertex + edge.weight;
      if (
        distanceToVertex !== Infinity &&
        distanceToNeighbor < distances[neighbor.getKey()]
      ) {
        hasCycle = true;
      }
    });
  });

  return {
    hasCycle,
    distances,
    previousVertices,
  };
}
