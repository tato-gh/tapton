# タップとん

個人用のポータルを構築するためのモバイルアプリケーションです。
端的なイメージは、一日（より短い）単位のチェックリスト/ブックマークです。


## ディレクトリ構成

（仮）

```
src/
  App.tsx
  navigation/
  hooks/
  screens/
  components/
    atoms/
      ... マージンなどの位置を決め打たない
    molecules/
      ... ドメイン独自機能のないpresentational components
      ... organismsから切り出せる汎用的なパーツ（何に使うか、その目的は外からのみ指定される）
    organisms/
      ... ドメイン独自機能(domains/参照機能)があるpresentational components
      ... ドメイン独自のリソースを扱う
      ... templatesの下にあって階層化されて目的が明確な各領域
      ... 目的には大小あるのでorganismsは入れ子になることもある
    ecosystems/
      ... container components （パーツ）担当
      ... organisms をラップするイメージ
    templates/
      ... 最上段のpresentational components。screen単位
  features/
    awesome-feature/
      components/
        ... 大きな機能以外は並列でおく。organisms/ecosystems が主なため
      hooks/
      utils/
      assets/
  utils/
  domains/
    api/
    types/
    awesome-domain/
      api/
      types/
      constants.ts
  constants/
    ... ファイル分けしてみている
```


## メモ

zennのアーカイブに作業記録を残す。

[zenn](https://zenn.dev/ta_to/scraps/2b8e3d4a684dd2)

