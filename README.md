# たっぷとん

個人用ポータルを構築するためのモバイルアプリケーションです。
端的なイメージは、一日（より短い）単位のチェックリスト/ブックマークです。


## ディレクトリ構成

```
src/
├── App.tsx
├── components
│   ├── atoms / 最小パーツ。マージンなどの位置を決め打たない
│   ├── molecules / ドメイン独自機能のないpresentational components。また何に使うかは外から指定
│   ├── organisms / ドメイン独自機能(domains参照機能)があるpresentational components
│   └── templates / 最上段のpresentational components。screen単位が基本
├── constants
├── domains / ドメイン（コンテキスト）独自機能群。ビュー(tsx)にあたるものは含まない
│   └── tapboard / 機能名をつけて分離
│       ├── storage
│       └── types
├── features / 機能単位フォルダ
│   └── tapboard / 機能名をつけて分離
│       ├── components / organisms, ecosystemsが主なため細かいディレクトリは基本的に不要
│       ├── constants.ts
│       ├── hooks
│       ├── types
│       └── utils
├── hooks
├── navigation
├── screens
└── utils
```


## Build Android APK

`eas build -p android --profile preview --local`

