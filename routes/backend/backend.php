<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\backend\PositionController;
use App\Http\Controllers\backend\CreateMissionsController;
use App\Http\Controllers\backend\FootprintController;
use App\Http\Controllers\backend\GpioController;
use App\Http\Controllers\backend\SleepController;

Route::prefix('dashboard')->name('dashboard.')->group(function () {
    Route::prefix('missions')->name('missions.')->group(function () {
        Route::post('create-point', [PositionController::class, 'createPoint']);
        Route::post('create-missions', [CreateMissionsController::class, 'createMissions']);
        Route::delete('delete/{id}', [CreateMissionsController::class, 'deleteMissions']);
        Route::delete('delete-point/{id}', [CreateMissionsController::class, 'deletePoint']);

        Route::post('create-footprint', [FootprintController::class, 'createFootprint']);
        Route::post('create-gpio', [GpioController::class, 'createGpio']);
        Route::post('create-sleep', [SleepController::class, 'createSleep']);
        Route::post('add-point-to-mission', [CreateMissionsController::class, 'addPointToMission']);
    });
});