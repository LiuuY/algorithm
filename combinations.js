/**
 * 回溯法解决组合问题。
 * n 相当于决策树的宽度，k 相当于决策树的深度。
 * @param {number} n
 * @param {number} k
 * @return {number[][]}
 */
const combine = (n, k) => {
  const ans = [];
  backtrack(n, k, [], ans, 1);
  return ans;
};

const backtrack = (n, k, combination, ans, start) => {
  /**
   * 终止条件
   */
  if (combination.length === k) {
    ans.push(combination.slice());
    return;
  }
  /**
   * 相当于递归树的每一层，由于是组合，即 [1,2] 和 [2,1] 代表同一个组合，所以需要
   * 记录 start 位置，用于不重复访问之前的数字。
   * 可以剪枝优化，因为当可选的数字不足的时候，没有必要在进行递归了
   */
  for (let i = start; i <= n - (k - combination.length) + 1; i++) {
    /**
     * 处理节点
     */
    combination.push(i);
    /**
     * 相当于递归树的深度，由于在下一层递归中，也不能选取相同的数字，所以 i + 1
     */
    backtrack(n, k, combination, ans, i + 1);
    /**
     * 回溯
     */
    combination.pop();
  }
};
