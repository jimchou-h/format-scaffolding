// 导入 ESLint 模块
import { ESLint } from 'eslint';
// 导入自定义类型 ScanResult
import type { ScanResult } from '../../types';

/**
 * 格式化 ESLint 输出结果
 */
export function formatESLintResults(results: ESLint.LintResult[], quiet: boolean, eslint: ESLint): ScanResult[] {
  // 获取所有规则的元数据信息
  const rulesMeta = eslint.getRulesMetaForResults(results);

  // 返回处理后的扫描结果数组
  return results
    // 过滤掉没有错误和警告的结果
    .filter(({ warningCount, errorCount }) => errorCount || warningCount)
    // 对每个结果进行映射转换
    .map(
      ({
        filePath,
        messages,
        errorCount,
        warningCount,
        fixableErrorCount,
        fixableWarningCount,
      }) => ({
        // 文件路径
        filePath,
        // 错误数量
        errorCount,
        // 警告数量（quiet模式下设为0）
        warningCount: quiet ? 0 : warningCount,
        // 可修复的错误数量
        fixableErrorCount,
        // 可修复的警告数量（quiet模式下设为0）
        fixableWarningCount: quiet ? 0 : fixableWarningCount,
        // 处理消息数组
        messages: messages
          // 转换每条消息为指定格式
          .map(({ line = 0, column = 0, ruleId, message, fatal, severity }) => {
            return {
              // 行号
              line,
              // 列号
              column,
              // 规则ID
              rule: ruleId,
              // 规则文档URL
              url: rulesMeta[ruleId]?.docs?.url || '',
              // 处理后的消息内容（去掉末尾句点）
              message: message.replace(/([^ ])\.$/u, '$1'),
              // 是否为错误级别
              errored: fatal || severity === 2,
            };
          }) // 不检查ruleId，因为它可能为null
          // 根据quiet模式过滤消息
          // https://eslint.org/docs/developer-guide/nodejs-api.html#-lintmessage-type
          .filter(({ errored }) => (quiet ? errored : true)),
      }),
    );
}
