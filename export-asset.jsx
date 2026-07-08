// export-asset.jsx
// 選択中のオブジェクトを「asset」にリネーム → asset レイヤーへ移動 → PNG と JPEG で書き出す。
// 複数選択に対応。書き出し先はドキュメント横の assets/ サブフォルダ（自動作成）。
// 実処理は _shared.jsxinc（同じフォルダに置くこと）。

#include "_shared.jsxinc"

renameAndExport("asset");
