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
        $mapActive = $this->mapActive();
        $allLayer = Layer::where('name_map_active', $mapActive)->get();
        return view('frontend.pages.map.createLayer', compact('mapActive', 'allLayer'));
    }
    public function chooseMapActive()
    {
        return view('frontend.pages.map.mapActive');
    }
}