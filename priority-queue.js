/**
 * Priority Queue
 * 最大优先队列
 */
class PriorityQueue {
  #data = [];
  #length = 0;
  /**
   * constructor
   * @param {number[]} data
   */
  constructor(data = []) {
    this.#data = data;
    this.#length = data.length;

    if (this.#length > 0) {
      /**
       * 只需要将非叶子节点移动就可以了，
       * 因为堆是一个完全二叉树
       * 1. 总节点数 N 为偶数时，叶子节点数为 N / 2
       * 2. 总节点数 N 为奇数时，叶子节点数为 (N + 1) / 2
       */
      for (let i = (this.#length + 1) >> 1; i >= 0; --i) {
        this.#sink(i);
      }
    }
  }

  /**
   * 插入队列
   * 插入到最后，然后上浮（swim） 到正确位置
   * @param {number} item
   */
  insert(item) {
    this.#data.push(item);
    this.#swim(this.#length++);
    console.log(this.#data);
  }

  /**
   * 删除最大值
   * @return {number}
   */
  delete() {
    if (this.#length === 0) {
      return;
    }

    const top = this.#data[0];
    const bottom = this.#data.pop();

    if (--this.#length > 0) {
      this.#data[0] = bottom;
      this.#sink(0);
    }

    return top;
  }

  /**
   * 上浮位置 k
   * @param {number} k
   */
  #swim(k) {
    const p = (k - 1) >> 1;

    while (k > 0 && this.#data[k] > this.#data[p]) {
      this.#swap(this.#data, p, k);
      this.#swim(p);
    }
  }

  /**
   * 下沉位置 k
   * @param {number} k
   */
  #sink(k) {
    while ((k << 1) + 1 <= this.#length) {
      /**
       * 左子树
       */
      let j = (k << 1) + 1;

      /**
       * 大顶堆的定义，根大于左子树（j）右子树 （j+1），只需将根与较大的子树对比
       */
      if (j + 1 <= this.#length && this.#data[j + 1] > this.#data[j]) {
        ++j;
      }

      /**
       * 如果子树大于根则交换，并需要判断后续的子树 k = j
       */
      if (this.#data[j] > this.#data[k]) {
        this.#swap(this.#data, j, k);
        k = j;
      } else {
        break;
      }
    }
  }

  /**
   * 交换 data[i] 和 data[j]
   * @param {number[]} data
   * @param {number} i
   * @param {number} j
   */
  #swap(data, i, j) {
    [data[i], data[j]] = [data[j], data[i]];
  }
}
