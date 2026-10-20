# LoopForge 社区介绍页 · Community intro page

**在线访问 / Live:** https://loopforge.cn/

这是 [Tencent/LoopForge](https://github.com/Tencent/LoopForge) 的**非官方**社区介绍页：一个分段播放的单页（滚一下进入下一段，每段自动放完）。开头两段介绍自部署平台（SOP 流程设计器、人工审批关口），然后跟着一句需求（`/start-devflow "为订单列表增加状态筛选，并补充接口测试"`）用 LoopForge Local 走完澄清、方案、实现、独立审查、测试、断点续跑、交付，最后是本地看板和安装命令（平台 + 5 个 Agent）。和腾讯官方无关，LoopForge 本身以 [MIT 协议](https://github.com/Tencent/LoopForge/blob/main/LICENSE) 开源。

**在线试用 / Playground:** https://loopforge.cn/playground/ —— 在浏览器里选一条内置 SOP、启动运行、看节点推进和产物，在人工验收节点放行或打回。

An **unofficial** community intro page for [Tencent/LoopForge](https://github.com/Tencent/LoopForge). A single paged story (one scroll per scene, each scene plays itself). It opens with the self-hosted platform (SOP designer, human approval gate), then follows one request through clarify, plan, build, independent review, test, resume and deliver with LoopForge Local, and ends with the local dashboard and install commands (platform + 5 agents). Not affiliated with Tencent.

The playground (`playground/`) lets you pick a built-in SOP, start a run, watch nodes progress, and approve or send work back at the sign-off gate, all in the browser. LoopForge itself is [MIT licensed](https://github.com/Tencent/LoopForge/blob/main/LICENSE).

## 演示数据 / Demo data

页面里的对话、diff、审查意见、测试结果和看板数字都是为了演示编的，不是 LoopForge 真实运行的输出。`dash/` 是上游看板页面的副本，配了一份合成的 `dashboard-data.json`。

`playground/` 是纯前端模拟：SOP 的节点、类型、产物路径、打回目标、角色和指令取自上游 `migrations/seed/001_public_catalog.sql`；运行轨迹和产物内容是示例数据。不调用模型、不执行代码，除静态文件和 Google Fonts 外不发请求（页面 CSP 设了 `connect-src 'none'`），输入内容只留在当前标签页。

All conversations, diffs, review comments, test output and dashboard numbers are made up for illustration. `dash/` is a copy of the upstream dashboard page fed with synthetic `dashboard-data.json`.

`playground/` is a front-end-only simulation: SOP nodes, types, output paths, reject targets, roles and instructions come from upstream `migrations/seed/001_public_catalog.sql`; run traces and artifact bodies are demo data. It calls no model, runs no code and loads nothing beyond its static files and Google Fonts (CSP `connect-src 'none'`); input stays in the current tab.

## 本地预览 / Run locally

```bash
python3 -m http.server 8000
# open http://localhost:8000/
```

纯静态，无构建步骤。Static files only, no build step. 中文 / English: `?lang=zh` / `?lang=en`.

## 支持的 Agent / Agents shown

Claude Code、Codex、Cursor、CodeBuddy（Classic + Portable），Pi（仅 Portable，`skills install pi` + `pi install npm:pi-subagents`），命令都取自上游 README。
Claude Code, Codex, Cursor, CodeBuddy (Classic + Portable) and Pi (Portable only); commands are taken from the upstream README.

## 商标 / Trademarks

页面里的产品 Logo 只用来标明每条命令对应哪个 Agent，商标归各自所有者：Claude（Anthropic）、Codex（OpenAI）、Cursor（Anysphere）、CodeBuddy（Tencent）、Pi（Earendil / pi.dev）。前四个的单色图形取自 [LobeHub Icons](https://github.com/lobehub/lobe-icons)（MIT），Pi 的图形取自 pi.dev 的 favicon。本页与这些公司无关。

Product logos are used only to label which agent each command targets; they are trademarks of their owners: Claude (Anthropic), Codex (OpenAI), Cursor (Anysphere), CodeBuddy (Tencent), Pi (Earendil / pi.dev). The first four monochrome marks come from [LobeHub Icons](https://github.com/lobehub/lobe-icons) (MIT); the Pi mark is from pi.dev's favicon. This page is not affiliated with any of them.

## License

MIT, see [LICENSE](LICENSE). `dash/index.html` © Tencent, MIT.
