# Nick Editor

[English](#english) | [中文](#chinese)

<a id="english"></a>

This is a rich text editor project built with Turborepo.

## Project Structure

The project contains the following packages:

### Core Packages

- `editor`: Editor core package
- `ui`: Shared React component library
- `extension-paragraph`: Paragraph extension package
- `extension-table`: Table extension package
- `extension-table-handler`: Table handler extension package

### Tool Configuration Packages

- `typescript-config`: Shared TypeScript configuration
- `eslint-config`: Shared ESLint configuration

## Tech Stack

The project uses the following technologies:

- [TypeScript](https://www.typescriptlang.org/) - Static type checking
- [ESLint](https://eslint.org/) - Code linting
- [Prettier](https://prettier.io) - Code formatting
- [Turborepo](https://turbo.build/repo) - Monorepo build system

## Development Guide

### Install Dependencies

```bash
pnpm install
```

### Development Mode

```bash
pnpm dev
```

### Build Project

```bash
pnpm build
```

## Cache Configuration

The project uses Turborepo's caching feature to improve build speed. Local caching is used by default.

### Enable Remote Caching

1. Login to Vercel:
```bash
npx turbo login
```

2. Link to remote cache:
```bash
npx turbo link
```

## Related Documentation

- [Turborepo Documentation](https://turbo.build/repo/docs)
- [Task Configuration](https://turbo.build/repo/docs/core-concepts/monorepos/running-tasks)
- [Cache Configuration](https://turbo.build/repo/docs/core-concepts/caching)
- [Remote Caching](https://turbo.build/repo/docs/core-concepts/remote-caching)
- [Filter Configuration](https://turbo.build/repo/docs/core-concepts/monorepos/filtering)

---

<a id="chinese"></a>

# Nick Editor

这是一个基于 Turborepo 构建的富文本编辑器项目。

## 项目结构

该项目包含以下包：

### 核心包

- `editor`: 编辑器核心包
- `ui`: 共享的 React 组件库
- `extension-paragraph`: 段落扩展包
- `extension-table`: 表格扩展包
- `extension-table-handler`: 表格处理器扩展包

### 工具配置包

- `typescript-config`: 项目共享的 TypeScript 配置
- `eslint-config`: 项目共享的 ESLint 配置

## 技术栈

项目使用以下技术：

- [TypeScript](https://www.typescriptlang.org/) - 静态类型检查
- [ESLint](https://eslint.org/) - 代码检查
- [Prettier](https://prettier.io) - 代码格式化
- [Turborepo](https://turbo.build/repo) - Monorepo 构建系统

## 开发指南

### 安装依赖

```bash
pnpm install
```

### 开发模式

```bash
pnpm dev
```

### 构建项目

```bash
pnpm build
```

## 缓存配置

项目使用 Turborepo 的缓存功能来提升构建速度。默认情况下使用本地缓存。

### 启用远程缓存

1. 登录 Vercel：
```bash
npx turbo login
```

2. 链接到远程缓存：
```bash
npx turbo link
```

## 相关文档

- [Turborepo 文档](https://turbo.build/repo/docs)
- [任务配置](https://turbo.build/repo/docs/core-concepts/monorepos/running-tasks)
- [缓存配置](https://turbo.build/repo/docs/core-concepts/caching)
- [远程缓存](https://turbo.build/repo/docs/core-concepts/remote-caching)
- [过滤配置](https://turbo.build/repo/docs/core-concepts/monorepos/filtering)
