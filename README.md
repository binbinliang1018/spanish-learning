# Spanish Learning

一个可直接部署到 GitHub Pages 的西语动词与口语练习静态站点。

## 本地预览

在项目目录运行：

```bash
python3 -m http.server 8000
```

然后访问 `http://127.0.0.1:8000/index.html`。

## GitHub Pages 发布

当前仓库的站点已经在线，使用的是 GitHub Pages 的分支发布方式。

只要把变更推送到 `main` 分支，线上页面就会更新到新版本。

### 如需检查设置

1. 打开仓库的 `Settings -> Pages`
2. 确认 Source 为 `Deploy from a branch`
3. Branch 选择 `main`，目录选择 `/ (root)`
4. 推送代码后等待 1-3 分钟，再访问：

```text
https://binbinliang1018.github.io/spanish-learning/
```

## 访问审批说明

当前版本已经加入轻量审批入口：

- 朋友先在首页填写申请信息
- 可以通过邮件或 WhatsApp 发送申请给 Frances
- Frances 手动批准后，把访问码单独发给对方
- 对方输入访问码后，当前设备才会显示练习内容

### 配置位置

审批相关配置在 `app.js` 的 `ACCESS_CONFIG` 中：

- `approvalEmail`: 接收申请的邮箱
- `approvedCodes`: 当前允许进入站点的访问码列表

> 这是轻量流程控制，不是严格安全方案；因为站点仍然是 GitHub Pages 静态站点。

## 数据说明

当前版本的练习进度保存在浏览器本地存储（localStorage）：

- 每个获准访问的朋友都可以使用同一个公开网址
- 每个人的数据互不影响
- 但不同设备之间不会自动同步

如果后续需要跨设备同步，可以再接入云端数据库。
