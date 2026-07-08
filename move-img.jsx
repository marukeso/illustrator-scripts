// move-img.jsx
// 選択中のオブジェクトを「img」レイヤーへ移動する（無ければ作成）。
// 複数選択に対応。移動後、件数を通知するのでレイヤーパネルで全部移ったか確認できる。
// 実処理は _shared.jsxinc（同じフォルダに置くこと）。

#include "_shared.jsxinc"

moveToLayer("img");
