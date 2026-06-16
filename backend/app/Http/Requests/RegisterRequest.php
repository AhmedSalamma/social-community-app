<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class RegisterRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name'=> ['required', 'string', 'max:255'],
            'username' => ['required', 'string', 'max:255', 'unique:users,username'],
            'email'=>['required','email','unique:users,email'],
            'password'=>['required','min:6','confirmed']
        ];
    }

    public function messages(): array
    {
        return [
            'name.required' => 'الاسم مطلوب',
            'name.string' => 'الاسم يجب أن يكون نصًا',
            'name.max' => 'الاسم يجب ألا يتجاوز 255 حرفًا',
            'username.required' => 'اسم المستخدم مطلوب',
            'username.string' => 'اسم المستخدم يجب أن يكون نصًا',
            'username.max' => 'اسم المستخدم يجب ألا يتجاوز 255 حرفًا',
            'username.unique' => 'اسم المستخدم مستخدم بالفعل',
            'email.required' => 'البريد الإلكتروني مطلوب',
            'email.email' => 'البريد الإلكتروني يجب أن يكون صالحًا',
            'email.unique' => 'هذا البريد الإلكتروني مستخدم بالفعل',
            'password.required' => 'كلمة المرور مطلوبة',
            'password.min' => 'كلمة المرور يجب أن تتكون من 6 أحرف على الأقل',
            'password.confirmed' => 'تأكيد كلمة المرور غير مطابق',
        ];
    }
}
