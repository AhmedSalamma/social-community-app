<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CommunityRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'max:255', 'unique:communities,name'],
            'desc' => ['required', 'string', 'max:1000'],
            'image' => ['nullable', 'image', 'max:2048'],
        ];
    }

    public function messages(): array
    {
        return [
            'name.required' => 'اسم المجتمع مطلوب',
            'name.string' => 'اسم المجتمع يجب أن يكون نصًا',
            'name.max' => 'اسم المجتمع يجب ألا يتجاوز 255 حرفًا',
            'name.unique' => 'اسم المجتمع موجود بالفعل',

            'desc.required' => 'وصف المجتمع مطلوب',
            'desc.string' => 'وصف المجتمع يجب أن يكون نصًا',
            'desc.max' => 'وصف المجتمع يجب ألا يتجاوز 1000 حرف',

            'image.image' => 'الملف المرفوع يجب أن يكون صورة',
            'image.max' => 'حجم الصورة يجب ألا يتجاوز 2 ميجابايت',
        ];
    }
}
