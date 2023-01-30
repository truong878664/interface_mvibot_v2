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
        return back()->with('msg', 'Add layer successfully');
    }
    public function deleteLayer(Request $request)
    {
        Layer::where('name_layer', $request->name)->delete();
        return back()->with('msg', 'Delete layer successfully');
    }
    public function allLayer()
    {
        $allLayer = Layer::all();
        return $allLayer;
    }
    public function layerActive()
    {
        $map = new mapController;
        $mapActive = $map->mapActive();
        $layerActive = Layer::where('name_map_active', $mapActive)->get();
        return $layerActive;
    }
}