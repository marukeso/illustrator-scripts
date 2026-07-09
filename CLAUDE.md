# このプロジェクトのルール（illustrator-scripts）

グローバル設定（~/.claude/CLAUDE.md）を継承する。ここには案件固有のことだけを書く。

## リモート
- **リモートあり**（origin: https://github.com/marukeso/illustrator-scripts.git）。
- 依頼時は push してよい（push 先は `origin master`）。破壊的操作・force 系は従来どおり要確認。

## このリポジトリの中身
- Adobe Illustrator を操作する ExtendScript（`.jsx`）置き場。
- 実処理は `_shared.jsxinc` に集約し、各 `.jsx`（move-img / move-asset）は薄いエントリ。
- `.jsx` と `_shared.jsxinc` は同じフォルダ前提（`#include` で相対参照）。
- **廃止：** export-img / export-asset は削除済み。共通処理 `exportLayer()` は `_shared.jsxinc` に残す（`git restore` でエントリを復活可）。

## 動作確認（重要）
- **推測で実装してユーザーに検証させない。** 会社PCで Illustrator が起動していれば、COM 経由で自分で実行・検証できる。
  - 接続: `[Runtime.InteropServices.Marshal]::GetActiveObject("Illustrator.Application")` → `$ai.DoJavaScriptFile(path)`。
  - ユーザーの開いているドキュメントには触らず、scratchpad に一時ドキュメントを作って再現する。
  - 書き出し結果は .NET `System.Drawing.Bitmap` で端ピクセル（輝度・アルファ）を数値検査する。
  - 検証用 `.ps1` は **ASCII のみ**で書く（PowerShell 5.1 が BOM なし UTF-8 を Shift-JIS 誤読して日本語が化ける）。

## Illustrator の落とし穴（この案件で踏んだもの）
- クリップグループ／リンク配置（PlacedItem）の `visibleBounds` は実際の描画範囲とずれる。書き出し境界を正確にしたいときは `doc.rasterize(item, [L,T,R,B], RasterizeOptions)` で整数境界に事前ラスタライズするのが確実。
- `artboardRect` への数値設定や、クリップ矩形の追加は座標系のズレで余白事故を起こした。避ける。
