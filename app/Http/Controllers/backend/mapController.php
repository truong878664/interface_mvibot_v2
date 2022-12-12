<?php

namespace App\Http\Controllers\backend;

use App\Http\Controllers\Controller;
use App\Models\backend\Layer;
use App\Models\backend\Map;
use App\Models\Robot;
use Illuminate\Http\Request;

class mapController extends Controller
{
    public function index()
    {
        $allRobot = Robot::all()->toArray();
        $mapActive = $this->mapActive();
        // $layersData = Layer::where('map', $mapActive)->get()->toArray();
        // if ($layersData) {
        //     $layers = $layersData[0]['data_layers'];
        // } else {
        //     $layers = "";
        // }

        return view('frontend.pages.map.map', compact('mapActive', 'allRobot'));
    }
    public function addMapActive(Request $request)
    {
        $map_active = $request->map_active;

        $data_maps = ['name_map_active' => $map_active];
        if (Map::get()) {
            Map::truncate();
        } {
            Map::insert($data_maps);
        }
        return back();
    }
    public function mapActive()
    {
        if (Map::all()->count() > 0) {
            $mapActive = Map::all()->toArray()[0]['name_map_active'];
        } else {
            $mapActive = "no map";
        }
        return $mapActive;
    }
    public function createLayer()
    {
        return view('frontend.pages.map.createLayer');
    }
}