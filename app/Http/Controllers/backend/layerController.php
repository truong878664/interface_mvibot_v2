<?php

namespace App\Http\Controllers\backend;

use App\Http\Controllers\Controller;
use App\Models\backend\Layer;
use Illuminate\Http\Request;

class layerController extends Controller
{
    public function addLayer(Request $request)
    {
        $dataLayer = json_decode($request->data_layer);
        $array = json_decode(json_encode($dataLayer), true);
        Layer::insert($array);
        return back();
    }
}