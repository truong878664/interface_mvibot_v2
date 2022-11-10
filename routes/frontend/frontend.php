<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\frontend\DashboardController;


Route::get('/', function () {
    return view('frontend.pages.home');
});


Route::get('dashboard', [DashboardController::class, 'index']);
