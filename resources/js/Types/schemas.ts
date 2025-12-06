import { z } from 'zod';

/**
 * 認証関連のスキーマ
 */
export const loginSchema = z.object({
    email: z.string().email('有効なメールアドレスを入力してください'),
    password: z.string().min(1, 'パスワードを入力してください'),
    remember: z.boolean().optional(),
});

export type LoginFormValues = z.infer<typeof loginSchema>;

export const registerSchema = z.object({
    name: z.string().min(1, '名前を入力してください').max(255, '名前は255文字以内で入力してください'),
    email: z.string().email('有効なメールアドレスを入力してください'),
    password: z.string().min(8, 'パスワードは8文字以上で入力してください'),
    password_confirmation: z.string().min(8, 'パスワード（確認）を入力してください'),
}).refine((data) => data.password === data.password_confirmation, {
    message: 'パスワードが一致しません',
    path: ['password_confirmation'],
});

export type RegisterFormValues = z.infer<typeof registerSchema>;

/**
 * 出退勤関連のスキーマ
 */
export const attendancePunchSchema = z.object({
    punch_type_id: z.string().uuid('打刻種類を選択してください'),
    latitude: z.number().optional(),
    longitude: z.number().optional(),
});

export type AttendancePunchFormValues = z.infer<typeof attendancePunchSchema>;

/**
 * 休暇申請関連のスキーマ
 */
export const leaveRequestSchema = z.object({
    leave_type_id: z.string().uuid('休暇種類を選択してください'),
    start_date: z.date({ required_error: '開始日を選択してください' }),
    end_date: z.date({ required_error: '終了日を選択してください' }),
    start_time: z.string().optional(),
    end_time: z.string().optional(),
    reason: z.string().max(1000, '理由は1000文字以内で入力してください').optional(),
}).refine((data) => data.end_date >= data.start_date, {
    message: '終了日は開始日以降を選択してください',
    path: ['end_date'],
});

export type LeaveRequestFormValues = z.infer<typeof leaveRequestSchema>;

/**
 * ユーザー関連のスキーマ
 */
export const userSchema = z.object({
    name: z.string().min(1, '名前を入力してください').max(255, '名前は255文字以内で入力してください'),
    email: z.string().email('有効なメールアドレスを入力してください'),
    role: z.enum(['system-admin', 'tenant-admin', 'employee'], {
        errorMap: () => ({ message: 'ロールを選択してください' }),
    }),
    tenant_id: z.string().uuid('テナントを選択してください').optional(),
});

export type UserFormValues = z.infer<typeof userSchema>;

/**
 * APIレスポンスのスキーマ
 */
export const userResponseSchema = z.object({
    id: z.string().uuid(),
    name: z.string(),
    email: z.string().email(),
    role: z.enum(['system-admin', 'tenant-admin', 'employee']),
    tenant_id: z.string().uuid().nullable(),
    created_at: z.string().datetime(),
    updated_at: z.string().datetime(),
});

export type UserResponse = z.infer<typeof userResponseSchema>;

