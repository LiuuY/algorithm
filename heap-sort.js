/**
 * Heap Sort
 * 有小到大排序
 * 时间复杂度：O(NlogN)
 * 插入堆时间复杂度为 O(logN)
 *
 * @param {number[]} nums
 * @return {number[]}
 */
const heapSort = (nums) => {
  /**
   * 大顶堆化数组
   * @example
   * let arr = [6, 4, 3, 9, 8, 7, 1];
   * heapify(arr) // [9, 8, 7, 4, 6, 3, 1]
   */
  heapify(nums);

  let i = nums.length - 1;

  /**
   * 因为从小到大排序数组，将堆顶（最大值）交换到最后，然后将新堆顶下沉到合适位置
   */
  while (i >= 1) {
    swap(nums, 0, i--);
    sink(nums, 0, i);
  }

  return nums;
};

/**
 * 大顶堆
 * @param {number[]} nums
 */
const heapify = (nums) => {
  const len = nums.length;

  /**
   * 只需要将非叶子节点移动就可以了，
   * 因为堆是一个完全二叉树
   * 1. 总节点数 N 为偶数时，叶子节点数为 N / 2
   * 2. 总节点数 N 为奇数时，叶子节点数为 (N + 1) / 2
   */
  for (let i = (len + 1) >> 1; i >= 0; --i) {
    sink(nums, i, len - 1);
  }
};

/**
 * 下标 k 位置下沉操作，使得区间 [k, end] 堆有序
 * @param {number[]} nums
 * @param {number} k
 * @param {number} end
 */
const sink = (nums, k, end) => {
  while ((k << 1) + 1 <= end) {
    /**
     * 左子树
     */
    let j = (k << 1) + 1;

    /**
     * 大顶堆的定义，根大于左子树（j）右子树 （j+1），只需将根与较大的子树对比
     */
    if (j + 1 <= end && nums[j + 1] > nums[j]) {
      ++j;
    }

    /**
     * 如果子树大于根则交换，并需要判断后续的子树 k = j
     */
    if (nums[j] > nums[k]) {
      swap(nums, j, k);
      k = j;
    } else {
      break;
    }
  }
};

/**
 * 交换 nums[i] 和 nums[j]
 * @param {number[]} nums
 * @param {number} i
 * @param {number} j
 */
const swap = (nums, i, j) => ([nums[i], nums[j]] = [nums[j], nums[i]]);
