<?php

namespace App\Http\Controllers\frontend;

use App\Http\Controllers\Controller;
use App\Models\backend\Robot as BackendRobot;
use Illuminate\Http\Request;

class joystickController extends Controller
{
    public function index()
    {
        $allRobot = BackendRobot::all()->toArray();
        return view('frontend.pages.joystick.joystick', compact('allRobot'));
    }
}