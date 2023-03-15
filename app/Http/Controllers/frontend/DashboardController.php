<?php

namespace App\Http\Controllers\frontend;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;


class DashboardController extends Controller
{
    public function index()
    {
        $title = "Dashboard";
        return view('frontend.pages.dashboard', compact('title'));
    }
}