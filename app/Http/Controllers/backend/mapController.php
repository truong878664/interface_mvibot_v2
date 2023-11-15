<?php

namespace App\Http\Controllers\backend;

use App\Http\Controllers\Controller;
use App\Models\backend\Layer;
use App\Models\backend\Map;
use App\Models\backend\Robot;
use Illuminate\Http\Request;

class mapController extends Controller
{
    public function index()
    {
        $allRobot = Robot::all()->toArray();
        $mapActive = $this->mapActive();
        $title = 'map';
        return view('frontend.pages.map.map', compact('mapActive', 'allRobot', 'title'));
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
        $title = "Create layer";
        $mapActive = $this->mapActive();
        $allLayer = Layer::where('name_map_active', $mapActive)->get();
        return view('frontend.pages.map.createLayer', compact('mapActive', 'allLayer', 'title'));
    }
    public function createLayerV2()
    {
        $title = "Create layer v2";
        $mapActive = $this->mapActive();
        $allLayer = Layer::where('name_map_active', $mapActive)->get();
        return view('frontend.pages.map.createLayerV2', compact('mapActive', 'allLayer', 'title'));
    }
    public function chooseMapActive()
    {
        $title = 'Choose map active';
        return view('frontend.pages.map.mapActive', compact('title'));
    }
    public function editMap()
    {
        $title = "Edit map";
        return view("frontend.pages.map.editMap", compact('title'));
    }
}
