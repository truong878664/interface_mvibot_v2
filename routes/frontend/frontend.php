<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\frontend\DashboardController;
use App\Http\Controllers\frontend\MissionsController;

Route::get('/', function () {
    return view('frontend.pages.home');
});



Route::prefix('dashboard')->name('dashboard.')->group(function () {
    Route::get('/', [DashboardController::class, 'index']);

    Route::prefix('missions')->name('missions.')->group(function () {
        Route::get('/', [MissionsController::class, 'index']);
        Route::get('/createpoint', [MissionsController::class, 'createPoint'])->name('createpoint');
        Route::get('/trackingmission', [MissionsController::class, 'trackingMission'])->name('trackingmission');
        
        Route::prefix('/createmissions')->name('createmissions.')->group(function () {
            Route::get('/', [MissionsController::class, 'createMissions']);
            Route::get('/{id}', [MissionsController::class, 'createStepsMissions'])->name('createstepsmissions');
        });
    });
});
