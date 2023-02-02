一个 ts lib 的模板仓库，可以当做脚手架使用。

1. 支持单元测试与覆盖率统计
2. 使用 standard-version 或者 github action 升级版本号，产生 changelog
3. 使用 typedoc 生成文档
4. conventional commit 的校验支持
5. 代码美化与语法检查的支持，以及相应的 git hooks 自动化支持

## 开发之前

1. 修改`package.json`的模块信息，模块名、作者和描述。

### 非 github 项目

使用 standard-version 来升级版本号，然后需要手动发布。

1. 删除.github 目录
2. 删除 doc:publish 命令
3. 删除 gh-pages 依赖包

### github 项目

使用 github action 自动化发布

1. 删除 npm version 命令
2. 删除 standard-version 依赖包
3. 在 github 项目配置 secrets：key 为 NPM_TOKEN，value 为 npm 的 token
4. 修改 github workflows 里面的 package-name（改成和 package.json 的 name 一样）
5. 在 github 仓库到 `Settings > Code and automation > Actions > General` > Workflow permissions， 打开 `Allow GitHub Actions to create and approve pull requests`.

## 开发与发布

### 开发

```shell
# 有变化就重新编译
npm run watch:build
# 有变化的时候使用编译过的代码进行测试
npm run watch:test
```

### 发布

github 项目：

只要遵循 comventional commit 约定的提交，push 到 github 之后，会自动产生 merge request，合并之后就会自动发布

非 github 项目：

```shell
# 发布前准备，会编译、测试以及升级版本号，产生changlog
npm run prepare-release
# 推送标签和代码
git push --follow-tags origin main
# 发布到npm
npm publish
```

## 参考仓库

1. https://github.com/bitjson/typescript-starter
