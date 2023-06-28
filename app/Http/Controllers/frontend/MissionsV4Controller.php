<?php

namespace App\Http\Controllers\frontend;

use App\Http\Controllers\backend\mapController;
use App\Http\Controllers\Controller;
use App\Models\backend\Map;
use App\Models\backend\MissionPosition;
use App\Models\backend\MissionsVer;
use App\Models\backend\Robot;
use App\Models\backend\Stop;
use App\Models\backend\WakeUp;
use Illuminate\Http\Request;

class MissionsV4Controller extends Controller
{
    public $v = 'v4';
    public function index() {
        return 123;
    }

    public function createMissions(Request $request)
    {
        $allRobot = Robot::all();
        $missions = MissionsVer::where('type', $request->type)->get();
        $type = $request->type;
        $title = "Create mission";
        $v = $this->v;
        return view('frontend.pages.missions.createMissions', compact('missions', 'allRobot', 'type', 'title', 'v'));
    }

    public function typeMission(Request $request)
    {
        $type = $request->type;
        $title = "Type mission";
        $v = $this->v;

        return view('frontend.pages.missions.typeMission', compact('type', 'title', 'v'));
    }

    public function createStepsMissions(Request $request)
    {

        if (Map::all()->count() > 0) {
            $mapActive = Map::all()[0]['name_map_active'];
        } else {
            $mapActive = "";
        }
        $idRender = $request->id;
        $itemRender = MissionsVer::find($idRender);

        $allPoints = MissionPosition::where('map', $mapActive)->orderBy('id', 'desc')->get();

        $allRobot = Robot::all()->toArray();

        $currentWakeUp = json_encode(WakeUp::where('id_mission', $itemRender->id)->get());
        $currentStop = json_encode(Stop::where('id_mission', $itemRender->id)->get());

        $map = new mapController();
        $mapActive = $map->mapActive();

        $title = "Mission - $itemRender->name";
        $v = $this->v;
        return view('frontend.pages.missions.createMissionsV4.index', compact('itemRender', 'allRobot', 'currentWakeUp', 'currentStop', 'mapActive', 'title', 'v'));
    }
}
