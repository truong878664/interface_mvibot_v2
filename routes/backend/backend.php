<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\backend\PositionController;
use App\Http\Controllers\backend\CreateMissionsController;


// Route::prefix('missions')->name('missions.')->group(function () {
//     Route::post('position', [PositionController::class, 'index'])->name('position');
// });



Route::prefix('dashboard')->name('dashboard.')->group(function () {

    Route::prefix('missions')->name('missions.')->group(function () {
        Route::post('createpoint', [PositionController::class, 'createPoint'])->name('createpoint');

        Route::post('createmissions', [CreateMissionsController::class, 'createMissions'])->name('createmissions');

        Route::delete('delete/{id}', [CreateMissionsController::class, 'deleteMissions']);
    });
});
