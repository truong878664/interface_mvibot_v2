<?php

namespace App\Http\Controllers\frontend;

use App\Http\Controllers\Controller;
use App\Models\backend\StatusRobot;
use Illuminate\Http\Request;

class locationController extends Controller
{
    public  function index()
    {
        $title = "Localization";
        
        $robotNavigation = StatusRobot::where('mode', 'navigation')->get();
        return view('frontend.pages.location.location', compact('robotNavigation', 'title'));
    }
}