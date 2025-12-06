# 単体テスト

**バージョン**: 1.0.0  
**作成日**: 2025年12月6日

---

## 概要

単体テストは、個々のクラスやメソッドが正しく動作することを確認するテストです。

---

## テスト実行方法

```powershell
# 全テスト実行
docker compose exec laravel.test php artisan test

# 特定のテストファイルを実行
docker compose exec laravel.test php artisan test tests/Unit/ExampleTest.php

# カバレッジ付きで実行
docker compose exec laravel.test php artisan test --coverage
```

---

## テストファイルの場所

- `tests/Unit/`: 単体テスト
- `tests/Feature/`: 機能テスト

---

## 変更履歴

| 日付 | バージョン | 変更内容 | 変更者 |
|------|-----------|---------|--------|
| 2025-12-06 | 1.0.0 | 初版作成 | - |

