class UnionFind {
  fa = [];

  /**
   * 记录树的高度
   */
  rank = [];

  constructor(n) {
    for (let i = 0; i < n; ++i) {
      this.fa[i] = i;
      this.rank[i] = 1;
    }
  }

  /**
   * 查找元素，并且进行路径压缩
   * @param {*} x
   * @returns 元素
   */
  find(x) {
    return x === this.fa[x] ? x : (this.fa[x] = this.find(this.fa[x]));
  }

  /**
   * 合并两个并查集，将高度低的树合并到高度高的树上
   * @param {*} x
   * @param {*} y
   * @returns boolean
   */
  union(x, y) {
    const u = this.find(x);
    const v = this.find(y);
    if (u === v) {
      return false;
    }
    if (this.rank[u] < this.rank[v]) {
      this.fa[u] = v;
    } else if (this.rank[u] > this.rank[v]) {
      this.fa[v] = u;
    } else {
      /**
       * 高度相同，新树高度需要加一
       */
      this.fa[u] = v;
      this.rank[v]++;
    }
    return true;
  }
}
