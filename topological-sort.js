import DepthFirstOrder from "./depth-first-order";

/**
 * @param {Graph} graph
 */
export default class TopologicalSort {
  #order = [];

  constructor(graph) {
    const dfs = new DepthFirstOrder(graph);

    /**
     * 无环有向图（DAG）的拓扑排序为所有顶点的逆后续排列
     */
    this.#order = dfs.reversePost();
  }

  get order() {
    return this.#order;
  }
}
