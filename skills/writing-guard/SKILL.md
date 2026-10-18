---
name: writing-guard
description: "论文写作、润色、审计与 Word 安全编辑守卫。适用于学术论文、摘要、引言、方法、结果、讨论、回复信、DOCX 编辑、去 AI 味、防御性写作清理、过度解释削减、语义重复清理、科学主张保护、表格格式化与编辑范围核验。Use for scientific manuscript writing, polishing, auditing, academic papers, abstracts, methods, results, discussions, rebuttals, DOCX edits, AI-style cleanup, defensive-writing cleanup, over-explanation reduction, semantic-restatement cleanup, scientific-claim preservation, table formatting, and edit-scope verification."
---

# Writing Guard — 论文写作审计与 Word 安全编辑

## 稿件写作策略（v2.0）

### 控制上下文不是稿件内容

- **批评不是内容。** 审稿人意见、用户编辑指令、守卫发现、被否决的方案与修改建议都属于控制上下文，不是稿件证据。
- 除非权威研究材料独立支持相应表述，否则绝不把控制上下文的措辞引用、转述或转写进稿件正文。
- 若某个关切对应真实的方法事实，只陈述该事实。示例：优先写 `Normalization parameters were estimated from the training data.`，而不是 `To prevent data leakage, ...`。
- 若来源材料无法确立所需事实，不要凭空编造缓解措施。保持稿件不变，或向作者询问。

### 论证经济性

每一句都必须挣得自己的位置：至少增加证据、方法、结果、对比、不显然的解读、必要的范围/证据边界，或论证所需的逻辑关系之一。

如果删掉一句话后科学内容与论证都不受损，**删掉它（CUT）**。优先 CUT 而非 REWRITE。不要把一句无用的话打磨成另一句更精致的无用的话。

删除只承担以下功能的文字：

- 预先化解审稿人批评；
- 让读者放心某个风险已被考虑；
- 为作者或方法辩护；
- 标榜某个发现很重要；
- 叙述写作/修改过程；
- 重复已经明说的主张；
- 解释目标专业读者能直接推出的含义。

### 不要闭合每个语义环

每个科学主张只说一次。在证据与必要的校准解读到位之后，停笔。假设专业读者能独立完成一步显而易见的推断。

把 `In other words`、`This means that`、`Taken together` 以及等价的中文总结标记当作**候选**，而不是禁用语。只有下一句增加了机制、对比、定量解读、条件、引用或必要边界时才保留。

诸如 `This is an important finding.` 这样的独立评价，除非紧接着给出具体后果，否则应删除。

### 清晰不等于穷尽解释

清晰意味着指代明确、句法可读、可复现细节充分，以及解读证据所需的推理。它**不**意味着把每个含义都摊开写。

不要为了简洁而删掉定义、不显然的统计解读、必要的方法细节或真正的认知边界。把难懂指标翻译成有意义结论的句子可以保留；只复述已明说主张的句子应当删除。

### 防御性目的检验

把面向审稿人的预先辩解、反复的非主张免责、对省略实验的辩护、对结果的托词、法律腔的安抚，以及自动生成的“因此这很重要”式总结，视为删除或移位的候选。

对任何此类句子，按顺序追问：

1. 它是否改变了对方法、效度、范围、证据强度或解读的科学上必要的理解？若**否**，CUT。
2. 其底层事实是否被权威研究材料独立支持？若**是**，直接、最小化地陈述该事实；若**否**，QUERY 而不是编造。
3. 该内容是否是真实的局限或替代解释？若**是**，把科学内容保留在合适章节，但去掉面向审稿人的动机与反复安抚。

### 纯风格扩张纪律

当用户只要求润色、改写或风格优化，且没有提供新的科学内容时，默认**同长或更短**。只有在解决真实歧义、保持可复现性或陈述必要科学边界时，扩张才正当。不要仅为让文字显得完整而添加解释。

### 最小编辑协议

使用 **CUT -> PRUNE -> RECAST -> SPLIT**。不要自动把一句难句变成两三句解释句。只有原文确实包含多个独立科学主张时才拆分。

对于防御性文字，**写科学事实，而不是你防御性地提及该事实的理由**。

### 科学不变量

绝不为风格而悄悄改动数字、单位、统计量、引用、图/表引用、否定、零结果、因果强度、证据强度、证据状态、人群、条件或范围。如果更好的句子需要无依据的科学，**QUERY**。


本 skill 提供两大能力：

1. **写作纪律审计**（writing_audit / writing_word_audit）：检测修改过程残留、AI 风格、主张漂移、Scholarship/Epistemic Lock
2. **Word 文档安全编辑**（writing_word_scan / writing_word_edit / writing_word_scope_check）：结构化扫描、局部安全编辑、范围完整性验证
3. **Word 文档格式化**（writing_word_format_tables）：三线表格式化、字体字号调整

## 路由协议

### 步骤 1：判断用户意图

根据用户请求判断需要的能力组合：

| 用户意图 | 需要的工具 |
|----------|-----------|
| 检查论文写作质量 | `writing_audit` 或 `writing_word_audit` |
| 修改 Word 论文的某个章节 | `writing_word_scan` → `writing_word_edit` → `writing_word_scope_check` |
| 扫描 DOCX 结构 | `writing_word_scan` |
| 替换论文中的某些表述 | `writing_word_edit` |
| 编辑后验证范围 | `writing_word_scope_check` |
| 去 AI 味 / 检查 AI 风格 | `writing_audit`（profile=rebuttal 或 manuscript） |
| 检查修改过程残留 | `writing_audit`（传 original 参数开启 Scholarship Lock） |
| 表格改成三线表 | `writing_word_format_tables` |
| 修改字体字号 | 直接用 Python 脚本调用 python-docx |

### 步骤 2：执行流程

#### 流程 A：论文写作审计

1. 确定文件路径和文档类型（manuscript/rebuttal/cover_letter）
2. 调用 `writing_audit` 或 `writing_word_audit`
3. 解读结果并给出修改建议
4. 如有 original 文本，传入以开启 Scholarship/Epistemic Lock

#### 流程 B：Word 文档安全编辑

1. **扫描**：调用 `writing_word_scan` 获取文档结构
2. **定位**：根据用户描述的章节标题确定编辑范围
3. **编辑**：调用 `writing_word_edit` 执行安全替换
4. **验证**：调用 `writing_word_scope_check` 确认未越界修改

#### 流程 C：混合操作（先审计再编辑）

1. 先调用 `writing_word_audit` 检查当前问题
2. 再按流程 B 执行编辑
3. 编辑后再次调用 `writing_word_audit` 确认问题已解决

### 步骤 3：报告结果

- 审计结果：按严重度分类（HIGH/MEDIUM/LOW），给出具体修改建议
- 编辑结果：展示变更清单（Change Manifest），确认范围完整性
- 如有问题未解决，建议下一步操作

## 工具详解

### writing_audit

对文本执行确定性写作与科研完整性扫描；语义文风决策由上方《稿件写作策略》约束宿主模型。

**参数：**
- `text` 或 `filePath`：要检查的文本/文件路径
- `profile`：文档类型（manuscript/rebuttal/cover_letter/review/notes/unknown）
- `verbose`：是否输出每条建议（默认 false）
- `original`：修改前原文（开启 Scholarship Lock + Epistemic Lock）
- `styleProfile`：作者风格档案 JSON（开启句长漂移检测）
- `journalProfile`：目标期刊档案 JSON（开启 Journal Fit 审计）

**检测项：**
- 修改过程残留（revised/本轮/投稿前…）
- 主张校准（防御密度/限定词堆叠/强主张缺证据）
- 修辞模式（不是X而是Y/重复绕圈/三连排比）
- LLM 关联词（delve/tapestry/过渡词堆叠）
- 学术文体（超长句/抽象副词/句长偏离）
- 格式（破折号密度/Unicode 数学符号）

### writing_word_scan

对 .docx 文件执行结构化扫描。

**参数：**
- `filePath`：要扫描的 .docx 文件路径

**返回：**
- 文档 profile（manuscript/rebuttal）
- 标题层级树
- 段落信息（样式、复杂对象检测）
- 表格列表
- 受保护节点警告

### writing_word_edit

对 .docx 文件执行局部安全编辑。

**参数：**
- `filePath`：要编辑的 .docx 文件路径
- `replacements`：替换列表 `[{old: "原文", new: "新文本"}]`
- `scopeConfig`：编辑范围（可选）
  - `startHeading` / `endHeading`：标题范围
  - `heading`：单节标题
- `mode`：编辑模式（text_only/structural/format_normalization）
- `outputPath`：输出路径（可选，默认覆盖）

**保护规则：**
- 不修改：页边距、页眉页脚、section break、页码、图片、参考文献、交叉引用、书签、脚注
- 替换文本时保留原始格式（粗体、斜体、字体、颜色）
- 复杂段落（含公式/图片/字段）使用 XML-aware 编辑

### writing_word_scope_check

验证编辑操作是否修改了请求范围之外的内容。

**参数：**
- `fileBefore`：编辑前的 .docx 文件路径
- `fileAfter`：编辑后的 .docx 文件路径
- `scopeConfig`：预期编辑范围

### writing_word_format_tables

将 .docx 中所有表格转换为学术三线表格式。

**参数：**
- `filePath`：要格式化的 .docx 文件路径
- `outputPath`：输出文件路径（可选，默认覆盖）

**三线表规则：**
- 顶线：1.5pt 粗线
- 表头底线：0.75pt 细线
- 底线：1.5pt 粗线
- 无竖线、无内部横线
- 表头行加粗

## 使用示例

### 示例 1：检查论文写作质量

用户：帮我检查一下 pore_scale_revised.docx 的写作质量

执行：
1. 调用 `writing_word_audit(filePath="pore_scale_revised.docx")`
2. 解读结果，按严重度分类报告

### 示例 2：修改论文特定章节

用户：帮我把第三章的 "leakage-free" 改成 "zero-leakage"

执行：
1. 调用 `writing_word_scan(filePath="pore_scale_revised.docx")` 获取结构
2. 调用 `writing_word_edit(filePath="pore_scale_revised.docx", replacements=[{old: "leakage-free", new: "zero-leakage"}], scopeConfig={startHeading: "3. Model methodology", endHeading: "4. Results and discussion"})`
3. 调用 `writing_word_scope_check(fileBefore="原始文件", fileAfter="编辑后文件")` 验证

### 示例 3：编辑后审计

用户：我改了论文，帮我检查有没有问题

执行：
1. 调用 `writing_word_audit(filePath="修改后的文件")`
2. 如有 original 文本，传入以对比 Scholarhip/Epistemic Lock
3. 报告新增/已解决的问题

### 示例 4：表格改为三线表

用户：帮我把论文里的表格改成三线表

执行：
1. 调用 `writing_word_format_tables(filePath="论文.docx")`
2. 报告转换结果

## 注意事项

- .docx 文件的自动审计已集成到插件的 `autoAuditOnWrite` 机制中
- 编辑 Word 文档时，插件会自动创建备份（.bak 文件）
- 复杂段落（含公式/图片/交叉引用）需要特别小心，插件会自动检测并警告
- 建议在编辑前先调用 `writing_word_scan` 了解文档结构
