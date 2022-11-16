<?php

namespace App\Http\Controllers\frontend;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\backend\Missions;
use App\Models\backend\MisionPosition;

class MissionsController extends Controller
{
    public function index()
    {
        return redirect('/dashboard/missions/create-point');
    }

    public function createPoint()
    {
        return view('frontend.pages.missions.createPoint');
    }

    public function createMissions()
    {
        $allMissions = Missions::all();
        return view('frontend.pages.missions.createMissions', compact('allMissions'));
    }

    public function trackingMission()
    {
        return view('frontend.pages.missions.trackingMission');
    }

    public function createStepsMissions(Request $request)
    {
        $idRender = $request->id;
        $itemRender = Missions::where('id', $idRender)->first();
        $allPoints = MisionPosition::orderBy('id', 'desc')->get();
        return view('frontend.pages.missions.createStepMissions', compact('itemRender', 'allPoints'));
    }
}