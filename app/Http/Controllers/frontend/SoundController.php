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
}