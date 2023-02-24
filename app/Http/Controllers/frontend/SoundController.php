<?php

namespace App\Http\Controllers\frontend;

use App\Http\Controllers\Controller;
use App\Models\Robot;
use Illuminate\Http\Request;

class SoundController extends Controller
{
    public function index()
    {
        $allRobot = Robot::all();
        return view('frontend.pages.sound.sound', compact('allRobot'));
    }

    public function upload(Request $request)
    {

        if (!$request->hasFile('sound')) {
            return back();
        }

        $time = date("h:i:sa");
        $sound = $request->file('sound');

        $newName = str_replace(".mp3", "", str_replace(" ","_",str_replace("'","",$sound->getClientOriginalName())))."_". strtotime($time) . ".mp3";
        $sound->move('sound/custom', $newName);

        return  back();
    }
}
