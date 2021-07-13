/**
 * Merge Sort
 * 归并排序
 * @param {number[]} nums
 * @return {number[]}
 */
const sortArray = (nums) => {
  const temp = [];
  mergeSort(nums, 0, nums.length - 1, temp);
  return nums;
};

/**
 * Merge Sort
 * 将 nums[left..right] 归并排序
 * @param {number[]} nums
 * @param {number} left
 * @param {number} right
 * @param {number[]} temp
 */
const mergeSort = (nums, left, right, temp) => {
  if (left >= right) {
    return;
  }

  let mid = left + ((right - left) >> 1);

  /**
   * 对比 Quick Sort，Merge Sort 先进行递归，然后处理数组
   * 归并左右两个有序数组，则数组整体有序了
   * 左右分别归并排序
   */
  mergeSort(nums, left, mid, temp);
  mergeSort(nums, mid + 1, right, temp);

  let i = left,
    j = mid + 1,
    cnt = 0;
  while (i <= mid && j <= right) {
    if (nums[i] <= nums[j]) {
      temp[cnt++] = nums[i++];
    } else {
      temp[cnt++] = nums[j++];
    }
  }
  while (i <= mid) {
    temp[cnt++] = nums[i++];
  }
  while (j <= right) {
    temp[cnt++] = nums[j++];
  }

  for (let i = 0; i < right - left + 1; ++i) {
    nums[i + left] = temp[i];
  }
};
