// rename-to-asset.jsx
// 選択中のオブジェクトの名前をすべて「asset」にする。
// 複数選択している場合は、選択した全オブジェクトに一括で付与する。

(function () {
    // ドキュメントが開かれているか
    if (app.documents.length === 0) {
        alert("ドキュメントが開かれていません。");
        return;
    }

    var doc = app.activeDocument;
    var sel = doc.selection;

    // 選択チェック（selection はオブジェクトの配列。テキスト編集中は TextRange が入る）
    if (!sel || sel.length === 0) {
        alert("オブジェクトが選択されていません。");
        return;
    }

    var count = 0;
    for (var i = 0; i < sel.length; i++) {
        try {
            // PathItem / GroupItem / TextFrame などは name プロパティを持つ
            sel[i].name = "asset";
            count++;
        } catch (e) {
            // name を持たない選択（文字範囲など）はスキップ
        }
    }

    // 連続作業の邪魔にならないよう、失敗時のみ通知する
    if (count === 0) {
        alert("名前を設定できる対象がありませんでした。\n（文字を編集中の状態などが選択されている可能性があります）");
    }
})();
