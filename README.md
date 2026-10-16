# 知行智学 (Zhixing Zhixue) — 研学服务 AI 平台

> **Competition project** — Vue 3 + TypeScript + Vite
> 研学研究学習サービス AI プラットフォーム

## About

**知行智学** is a research-study (研学) service platform with an integrated
**AI assistant**. Built for **【competition name TBD / 比赛名称待填】**.

It helps students plan and review study trips: pending items (待办事项),
itinerary planning (行程), AI review (AI 复盘), check-in (签到) and data
visualization (饼图 / 雷达图).

## Features

- 📌 **待办事项 (Pending items)** — task lists with status routes and icons
- 🗺️ **行程 (Itinerary)** — day-by-day trip schedule
- 🤖 **AI 复盘 (AI review)** — AI-assisted reflection module
- ✅ **签到 (Check-in)** — daily check-in flow
- 📊 **Data visualization** — pie charts (饼图) & radar charts (雷达图)
- 🔐 **Login** — auth page

## Tech Stack

| Layer | Tech |
| --- | --- |
| Framework | Vue 3 (`<script setup>`, Composition API) |
| Language | TypeScript |
| Build | Vite 5 + vue-tsc |
| Routing | Vue Router |
| HTTP | Axios (typed API layer under `src/api/`) |

## Getting Started

```bash
pnpm install
pnpm dev        # starts Vite dev server
pnpm build      # type-check + production build
```

## Structure

```
src/
├── api/          # typed API layer
├── assets/       # SVG icon system
├── components/   # shared top bar etc.
└── pages/        # home / ai / login
```

## Status

Completed for the competition; screenshots and live demo to be added.
