## はじめ方
```
docker compose build
docker compose up -d
```
## Next.jsアーキテクト　ルール

components
- shadcn/uiコンポーネント
- 汎用かつロジックのないコンポーネント

features
- ロジックを含むコンポーネント
- 機能単位で作成
- 肥大化しそうなものはカスタムフックへ

lib 
- ライブラリー（主にnextauth）の記述
