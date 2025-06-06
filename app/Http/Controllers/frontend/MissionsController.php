<?php

namespace App\Http\Controllers\frontend;

use App\Http\Controllers\backend\mapController;
use App\Http\Controllers\Controller;
use App\Models\backend\Map;
use Illuminate\Http\Request;
use App\Models\backend\Missions;
use App\Models\backend\MissionPosition;
use App\Models\backend\Robot;
use App\Models\backend\StatusRobot;
use App\Models\backend\Stop;
use App\Models\backend\WakeUp;
use PhpParser\Node\Stmt\TryCatch;

class MissionsController extends Controller
{
    public $v = 'v3';
    public function index()
    {
        return redirect('/dashboard/missions/select-mission');
    }

    public function createPoint()
    {
        $map = new mapController();
        $mapActive = $map->mapActive();
        $title = "Create point";
        return view('frontend.pages.missions.createPoint', compact('mapActive', 'title'));
    }

    public function createMissions(Request $request)
    {
        $allRobot = Robot::all();
        $missions = Missions::where('type', $request->type)->get();
        $type = $request->type;
        $title = "Create mission";
        $v = $this->v;
        return view('frontend.pages.missions.createMissions', compact('missions', 'allRobot', 'type', 'title', 'v'));
    }

    public function trackingMission()
    {
        $robotNavigate = StatusRobot::where('mode', 'navigation')->get();
        $title = "Tracking mission";

        return view('frontend.pages.trackingMission.trackingMission', compact('robotNavigate', 'title'));
    }

    public function createStepsMissions(Request $request)
    {
        try {
            //code...
            if (Map::all()->count() > 0) {
                $mapActive = Map::all()[0]['name_map_active'];
            } else {
                $mapActive = "";
            }
            $idRender = $request->id;
            $itemRender = Missions::find($idRender);

            $allPoints = MissionPosition::where('map', $mapActive)->orderBy('id', 'desc')->get();

            $allRobot = Robot::all()->toArray();

            $currentWakeUp = json_encode(WakeUp::where('id_mission', $itemRender->id)->get());
            $currentStop = json_encode(Stop::where('id_mission', $itemRender->id)->get());

            $map = new mapController();
            $mapActive = $map->mapActive();

            $title = "Mission - $itemRender->name";
            $v = $this->v;
            return view('frontend.pages.missions.createStepMissions', compact('itemRender', 'allRobot', 'currentWakeUp', 'currentStop', 'mapActive', 'title', 'v'));
        } catch (\Throwable $th) {
            return redirect()->back()->with('error', 'Mission not found!');
        }
    }

    public function typeMission(Request $request)
    {
        $type = $request->type;
        $title = "Type mission";
        $v = $this->v;

        return view('frontend.pages.missions.typeMission', compact('type', 'title', 'v'));
    }
}
