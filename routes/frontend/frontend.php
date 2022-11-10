<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\frontend\DashboardController;
use App\Http\Controllers\frontend\MissionsController;

Route::get('/', function () {
    return view('frontend.pages.home');
});



Route::prefix('dashboard') ->name('dashboard.') -> group(function() {
    Route::get('/', [DashboardController::class, 'index']);

    Route::get('missions', [MissionsController::class, 'index'])->name('missions');
});