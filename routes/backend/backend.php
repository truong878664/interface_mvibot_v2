<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\backend\PositionController;


Route::prefix('missions')->name('missions.')->group(function () {
    Route::get('/', [PositionController::class, 'index']);
    Route::get('position', [PositionController::class, 'index']);
});
