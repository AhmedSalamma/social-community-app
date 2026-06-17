<?php

namespace App\Http\Controllers\Api\v1\web;

use App\Http\Controllers\Controller;
use App\Http\Requests\CommunityRequest;
use App\Http\Resources\CommunityResource;
use App\Http\Resources\PostResource;
use App\Models\Community;
use App\Traits\ResponseTrait;

class CommunityController extends Controller
{
    use ResponseTrait;

    public function index()
    {
        $communities = Community::withCount('posts')->latest()->paginate(10);

        return $this->respondSuccess(
            CommunityResource::collection($communities),
            'تم جلب المجتمعات بنجاح',
            200
        );
    }

    public function myCommunities()
    {
        $communities = request()->user()
            ->communities()
            ->withCount('posts')
            ->latest()
            ->paginate(3);

        return CommunityResource::collection($communities);
        
    
    }

    public function store(CommunityRequest $request)
    {
        $data = $request->validated();

        if ($request->hasFile('image')) {
            $data['image'] = $request->file('image')->store('communities', 'public');
        }

        $data['user_id'] = $request->user()->id;
        $community = Community::create($data);

        return $this->respondSuccess(
            CommunityResource::make($community),
            'تم إنشاء المجتمع بنجاح',
            201
        );
    }

   public function show(Community $community)
   {
        $posts = $community->posts()
            ->with(['user', 'likes', 'comments', 'shares'])
            ->latest()
            ->paginate(8);

        return $this->respondSuccess([
            'community' =>  CommunityResource::make($community),
            'posts' => PostResource::collection($posts),
        ], 'تم جلب بيانات المجتمع بنجاح', 200);
    }
}
