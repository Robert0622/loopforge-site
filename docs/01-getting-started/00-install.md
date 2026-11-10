# 安装与启动

> **快速开始 · 安装** · 把开源版 LoopForge 装到自己的电脑或云服务器上。装好后用浏览器打开访问地址，创建的第一个账号就是平台管理员。

## 开始之前准备什么

| 依赖 | 用来做什么 |
| --- | --- |
| **Git** | 克隆仓库 |
| **curl** | 安装过程中下载组件 |
| **Python 3** | 运行安装脚本 |
| **Docker（含 Compose）** | 启动平台、数据库和云端沙箱 |

没装 Docker 时，直接运行下面的 `./start.sh`，脚本会询问并帮你安装。设置 `LOOPFORGE_YES=1` 可以跳过询问。全新 Ubuntu 可以先装好前三项：

```bash
sudo apt-get update && sudo apt-get install -y git curl python3
```

普通用户就能安装。当前用户不能直接访问 Docker 时，脚本会改用 `sudo`，不必把账号加进 docker 组，也不必重新登录。

## 三行命令启动平台

```bash
git clone https://github.com/Tencent/LoopForge.git
cd LoopForge
./start.sh
```

`./start.sh` 和 `bash scripts/install.sh` 是同一条安装路径。它会检查依赖、生成带独立密钥的 `.env`（已有文件会保留，重复执行是安全的），然后拉取 `compose.yaml` 里钉死的发布镜像并在后台启动。这一步**不会在本机构建镜像**。

终端会打印公网、局域网和本机地址。默认端口是 **8090**，本机一般是 `http://localhost:8090`。

## 创建第一个管理员

1. 用浏览器打开终端打印的地址。
2. 登录卡片会提示：**「这是首次启动。创建的第一个账号将成为平台管理员。」**
3. 填写用户名和至少 6 位的密码，确认后提交。请记下这个密码。

管理员账号创建之前，不要把这个地址暴露到公网。云服务器先把安全组限制到你自己的 IP，放通 HTTP 端口后再给同事用。需要关闭公开注册时，把 `.env` 里的 `AGENTFLOW_ALLOW_SIGNUP` 设为 `false`，再由管理员在 **「平台管理 → 成员账号」** 里给同事开账号。

## 装好之后的常用命令

在仓库目录里执行：

| 你想做的事 | 命令 |
| --- | --- |
| 看平台日志 | `./start.sh logs` |
| 停止服务（数据还在） | `./start.sh stop` |
| 再次启动 | `./start.sh` |
| 重启平台容器 | `./start.sh restart` |
| 拉取新镜像并更新有变化的容器 | `./start.sh pull` |
| 改用当前源码构建 | `./start.sh dev` |
| 从源码构建切回发布镜像 | `./start.sh release` |

`./start.sh down` 会删掉容器，数据卷仍然保留。

## 端口被占用，或只想本机访问

第一次启动前如果 8090 已被占用：

```bash
AGENTFLOW_HTTP_PORT=8092 ./start.sh
```

只在本机监听、不对网卡开放：

```bash
LOOPFORGE_BIND=127.0.0.1 ./start.sh
```

已经生成过 `.env` 之后，改端口请直接编辑 `.env`，再执行 `./start.sh restart`。

## 首页「快速部署」里的另外几条命令

官网首页的部署区还有一组 **LoopForge Local** 标签。那不是把平台装到本机，而是把内置工作流装进你已经在用的编程助手，不需要 Docker 服务端。

`loopforge-cli` 目前只安装到这 5 个宿主：

| 宿主 | 安装 |
| --- | --- |
| Claude Code、CodeBuddy、Cursor | `npx -y loopforge-cli@latest install claude`（宿主名换成 `codebuddy` 或 `cursor`），然后输入 `/start-devflow "需求"` |
| Codex | `npx -y loopforge-cli@latest install codex`，然后输入 `$devflow-codex "需求"` |
| Pi | `npx -y loopforge-cli@latest skills install pi`，再执行 `pi install npm:pi-subagents`，然后输入 `/skill:devflow "需求"` |

**OpenCode、Antigravity、Kimi Code、DeepSeek Harness** 是平台工作台和 SOP 里可选的执行器，不是 `loopforge-cli install` 的目标。在平台里使用时，到 **「设置 → 个人配置」** 填对应的 API Key 即可，见 [配置模型 API Key](06-configure-api-key.md)。

如果要在自己的电脑上单独安装 **Kimi Code CLI**（执行机器会探测名为 `kimi` 的命令），用官方脚本：

```bash
curl -fsSL https://code.kimi.com/kimi-code/install.sh | bash
kimi --version
```

也可以用 Node.js 22.19 或更高版本执行 `npm install -g @moonshot-ai/kimi-code`。装好后新开一个终端，确认 `kimi` 已在 `PATH` 里。

## 下一步

打开 [账号注册与首次登录](04-account-and-login.md)，确认已经进入默认的体验项目。还没准备模型 Key 时，可以先走 [3 分钟免配置体验](05-try-without-key.md)。

---

← 上一篇：[界面布局与导航速览](03-interface-tour.md) | [返回文档总目录](../README.md) | 下一篇：[账号注册与首次登录](04-account-and-login.md) →
