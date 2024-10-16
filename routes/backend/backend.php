<?php

use Illuminate\Support\Facades\Route;

use App\Http\Controllers\backend\CreateMissionsController;
use App\Http\Controllers\backend\MissionsVerController;
use App\Http\Controllers\backend\AuthController;
use App\Http\Controllers\backend\layerController;
use App\Http\Controllers\backend\mapController;
use App\Http\Controllers\frontend\SoundController;

Route::prefix('dashboard')->group(function () {
    Route::prefix('missions')->group(function () {
        Route::prefix('v3')->group(function() {
            Route::post('create-missions', [CreateMissionsController::class, 'createMissions']);
        });
        Route::prefix('v4')->group(function() {
            Route::post('create-missions', [MissionsVerController::class, 'createMissions']);
        });
        // Route::post('create-point', [PositionController::class, 'createPoint']);
        // Route::delete('delete/{id}', [CreateMissionsController::class, 'deleteMissions']);
        // Route::delete('delete-point/{id}', [PositionController::class, 'deletePoint']);
        // Route::post('create-footprint', [FootprintController::class, 'createFootprint']);
        // Route::post('create-gpio', [GpioController::class, 'createGpio']);
        // Route::post('create-sleep', [SleepController::class, 'createSleep']);
        // Route::post('add-point-to-mission', [CreateMissionsController::class, 'addPointToMission']);
        // Route::post('update-step-missions-name', [CreateMissionsController::class, 'updateStepMission']);

        // Route::post('create-marker', [markerController::class, 'createMarker']);

        // Route::post('update-footprint', [FootprintController::class, 'updateFootprint']);
        // Route::post('update-gpio', [GpioController::class, 'updateGpio']);
        // Route::post('update-sleep', [SleepController::class, 'updateSleep']);

        // Route::post('add-wake-up', [gpioOtherController::class, 'createWakeUp']);
        // Route::post('add-stop', [gpioOtherController::class, 'createStop']);
    });
});
Route::post('/check', [AuthController::class, 'check'])->name('check');
Route::get('/logout', [AuthController::class, 'logout'])->name('logout');

Route::post('/map-active', [mapController::class, 'addMapActive']);

Route::post('/add-layer', [layerController::class, 'addLayer'])->name('add-layer');
Route::post('/delete-layer', [layerController::class, 'deleteLayer'])->name('delete-layer');
Route::get('/all-layer', [layerController::class, 'allLayer']);
Route::post('/upload/sound', [SoundController::class, 'upload']);
