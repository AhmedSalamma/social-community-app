<?php

use Illuminate\Support\Facades\Storage;

class FileUplode{

    public static function update ($newImage, $oldImage, $folder){

        if(!$newImage){
            return;
        }

        if ($oldImage && Storage::disk('public')->exists($oldImage)) {
            Storage::disk('public')->delete($oldImage);
        }

        return  $newImage->store($folder, 'public');



    }

    public static function uplode($image, $folder){
        if($image) {
             return  $image->store($folder, 'public');
        }

    }
}