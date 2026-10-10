# LoopForge 社区介绍页 · Community intro page

**在线访问 / Live:** https://yanami-2k.github.io/loopforge-site/

这是 [Tencent/LoopForge](https://github.com/Tencent/LoopForge) 的**非官方**社区介绍页：一个滚动讲故事的单页，跟着一句需求（`/start-devflow "为订单列表增加状态筛选，并补充接口测试"`）走完澄清、方案、实现、独立审查、测试、断点续跑、交付，最后是本地看板和安装命令。和腾讯官方无关，LoopForge 本身以 [MIT 协议](https://github.com/Tencent/LoopForge/blob/main/LICENSE) 开源。

An **unofficial** community intro page for [Tencent/LoopForge](https://github.com/Tencent/LoopForge). A single scroll-driven page that follows one request through clarify, plan, build, independent review, test, resume and deliver, then shows the local dashboard and install commands. Not affiliated with Tencent. LoopForge itself is [MIT licensed](https://github.com/Tencent/LoopForge/blob/main/LICENSE).

## 演示数据 / Demo data

页面里的对话、diff、审查意见、测试结果和看板数字都是为了演示编的，不是 LoopForge 真实运行的输出。`dash/` 是上游看板页面的副本，配了一份合成的 `dashboard-data.json`。

All conversations, diffs, review comments, test output and dashboard numbers are made up for illustration. `dash/` is a copy of the upstream dashboard page fed with synthetic `dashboard-data.json`.

## 本地预览 / Run locally

```bash
python3 -m http.server 8000
# open http://localhost:8000/
```

纯静态，无构建步骤。Static files only, no build step. 中文 / English: `?lang=zh` / `?lang=en`.

## License

MIT, see [LICENSE](LICENSE). `dash/index.html` © Tencent, MIT.
