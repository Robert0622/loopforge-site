/* LoopForge playground data.
   SOP structure (node ids, names, types, outputs, rejectTo, maxAttempts, roles, instructions) mirrors the public catalog
   in Tencent/LoopForge migrations/seed/001_public_catalog.sql. Run logs and artifact bodies are synthetic demo content. */
window.PG_DATA=(function(){
const DOM={
 bugfix:{zh:'缺陷根因、复现与回归',en:'bug root cause, reproduction and regression'},
 backend:{zh:'后端服务、数据与 API',en:'backend services, data and APIs'},
 product:{zh:'产品方案、用户场景与验收规范',en:'product specs, user scenarios and acceptance criteria'}};
const ROLE={
 clarify:{zh:'确认目标、范围、用户、边界与可测试验收标准，输出 requirement.md。不要开始编码。',en:'Confirm goal, scope, users, boundaries and testable acceptance criteria; write requirement.md. Do not start coding.'},
 design:{zh:'阅读已确认需求与可用代码，写出最小实现方案、接口影响、风险与验证计划到 design.md。未绑定仓库的新项目可在任务工作区设计和实现；修改已有系统或修复缺陷时必须取得相关源码，缺少时明确阻塞并请求补充。',en:'Read the confirmed requirement and available code; write the minimal plan, API impact, risks and verification plan to design.md. New projects without a repository can be built in the task workspace; changing an existing system or fixing a bug requires the relevant source, otherwise state the blocker and ask for it.'},
 implement:{zh:'依据 requirement.md 和 design.md 实现需求，保持范围最小；执行适用验证，记录实现、改动和验证到 implementation.md。',en:'Implement per requirement.md and design.md with minimal scope; run applicable checks and record the implementation, changes and verification in implementation.md.'},
 review:{zh:'独立审查改动及测试证据；按严重程度列出有位置与影响的缺陷及修复建议到 review.md。发现阻断问题必须明确写出 REJECT。不得伪造通过结论。',en:'Independently review the changes and test evidence; list defects by severity with location, impact and fix suggestions in review.md. Blocking issues must be marked REJECT. Never fake a pass.'},
 test:{zh:'根据验收标准执行项目真实测试、构建及必要端到端场景。必要时修复问题并复测。将命令、退出码、结果、未验证范围写到 test-report.md。',en:'Run the project\'s real tests, build and necessary end-to-end scenarios against the acceptance criteria. Fix and retest when needed. Write commands, exit codes, results and unverified scope to test-report.md.'},
 deliver:{zh:'核对各阶段实际产物与验证证据，将完成内容、真实测试结果、已知限制及交付物清单写到 delivery.md。未绑定仓库时交付任务工作区中的源码和报告，无需 Git Token；仅在用户明确要求且已配置目标 GitHub 仓库及凭据时创建 PR，不得自行合并。',en:'Check every stage\'s actual artifacts and evidence; write what was done, real test results, known limits and the deliverable list to delivery.md. Without a repository, deliver the workspace source and reports (no Git token needed); open a PR only when explicitly asked and a GitHub repo and credentials are configured, and never merge it.'}};
const PROLE={
 clarify:{zh:'确认目标、范围、用户场景、业务边界与可检查的验收标准，输出 requirement.md。信息不足时明确列出假设和待确认项。',en:'Confirm goal, scope, user scenarios, business boundaries and checkable acceptance criteria; write requirement.md. List assumptions and open questions when information is missing.'},
 design:{zh:'阅读 requirement.md，梳理用户旅程、功能范围、交互流程、业务规则、风险和验收标准，将产品方案写到 design.md。只交付文档，无需代码仓库，不执行编码或 Git 操作。',en:'Read requirement.md and lay out user journeys, scope, interaction flow, business rules, risks and acceptance criteria in design.md. Documents only: no repository, no coding, no Git.'},
 review:{zh:'依据 requirement.md 独立审查 design.md 的完整性、一致性、边界场景与验收标准。将具体问题、文档位置、影响及修改建议写到 review.md。发现阻断问题必须明确写出 REJECT；不得伪造验证结论。',en:'Independently review design.md against requirement.md for completeness, consistency, edge cases and acceptance criteria. Write concrete issues, locations, impact and suggestions to review.md. Blocking issues must be marked REJECT; never fake a verdict.'},
 deliver:{zh:'在人工验收后核对 requirement.md、design.md 和 review.md，将实际完成内容、验收结论、待确认问题、已知限制及交付物清单写到 delivery.md。只交付工作区文档，无需 Git Token，不创建代码提交或 PR。',en:'After sign-off, check requirement.md, design.md and review.md; write what was done, the sign-off result, open questions, known limits and the deliverable list to delivery.md. Workspace documents only: no Git token, no commits or PRs.'}};
const NN={clarify:['需求定型','Clarify'],design:['方案设计','Design'],implement:['开发实现','Implement'],review:['独立评审','Review'],test:['测试验证','Test'],accept:['人工验收','Sign-off'],deliver:['交付汇总','Deliver'],
 prepare:['生成验收报告','Generate report'],approve:['请确认验收报告','Confirm the report'],finish:['完成验收','Finish']};
const OUT={clarify:'requirement.md',design:'design.md',implement:'implementation.md',review:'review.md',test:'test-report.md',deliver:'delivery.md'};
function agentSop(id,kind,ids,rejectTo,rule){return ids.map(n=>n==='accept'?{id:n,type:'approval',maxAttempts:1,rejectTo}:
 {id:n,type:'agent',agentId:`${id}-${n}`,executorId:'codebuddy',maxAttempts:2,out:OUT[n],rule,
  ins:{zh:`工作领域：${DOM[kind].zh}。`+(kind==='product'?PROLE:ROLE)[n].zh+(kind==='bugfix'&&n==='clarify'?'可以不绑定仓库，但必须先取得用户提供的待修代码和复现材料；缺少时明确列出阻塞项并请求补充，不得编造复现或声称已修复。':''),
       en:`Domain: ${DOM[kind].en}. `+(kind==='product'?PROLE:ROLE)[n].en+(kind==='bugfix'&&n==='clarify'?' A repository is optional, but the code to fix and reproduction material must be provided first; otherwise list the blockers and ask, never invent a reproduction or claim a fix.':'')}})}
const FULL=['clarify','design','implement','review','test','accept','deliver'];
const SOPS=[
 {id:'welcome-workflow',kind:'welcome',name:['平台验收 · 脚本与审批','Platform check · script and approval'],desc:['无需模型密钥。真实运行脚本、查看产物，在人工审批后继续执行。','No model key needed. Runs a real script, saves the artifact, and continues after a human approval.'],
  sandbox:'local',noAgent:true,title:['体验平台：脚本 + 人工审批','Try the platform: script + approval'],body:['跑一遍最小流程，看看产物、审批和恢复是怎么衔接的。','Run the smallest flow and see how artifacts, approval and resume fit together.'],
  nodes:[{id:'prepare',type:'script',maxAttempts:1,out:'reports/welcome.md',script:{zh:"mkdir -p reports\nprintf '# LoopForge 本地验收\\n\\n已验证：真实脚本节点、持久化产物、人工审批与恢复。\\n' > reports/welcome.md",en:"mkdir -p reports\nprintf '# LoopForge local check\\n\\nVerified: real script node, persisted artifact, human approval and resume.\\n' > reports/welcome.md"}},
   {id:'approve',type:'approval',maxAttempts:1,rejectTo:'prepare'},
   {id:'finish',type:'script',maxAttempts:1,out:'completed.md',script:{zh:"printf '# 验收完成\\n\\n审批已通过，执行成功恢复。\\n' > completed.md",en:"printf '# Check complete\\n\\nApproval passed and execution resumed.\\n' > completed.md"}}]},
 {id:'issue-fix-production',kind:'bugfix',name:['通用缺陷修复 SOP','Bug fix SOP'],desc:['先复现，再修复，独立评审并回归。','Reproduce first, then fix, review independently and regress.'],sandbox:'generic-docker',
  title:['修复订单导出的时区错误','Fix timezone bug in order export'],body:['导出 CSV 里的下单时间比页面上显示的早 8 小时。复现：在订单页导出今天的订单，对比 created_at。','Order times in the CSV export are 8 hours earlier than on the page. Repro: export today\'s orders and compare created_at.'],
  nodes:agentSop('issue-fix-production','bugfix',FULL,'implement','public-engineering')},
 {id:'generic-backend-delivery',kind:'backend',name:['通用后端交付 SOP','Backend delivery SOP'],desc:['后端需求从需求定型到独立评审与交付。','Backend work from clarification through independent review to delivery.'],sandbox:'generic-docker',
  title:['订单列表接口支持按状态筛选','Filter the orders API by status'],body:['GET /orders 支持 status 参数，可多选，非法值返回 400，并补充接口测试。','GET /orders accepts a multi-value status parameter, rejects unknown values with 400, with API tests.'],
  nodes:agentSop('generic-backend-delivery','backend',FULL,'implement','public-engineering')},
 {id:'generic-product-delivery',kind:'product',name:['通用产品方案 SOP','Product spec SOP'],desc:['完成需求分析、产品方案文档与独立验收；无需代码仓库或 Git Token。','Requirement analysis, a product spec and independent review; no repository or Git token needed.'],sandbox:'generic-docker',
  title:['会员积分体系产品方案','Membership points: product spec'],body:['设计下单得积分、积分抵扣和过期规则，给出验收标准。','Design earning points on orders, redeeming them and expiry rules, with acceptance criteria.'],
  nodes:agentSop('generic-product-delivery','product',['clarify','design','review','accept','deliver'],'design','public-product-documents')}];
const RULES={'public-engineering':['工程与验证约束','Engineering and verification rules'],'public-product-documents':['产品文档与验收约束','Product document and acceptance rules']};
return {SOPS,NN,RULES};
})();
