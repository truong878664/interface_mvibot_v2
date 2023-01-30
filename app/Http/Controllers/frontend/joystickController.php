<?php

namespace App\Http\Controllers\frontend;

use App\Http\Controllers\Controller;
use App\Models\Robot;
use Illuminate\Http\Request;

class joystickController extends Controller
{
    public function index()
    {
        $allRobot = Robot::all()->toArray();
        return view('frontend.pages.joystick.joystick', compact('allRobot'));
    }
}