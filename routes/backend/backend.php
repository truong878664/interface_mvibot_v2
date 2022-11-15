<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\backend\PositionController;
use App\Http\Controllers\backend\CreateMissionsController;


Route::prefix('dashboard')->name('dashboard.')->group(function () {

    Route::prefix('missions')->name('missions.')->group(function () {

        Route::post('create-point', [PositionController::class, 'createPoint']);
        Route::post('create-missions', [CreateMissionsController::class, 'createMissions']);
        Route::delete('delete/{id}', [CreateMissionsController::class, 'deleteMissions']);
        Route::delete('delete-point/{id}', [CreateMissionsController::class, 'deletePoint']);
    });
});