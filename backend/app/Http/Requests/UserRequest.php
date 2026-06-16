<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rule;

class UserRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        $userId = Auth::id();

        return [
            'name' => ['sometimes', 'string', 'max:255'],
            'username' => ['sometimes', 'string', 'max:255', Rule::unique('users')->ignore($userId)],
            'email' => [
                'sometimes',
                'email',
                'max:255',
                Rule::unique('users')->ignore($userId),
            ],
            'bio' => ['sometimes', 'nullable', 'string'],
            'image' => ['sometimes', 'nullable', 'image', 'max:2048'],
            'password' => ['sometimes', 'string', 'min:6', 'confirmed'],
        ];
    }

    public function messages(): array
    {
        return [
            'name.string' => 'الاسم يجب أن يكون نصًا',
            'name.max' => 'الاسم يجب ألا يتجاوز 255 حرفًا',
            'username.string' => 'اسم المستخدم يجب أن يكون نصًا',
            'username.max' => 'اسم المستخدم يجب ألا يتجاوز 255 حرفًا',
            'username.unique' => 'اسم المستخدم مستخدم بالفعل',
            'email.email' => 'البريد الإلكتروني يجب أن يكون صالحًا',
            'email.max' => 'البريد الإلكتروني يجب ألا يتجاوز 255 حرفًا',
            'email.unique' => 'هذا البريد الإلكتروني مستخدم بالفعل',
            'bio.string' => 'السيرة الذاتية يجب أن تكون نصًا',
            'image.image' => 'الملف المرفوع يجب أن يكون صورة',
            'image.max' => 'حجم الصورة يجب ألا يتجاوز 2 ميجابايت',
            'password.string' => 'كلمة المرور يجب أن تكون نصًا',
            'password.min' => 'كلمة المرور يجب أن تتكون من 6 أحرف على الأقل',
            'password.confirmed' => 'تأكيد كلمة المرور غير مطابق',
        ];
    }
}
