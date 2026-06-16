<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class PostRequest extends FormRequest
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
     */
    public function rules(): array
    {
        return [
            'title' => ['required', 'string'],
            'content' => ['required', 'string'],
            'community_id' => ['required', 'exists:communities,id'],
            'image' => ['nullable', 'image', 'max:2048'],
        ];
    }

    /**
     * Custom validation messages.
     */
    public function messages(): array
    {
        return [
            'title.required' => 'عنوان المنشور مطلوب',
            'title.string' => 'عنوان المنشور يجب أن يكون نصًا',

            'content.required' => 'المحتوى مطلوب',
            'content.string' => 'المحتوى يجب أن يكون نصًا',

            'community_id.required' => 'المجتمع مطلوب',
            'community_id.exists' => 'المجتمع غير موجود',

            'image.image' => 'الملف المرفوع يجب أن يكون صورة',
            'image.max' => 'حجم الصورة يجب ألا يتجاوز 2 ميجابايت',
        ];
    }
}