/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var findKthLargest = function (nums, k) {
  return quickSelect(nums, nums.length - k);
};

/**
 * 3-Way Quick Select
 * 选择最小的第 index 元素
 * @param {number[]} nums
 * @param {number} index
 * @return {number}
 */
const quickSelect = (nums, index) => {
  let left = 0,
    right = nums.length - 1;

  while (left <= right) {
    const { lt, gt } = partition3Way(nums, left, right);

    if (index > gt) left = gt + 1;
    else if (index < lt) right = lt - 1;
    else return nums[lt];
  }
  return -1;
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
