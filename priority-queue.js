/**
 * Priority Queue
 * 最小优先队列
 * 时间复杂度：O(NlogN)
 * 插入队列时间复杂度为 O(logN)
 */
export default class PriorityQueue {
  #data = [];
  #length = 0;
  #priorities = new Map();

  /**
   * constructor
   * @param {Function} [comparatorFunction]
   */
  constructor(comparatorFunction) {
    this.compare = comparatorFunction || this.compare;
  }

  /**
   * insert item to queue.
   * 插入队列
   * 插入到最后，然后上浮（swim） 到正确位置
   * @param {number} item
   * @param {number} [priority=0] - items priority.
   */
  insert(item, priority = 0) {
    this.#priorities.set(item, priority);
    this.#data.push(item);
    this.#swim(this.#length++);
  }

  /**
   * delete item.
   * @return {*} [item] - deleted item if not provided will delete top item.
   */
  delete(item) {
    if (this.#length === 0) {
      return;
    }

    const indexToDelete = item ? this.#data.indexOf(item) : 0;
    const top = this.#data[indexToDelete];
    const bottom = this.#data.pop();

    if (--this.#length > 0) {
      this.#data[indexToDelete] = bottom;
      this.#sink(indexToDelete);
    }

    this.#priorities.delete(top);
    return top;
  }

  /**
   * Change priority of the item.
   * @param {*} item - item we're going to re-prioritize.
   * @param {number} priority - new item's priority.
   */
  changePriority(item, priority) {
    this.delete(item);
    this.insert(item, priority);
  }

  /**
   * Check if item already exists in a queue.
   * @param {*} item
   * @return {boolean}
   */
  hasValue(item) {
    return this.#data.includes(item);
  }

  /**
   * Check if queue is empty.
   * @return {boolean}
   */
  get isEmpty() {
    return this.#length === 0;
  }

  /**
   * Compares priorities of two items.
   * @param {*} a
   * @param {*} b
   * @return {number}
   */
  compare(a, b) {
    if (this.#priorities.get(a) === this.#priorities.get(b)) {
      return 0;
    }
    return this.#priorities.get(a) < this.#priorities.get(b) ? -1 : 1;
  }

  /**
   * 上浮位置 k
   * @param {number} k
   */
  #swim(k) {
    const p = (k - 1) >> 1;

    while (k > 0 && this.compare(this.#data[k], this.#data[p]) === -1) {
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
      if (
        j + 1 <= this.#length &&
        this.compare(this.#data[j + 1], this.#data[j]) === -1
      ) {
        ++j;
      }

      /**
       * 如果子树大于根则交换，并需要判断后续的子树 k = j
       */
      if (this.compare(this.#data[j], this.#data[k]) === -1) {
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
