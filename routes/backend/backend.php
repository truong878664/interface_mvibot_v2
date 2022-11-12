<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\backend\PositionController;


// Route::prefix('missions')->name('missions.')->group(function () {
//     Route::post('position', [PositionController::class, 'index'])->name('position');
// });

Route::prefix('dashboard')->name('dashboard.')->group(function () {
    Route::post('missions', [PositionController::class, 'addPosition'])->name('missions');
});
