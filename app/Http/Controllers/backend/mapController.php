<?php

namespace App\Http\Controllers\backend;

use App\Http\Controllers\Controller;
use App\Models\backend\Map;
use Illuminate\Http\Request;

class mapController extends Controller
{
    public function index()
    {
        $mapActive = $this->mapActive();
        return view('frontend.pages.map.map', compact('mapActive'));
    }
    public function addMapActive(Request $request)
    {
        $map_active = $request->map_active;
        $data_maps = ['map_active' => $map_active];
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
            $mapActive = Map::all()->toArray()[0]['map_active'];
        } else {
            $mapActive = "no map";
        }
        return $mapActive;
    }
}