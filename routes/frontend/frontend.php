<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\frontend\DashboardController;
use App\Http\Controllers\frontend\MissionsController;
use App\Http\Controllers\frontend\statusController;
use App\Http\Controllers\frontend\joystickController;
use App\Http\Middleware\AuthCheck;




Route::group(['middleware' => ['AuthCheck']], function () {
    Route::get('login', function () {
        return view('frontend.pages.login');
    });

    Route::get('/', function () {
        return view('frontend.pages.home');
    })->name('home');

    Route::prefix('dashboard')->name('dashboard.')->group(function () {
        Route::get('/', [DashboardController::class, 'index']);

        Route::prefix('missions')->name('missions.')->group(function () {
            Route::get('/', [MissionsController::class, 'index']);
            Route::get('/create-point', [MissionsController::class, 'createPoint'])->name('create-point');
            Route::get('/tracking-mission', [MissionsController::class, 'trackingMission'])->name('tracking-mission');

            Route::prefix('/create-missions')->name('create-missions.')->group(function () {
                Route::get('/', [MissionsController::class, 'createMissions']);
                Route::get('/{id}', [MissionsController::class, 'createStepsMissions'])->name('create-steps-missions');
            });
        });

        Route::prefix('map')->name('map.')->group(function () {
            Route::get('/', function () {
                return view('frontend.pages.map.map');
            });
        });

        Route::prefix('status')->name('status.')->group(function () {
            Route::get('/', [statusController::class, 'index']);
        });
    });
});