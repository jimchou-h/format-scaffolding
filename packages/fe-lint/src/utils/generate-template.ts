import path from 'path';
import fs from 'fs-extra';
import _ from 'lodash';
import glob from 'glob';
import ejs from 'ejs';


/**
 * 实例化模板
 * @param cwd
 * @param data
 * @param vscode
 */
export default (cwd: string, data: Record<string, any>, vscode?: boolean) => {
  // 获取 ejs 模板文件列表
  const templatePath = path.resolve(__dirname, '../config');
  const templates = glob.sync(`${vscode ? '_vscode' : '**'}/*.ejs`, { cwd: templatePath });
  
  for (const name of templates) {
    
  }
}