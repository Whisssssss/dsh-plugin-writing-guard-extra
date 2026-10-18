# Writing Guard

[![CI](https://github.com/xmutfyh/dsh-plugin-writing-guard/actions/workflows/ci.yml/badge.svg)](https://github.com/xmutfyh/dsh-plugin-writing-guard/actions/workflows/ci.yml)
[![npm](https://img.shields.io/npm/v/dsh-plugin-writing-guard)](https://www.npmjs.com/package/dsh-plugin-writing-guard)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## 面向 AI 辅助科研的科学写作与文档完整性守卫

**少一些解释，多一些论证。守住科学。**

Writing Guard 把提示词引导的科学写作纪律与确定性完整性检查结合起来，服务于 AI 辅助科研。
它在五个层面保护你的稿件：

| 守卫 | 防范的问题 | 风险 |
|-------|------------------|------|
| **STYLE** | 论证经济性 | 防御性写作、过度解释、语义重复、模板腔 |
| **EVIDENCE** | 科学漂移 | 数值、单位、引用、结论被改 |
| **JOURNAL** | 期刊错配 | scope/style/convention 不匹配 |
| **DELIVERY** | 上下文泄漏 | prompt、notes、workflow metadata 泄漏 |
| **DOCUMENT** 🆕 | 文档损坏 | Word 格式、公式、表格、OOXML 被破坏 |

**提示词引导写作 · 确定性完整性内核 · 394 项测试**

```
npm install dsh-plugin-writing-guard
```

> Writing Guard 不替你写论文。
> 它让 AI 辅助写作更安全地交付。

---

## 2.0 新特性 — 论证经济性与控制面分离

Writing Guard 2.0 把语义风格决策**提前到生成之前**，并让确定性代码专注于完整性。

- **批评不是内容** — 审稿人/用户/守卫的措辞属于控制上下文，不是稿件证据。
- **优先删除而非重写** — 如果一句话只是在预防批评、安抚审稿人、标榜重要性或重复显而易见的含义，删掉它。
- **不要闭合每个语义环** — 在证据与必要解读之后停笔；保留不显然的统计解读与可复现细节。
- **纯风格修改默认同长或更短** — 没有新增受支持内容，就不要做解释性膨胀。
- **自动审计不再回注片段或改写建议** — 只把结构化的规则/动作元数据发回给 agent。
- 新增面向防御性措辞、语义闭合标记与无内容评价的中英文线索。

示例：

```text
避免：  为防止数据泄漏，归一化只使用训练数据并做了仔细处理。
改为：  归一化参数由训练数据估计得到。
```

第二句只陈述方法事实，不夹带“为什么要提这件事”的防御性理由。

---

## 🛡️ Word 文档守卫（1.8 引入）

**只改要求改的，核验没要求改的。**

AI 辅助文档编辑有一个隐蔽风险：要求的文字改好了，稿件的无关部分却悄悄变了。

当你让 AI agent “只重写第 3 段”时，它可能无意中修改：

- 公式结构
- 表格边框
- 编号
- 样式
- 节版面
- 关系（relationships）
- 嵌入媒体
- OOXML 包部件

Writing Guard 1.8 为 Word 稿件引入了**文档完整性层**：

| 特性 | 作用 |
|---------|--------------|
| **安全范围编辑** | 只有指定范围可以改变 |
| **包验证** | 编辑后校验 DOCX/OOXML 包完整性 |
| **结构指纹** | 对比编辑前后的文档结构 |
| **公式完整性** | 检查公式结构、编号连续性、数学字体漂移 |
| **学术表格感知** | 区分数据表与版式/图片容器 |
| **前后完整性核验** | 确定性核验，而不是“我觉得没问题” |

### 修改前后

**不用 Writing Guard：**
```
“请优化第 3 段的措辞。”
→ AI agent 修改 DOCX。
→ 结果：该段看起来更好。
→ 未知：还改了什么？
```

**使用 Writing Guard：**
```
“请优化第 3 段的措辞。”
→ Writing Guard：
   ✓ 范围已验证
   ✓ 包有效
   ✓ 公式未变
   ✓ 受保护结构未变
   ✓ 文档指纹已核对
→ 结果：该段已修改——同时检测到了非预期的文档漂移。
```

---

## 快速开始

```sh
# 安装
dsh plugin add dsh-plugin-writing-guard

# 重启
dsh web
```

### 自然语言用法

安装后可以直接用自然语言：

| 这样说 | Writing Guard 会做 |
|----------|------------------------|
| “帮我检查论文写作质量” | `writing_word_audit` |
| “把表格改成三线表” | `writing_word_format_tables` |
| “扫描DOCX结构” | `writing_word_scan` |
| “修改第三章的XXX” | `writing_word_edit` |
| “编辑后验证范围” | `writing_word_scope_check` |
| “检查有没有AI味” | `writing_audit` |

---

## 五层守卫详解

### STYLE — 论证经济性与行文纪律

在写作前引导宿主模型，再用确定性线索审计机械化、防御性与过度解释的文字：

- 修改残留：`revised`、`as requested`、`本轮`、`审稿人要求`
- 防御性写作：让步堆叠、预先辩解局限
- 机械化修辞：`不是X而是Y`、滥用 `rather than`、三连排比
- LLM 高频词：`delve` / `tapestry` / `testament`（按密度）
- 中文模式与平均句长异常

### EVIDENCE — 学术性与认知锁

在 AI 编辑过程中保护科学事实：

- 数字、百分比、p 值、置信区间、单位
- 引用、图/表编号、DOI
- 因果强度：`associated with` 不能变成 `caused`
- 零结果：`no significant difference` 不能消失
- 范围边界与证据状态

### JOURNAL — 目标期刊契合

按目标期刊惯例校准稿件：

- 句法结构（句长、段长）
- 语态与人称（被动语态、第一人称使用）
- 引用（文献引用、图/表引用）
- 科学主张（主张密度、因果/证据强度）
- 修辞动作（覆盖度、规范顺序）

### DELIVERY — 上下文泄漏检测

防止工作流上下文泄漏进最终交付物：

- 被否决的替代方案
- 修改过程残留
- 来源泄漏
- 防御性对冲泄漏

### DOCUMENT — Word 文档完整性 🆕

安全编辑 Word 稿件而不破坏结构：

```
writing_word_scan → writing_word_edit → writing_word_scope_check
```

**13 个工具**覆盖完整文档完整性：

| 工具 | 用途 |
|------|---------|
| `writing_word_scan` | 结构扫描 |
| `writing_word_edit` | 安全范围编辑 |
| `writing_word_audit` | .docx 写作审计 |
| `writing_word_scope_check` | 范围完整性核验 |
| `writing_word_format_tables` | 三线表格式化 |
| `writing_word_audit_equations` | OMML 公式审计 |
| `writing_word_package_validate` | OOXML 包验证 |
| `writing_word_fingerprint` | 基线格式指纹 |
| `writing_audit` | 文本写作审计 |
| `writing_rules` | 写作纪律速查 |
| `writing_style_profile` | 作者风格档案 |
| `writing_journal_profile` | 期刊写作档案 |
| `writing_delivery_audit` | 交付完整性审计 |

---

## 安装

```sh
# 从 npm 安装（推荐）
dsh plugin add dsh-plugin-writing-guard

# 从 GitHub 安装
dsh plugin add github:xmutfyh/dsh-plugin-writing-guard

# 从本地源码安装
dsh plugin add ./path/to/dsh-plugin-writing-guard
```

**前置条件：**
- Node.js ≥ 18
- Python 3.10+ 与 `python-docx`（`pip install python-docx`）

---

## 架构

```
Writing Guard
├── STYLE (writing_audit)
│   ├── 修改残留检测
│   ├── AI 风格模式
│   └── 基于密度的阈值
├── EVIDENCE (Scholarship/Epistemic Lock)
│   ├── 数字/单位保全
│   ├── 引用完整性
│   └── 主张强度守恒
├── JOURNAL (Journal Profile)
│   ├── 语料感知分析
│   ├── 章节级对比
│   └── 修辞动作匹配
├── DELIVERY (CAL 检测)
│   ├── 被否决方案泄漏
│   ├── 过程残留
│   └── 基线真实性检查
└── DOCUMENT (Word Guard) 🆕
    ├── 结构扫描
    ├── 安全编辑
    ├── 包验证
    ├── 指纹
    └── 公式审计
```

**设计原则：** 基线稿件 > 期刊/模板 > 插件默认值。

LLM/agent 决定*改什么*。确定性的 Word 代码决定*如何*改，而不悄悄改变无关格式。

---

## 测试

```sh
npm test
```

394 项确定性测试覆盖：
- STYLE、Scholarship Lock、Epistemic Lock
- 主张对齐、本地引用完整性
- Journal Profile、Journal Fit
- DELIVERY（CAL 检测）
- **Word Guard**（v1.8.2）：OOXML 验证、指纹、公式审计

---

## 安全与隐私

- 确定性完整性检查在本地运行；语义写作决策由宿主模型在 Writing Guard 策略下完成。
- 插件只读取正在编辑的文件。
- 插件本身不上传或收集稿件内容。
- 详见 [SECURITY.md](SECURITY.md)

---

## 为什么选择 Writing Guard？

| | Writing Guard | Humanizer | AI Detector |
|---|---|---|---|
| 写作前规则 | ✅ | ❌ | ❌ |
| 写作中检查 | ✅ | 通常 ❌ | ❌ |
| 自动监控稿件 | ✅ | ❌ | ❌ |
| 整篇重写 | ❌ | ✅ | ❌ |
| 可解释的问题 | ✅ | 部分 | 部分 |
| 确定性完整性检查 | ✅ | 通常没有 | 视情况 |

> Humanizer 在写完后重写。Writing Guard 在写作中预防。

---

## 品牌

```
                  WRITING GUARD
                       │
       Scientific Writing & Document Integrity
                       │
 ┌─────────┬──────────┬─────────┬──────────┬──────────┐
 STYLE   EVIDENCE   JOURNAL   DELIVERY   DOCUMENT
                                            │
                               Change what was requested.
                               Verify what wasn't.
```

**经典口号：** 少一点 AI 味，多一点证据，更好的期刊契合，干净的交付。

**文档口号：** 只改要求改的，核验没要求改的。

---

## 更新日志

见 [CHANGELOG.md](CHANGELOG.md)。

## 许可证

MIT
