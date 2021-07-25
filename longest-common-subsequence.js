/**
 * 状态定义：dp[i][j] 为 text1[0..i] 和 text2[0..j] 的最长公共子序列。
 * 状态转移方程：
 *  1. 当 text1[i] === text2[j] 时，dp[i][j] = dp[i-1][j-1] + 1
 *  2. 当 text1[i] !== text2[j] 时，dp[i][j] = max(dp[i-1][j], dp[i][j-1])
 * @param {string} text1
 * @param {string} text2
 * @return {number}
 */
const longestCommonSubsequence1 = (text1, text2) => {
  const text1Length = text1.length;
  const text2Length = text2.length;
  const dp = [...Array(text1Length + 1)].map(() =>
    Array(text2Length + 1).fill(0)
  );

  for (let i = 1; i < text1Length + 1; i++) {
    for (let j = 1; j < text2Length + 1; j++) {
      if (text1[i - 1] === text2[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1] + 1;
      } else {
        dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
      }
    }
  }

  return dp[text1Length][text2Length];
};

/************************************************************************************/

/**
 * 状态压缩：由于计算 dp[i][j] 只需要 dp[i-1][j-1]（左上角），dp[i-1][j]（左测），
 * dp[i][j-1]（上侧）的值，其中左侧在本次循环计算，上侧还没有被本次循环覆盖，可以只保存
 * 前一行，但是左上角的数据已经被覆盖（在计算 dp[i-1][j] 时），所以需要在每次计算时保存
 * 上侧的值。
 * @param {string} text1
 * @param {string} text2
 * @return {number}
 */
const longestCommonSubsequence2 = (text1, text2) => {
  const text1Length = text1.length;
  const text2Length = text2.length;
  const dp = Array(text2Length + 1).fill(0);

  for (let i = 1; i < text1Length + 1; i++) {
    let upLeft = dp[0];
    for (let j = 1; j < text2Length + 1; j++) {
      const tmp = dp[j];
      if (text1[i - 1] === text2[j - 1]) {
        // 左上角
        dp[j] = upLeft + 1;
      } else {
        // 左侧和上侧
        dp[j] = Math.max(dp[j], dp[j - 1]);
      }
      upLeft = tmp;
    }
  }

  return dp[text2Length];
};
