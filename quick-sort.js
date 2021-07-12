/**
 * 3-Way Quick Sort
 * @param {number[]} nums
 * @return {number[]}
 */
const quickSort = (nums) => {
  return quickSort(nums, 0, nums.length - 1);
};

/**
 * 3-Way Quick Sort, from nums[left] to nums[right]
 * @param {number[]} nums
 * @param {number} left
 * @param {number} right
 */
const quickSort3Way = (nums, left, right) => {
  if (right <= left) {
    return;
  }

  /**
   * 对比 Merge Sort，先处理数组，然后进行递归
   * 当左右数组都有序了之后，则整体数组有序了
   */
  const { lt, gt } = partition3Way(nums, left, right);
  quickSort3Way(nums, left, lt - 1);
  quickSort3Way(nums, gt + 1, right);
  return nums;
};

/**
 * 3-Way partition.
 * [...小于nums[randomIndex], ...等于nums[randomIndex], ...大于nums[randomIndex]]
 * @param {number[]} nums
 * @param {number} left
 * @param {number} right
 */
const partition3Way = (nums, left, right) => {
  let randomIndex = (left + Math.random() * (right - left)) >> 0;
  swap(nums, randomIndex, left);

  /**
   * 循环不变量：
   * all in [left, lt - 1] < pivot
   * all in [lt, gt] = pivot
   * all in [gt + 1, right] > pivot
   */

  let pivot = nums[left];
  let lt = left;
  let gt = right;

  let i = left + 1;
  while (i <= gt) {
    if (nums[i] < pivot) {
      swap(nums, i++, lt++);
    } else if (nums[i] === pivot) {
      ++i;
    } else {
      swap(nums, i, gt--);
    }
  }

  return {
    lt,
    gt,
  };
};

/**
 * 交换 nums[i] 和 nums[j]
 * @param {number[]} nums
 * @param {number} i
 * @param {number} j
 */
const swap = (nums, i, j) => ([nums[i], nums[j]] = [nums[j], nums[i]]);
