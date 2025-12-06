# Zodスキーマ定義

このディレクトリには、アプリケーション全体で使用するZodスキーマを定義します。

## 使用方法

### フォームバリデーション

```typescript
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema, type LoginFormValues } from '@/Types/schemas';
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/Components/ui/form';
import { Input } from '@/Components/ui/input';
import { Button } from '@/Components/ui/button';

export const LoginForm = () => {
    const form = useForm<LoginFormValues>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: '',
            password: '',
            remember: false,
        },
    });

    const onSubmit = async (values: LoginFormValues) => {
        // バリデーション済みの値を使用
        console.log(values);
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>メールアドレス</FormLabel>
                            <FormControl>
                                <Input type="email" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>パスワード</FormLabel>
                            <FormControl>
                                <Input type="password" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit">ログイン</Button>
            </form>
        </Form>
    );
};
```

### APIレスポンスのバリデーション

```typescript
import { parseApiResponse } from '@/Utils/validation';
import { userResponseSchema, type UserResponse } from '@/Types/schemas';

const fetchUser = async (id: string): Promise<UserResponse> => {
    const response = await fetch(`/api/users/${id}`);
    const data = await response.json();
    
    // APIレスポンスをバリデーションして型安全に変換
    return parseApiResponse(userResponseSchema, data);
};
```

### カスタムスキーマの作成

```typescript
import { z } from 'zod';

// 新しいスキーマを定義
export const customSchema = z.object({
    name: z.string().min(1, '名前を入力してください'),
    age: z.number().int().positive('正の整数を入力してください'),
    email: z.string().email('有効なメールアドレスを入力してください').optional(),
});

// 型を推論
export type CustomFormValues = z.infer<typeof customSchema>;
```

## ベストプラクティス

1. **スキーマは再利用可能に**: 共通のバリデーションルールは関数として抽出
2. **エラーメッセージは日本語**: ユーザー向けのメッセージは明確に
3. **型推論を活用**: `z.infer<typeof schema>`でTypeScript型を自動生成
4. **複雑なバリデーション**: `.refine()`や`.superRefine()`を使用
5. **オプショナルフィールド**: `.optional()`や`.nullable()`を適切に使用

