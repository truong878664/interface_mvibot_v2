<?php

namespace App\Http\Controllers\backend;

use App\Http\Controllers\Controller;
use App\Models\backend\Layer;
use Illuminate\Http\Request;

class layerController extends Controller
{
    public function addLayer(Request $request)
    {
        $mapActive =  $request->map_active;
        $dataLayer = $request->data_layer;
        $data = ['data_layers' => $dataLayer, 'map' => $mapActive];
        $currentLayer = Layer::where('map', $mapActive);
        // dd($dataLayer);
        if ($currentLayer->get()->toArray() === []) {
            Layer::insert($data);
        } else {
            $currentLayer->update(['data_layers' => $dataLayer, 'map' => $mapActive]);
        }
        return back();
    }
}