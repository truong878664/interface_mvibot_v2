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
        return redirect('/dashboard/missions/createpoint');
    }

    public function createPoint()
    {
        return view('frontend.pages.missions.createpoint');
    }

    public function createMissions()
    {
        $allMissions = Missions::all();
        return view('frontend.pages.missions.createmissions', compact('allMissions'));
    }

    public function trackingMission()
    {
        return view('frontend.pages.missions.trackingmission');
    }

    public function createStepsMissions(Request $request)
    {
        $idRender = $request->id;
        $itemRender = Missions::where('id', $idRender)->first();
        $allPoints = MisionPosition::all();
        return view('frontend.pages.missions.createStepMissions', compact('itemRender', 'allPoints'));
    }
}
