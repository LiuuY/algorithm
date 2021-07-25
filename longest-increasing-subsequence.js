/**
 * 状态定义：dp[i] 为以 nums[i] 结尾的上升子序列长度。
 * 状态转移方程：0<= j < i，如果 nums[i] > nums[j] 的 dp[j] 最大值，dp[i] = dp[j] + 1。
 * 最后再找出 dp 数组中最大值。
 * 时间复杂度：O(n*n)。
 * @param {number[]} nums
 * @return {number}
 */
const lengthOfLISUsingDP = (nums) => {
  /**
   * 以 nums[0] 结尾的 LIS 长度为 1。
   */
  const dp = [1];

  for (let i = 1; i < nums.length; i++) {
    let max = -1;
    /**
     * 局部最优解：找到 [0, i) 中可以使以 nums[i] 为结尾的 LIS 最长解
     */
    for (let j = 0; j < i; j++) {
      if (nums[i] > nums[j] && max < dp[j]) {
        max = dp[j];
      }
    }

    dp[i] = max === -1 ? 1 : max + 1;
  }

  return Math.max(...dp);
};

/************************************************************************************/

/**
 * 贪心算法，使子序列上升尽可能的缓慢。
 * 每次在上升子序列最后加上的那个数尽可能的小，tail[i] 表示长度为 i 的上升子序列末尾的最小值。
 * 时间复杂度：O(nlogn)
 * @param {number[]} nums
 * @return {number}
 */
const lengthOfLISUsingGreedy = (nums) => {
  const n = nums.length;
  let len = 1;

  if (n === 0) {
    return 0;
  }

  /**
   * 初始化，长度为 1 的上升序列末尾为 nums[0]
   */
  const tail = [0, nums[0]];

  for (let i = 1; i < n; ++i) {
    /**
     * 如果当前数字，比上升子序列末尾的最小值大，说明可以接在后面增大长度
     */
    if (nums[i] > tail[len]) {
      tail[++len] = nums[i];
    } else {
      /**
       * 如果当前值小于 tail 最尾的值，找到 tail 中比 nums[i] 大
       * 的第一个位置 k，tail[k] = nums[i]
       */
      const pos = binarySearch(tail, 1, len, nums[i]);
      tail[pos] = nums[i];
    }
  }

  return len;
};

/**
 * 二分查找模板，我们需要找的是左边界
 * @param {number[]} nums
 * @param {number} left
 * @param {number} right
 * @param {number} target
 * @return {number}
 */
const binarySearch = (nums, left, right, target) => {
  /**
   * 二分查找，范围是 [left, right)
   */
  while (left < right) {
    const mid = left + ((right - left) >>> 1);
    /**
     * 因为查找范围是 [left, right)，所以 mid 分割成两个区间（不包括 mid）
     * [left, mid) 和 [mid + 1，right)
     */
    if (nums[mid] < target) {
      left = mid + 1;
    } else {
      /**
       * 对于 nums[i] === tail[mid]，我们也继续查找，且将搜索范围向
       * [left, mid) 缩小，所以最后可以找到左边界。
       */
      right = mid;
    }
  }

  /**
   * 结束条件 left === right，
   * 如果 tail 中存在和 nums[i] 一样大的数值，则 left 为这个值的位置（有多个的话就是左边界），
   * 如果 tail 中不存在和 nums[i] 一样大的数值，则 left 为比它大的第一个值。
   * 可以这样理解
   * 1. nums = [1,2,2,3], target = 2，返回 1，代表比 2 小的值有 1 个；
   * 2. nums = [2,3,5,7], target = 1，返回 0，代表比 1 小的值有 0 个；
   * 3. nums = [2,3,5,7], target = 8，返回 4，代表比 8 小的值有 4 个。
   */
  return left;
};
