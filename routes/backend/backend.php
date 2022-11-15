<?php
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\backend\PositionController;
use App\Http\Controllers\backend\CreateMissionsController;


Route::prefix('dashboard')->name('dashboard.')->group(function () {

    Route::prefix('missions')->name('missions.')->group(function () {
        
        Route::post('createpoint', [PositionController::class, 'createPoint']);
        Route::post('createmissions', [CreateMissionsController::class, 'createMissions']);
        Route::delete('delete/{id}', [CreateMissionsController::class , 'deleteMissions']);
        Route::delete('deletepoint/{id}', [CreateMissionsController::class , 'deletePoint']);
    });

});