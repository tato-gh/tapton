# タップとん

個人用のポータルを構築するためのモバイルアプリケーションです。
端的なイメージは、一日（より短い）単位のチェックリスト/ブックマークです。


## メモ：開発トラブルシューティング

(1) 起動時のERR_OSSL_EVP_UNSUPPORTED

下記を実行する

`export NODE_OPTIONS=--openssl-legacy-provider`

