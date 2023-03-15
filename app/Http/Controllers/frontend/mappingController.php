<?php

namespace App\Http\Controllers\frontend;

use App\Http\Controllers\Controller;
use App\Models\backend\StatusRobot;
use Illuminate\Http\Request;

class mappingController extends Controller
{
    public function index()
    {
        $robotSlam = StatusRobot::where('mode', 'slam')->get()->toArray();
        $title = "Mapping";
        
        return view('frontend.pages.mapping.mapping', compact('robotSlam', 'title'));
    }
}