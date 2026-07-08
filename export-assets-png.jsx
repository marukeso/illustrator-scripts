// export-assets-png.jsx
// 選択中のオブジェクトを、それぞれ PNG として指定フォルダに書き出す。
// 「アセットの書き出し」パネルへの追加は JSX の API に無いため、その実質的なゴール
// （画像ファイルとして書き出す）を直接行う代替スクリプト。

(function () {
    if (app.documents.length === 0) {
        alert("ドキュメントが開かれていません。");
        return;
    }

    var doc = app.activeDocument;
    var sel = doc.selection;

    if (!sel || sel.length === 0) {
        alert("オブジェクトが選択されていません。");
        return;
    }

    // 書き出し先フォルダを選ぶ（初期値はドキュメントと同じ場所）
    var initial = null;
    try { initial = doc.path; } catch (e) {} // 未保存ドキュメントは path が無い
    var folder = (initial && initial.exists)
        ? initial.selectDlg("PNGの書き出し先フォルダを選んでください")
        : Folder.selectDialog("PNGの書き出し先フォルダを選んでください");
    if (!folder) return; // キャンセル

    // PNG書き出しオプション
    var opts = new ImageCaptureOptions();
    opts.resolution   = 72;    // 解像度(ppi)。必要なら 144 / 300 などに変更
    opts.antiAliasing = true;  // アンチエイリアス
    opts.transparency = true;  // 背景を透過
    opts.matte        = false;

    var count = 0;
    var errors = [];

    for (var i = 0; i < sel.length; i++) {
        var item = sel[i];

        // ファイル名はオブジェクト名を使う。無名なら "img"
        var baseName = "img";
        try {
            if (item.name && item.name.length > 0) baseName = item.name;
        } catch (e) {}

        // 同名衝突を避けて連番を付ける（img.png, img_2.png, img_3.png ...）
        var file = new File(folder.fsName + "/" + baseName + ".png");
        var n = 2;
        while (file.exists) {
            file = new File(folder.fsName + "/" + baseName + "_" + n + ".png");
            n++;
        }

        try {
            // visibleBounds = [左, 上, 右, 下]。その領域だけを切り出して書き出す
            doc.imageCapture(file, item.visibleBounds, opts);
            count++;
        } catch (e) {
            errors.push(baseName + ": " + e);
        }
    }

    var msg = count + " 個を書き出しました。\n" + folder.fsName;
    if (errors.length > 0) {
        msg += "\n\n[失敗 " + errors.length + " 件]\n" + errors.join("\n");
    }
    alert(msg);
})();
