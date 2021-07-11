/**
 * https://github.com/trekhleb/javascript-algorithms/blob/master/src/data-structures/graph/Graph.js
 * @param {Graph} graph
 * @param {GraphVertex} startVertex
 */
export default class DepthFirstOrder {
  #marked = [];
  #count = 0;
  #pre = [];
  #post = [];
  #reverPost = [];

  constructor(graph) {
    this.#marked = new Array(graph.getAllVertices().length).fill(false);
    graph.getAllVertices().forEach((vertex) => {
      if (!this.#marked[vertex]) {
        this.#dfs(graph, vertex);
      }
    });
  }

  #dfs(graph, startVertex) {
    ++this.#count;
    this.#marked[startVertex] = true;

    this.#pre.push(startVertex);

    graph.getNeighbors(startVertex).forEach((nextVertex) => {
      if (!this.#marked[nextVertex]) {
        this.#dfs(graph, nextVertex);
      }
    });

    this.#post.push(startVertex);
    this.#reverPost.unshift(startVertex);
  }

  get count() {
    return this.#count;
  }

  get pre() {
    return this.#pre;
  }

  get post() {
    return this.#post;
  }

  get reversePost() {
    return this.#reverPost;
  }
}
