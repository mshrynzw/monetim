import { z } from 'zod';

/**
 * Zodスキーマのバリデーション結果を返す
 * @param schema - Zodスキーマ
 * @param data - バリデーション対象のデータ
 * @returns バリデーション結果（成功時はデータ、失敗時はエラー）
 */
export function validateSchema<T extends z.ZodTypeAny>(
    schema: T,
    data: unknown
): { success: true; data: z.infer<T> } | { success: false; error: z.ZodError } {
    const result = schema.safeParse(data);
    if (result.success) {
        return { success: true, data: result.data };
    }
    return { success: false, error: result.error };
}

/**
 * APIレスポンスをバリデーションして型安全に変換
 * @param schema - Zodスキーマ
 * @param data - APIレスポンスデータ
 * @returns バリデーション済みのデータ
 * @throws ZodError バリデーション失敗時
 */
export function parseApiResponse<T extends z.ZodTypeAny>(
    schema: T,
    data: unknown
): z.infer<T> {
    return schema.parse(data);
}

/**
 * フォームエラーメッセージを日本語で取得
 * @param error - Zodエラー
 * @param fieldName - フィールド名
 * @returns エラーメッセージ
 */
export function getFormErrorMessage(error: z.ZodError, fieldName: string): string | undefined {
    const fieldError = error.errors.find((err) => err.path.includes(fieldName));
    return fieldError?.message;
}

