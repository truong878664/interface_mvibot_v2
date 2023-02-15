<?php

use Illuminate\Support\Facades\Route;

use App\Http\Controllers\backend\layerController;
use App\Http\Controllers\backend\mapController;
use App\Http\Controllers\backend\SettingController;
use App\Http\Controllers\frontend\DashboardController;
use App\Http\Controllers\frontend\gpioPageController;
use App\Http\Controllers\frontend\HomeController;
use App\Http\Controllers\frontend\joystickController;
use App\Http\Controllers\frontend\locationController;
use App\Http\Controllers\frontend\mappingController;
use App\Http\Controllers\frontend\MissionsController;
use App\Http\Controllers\frontend\SoundController;
use App\Http\Controllers\frontend\statusController;

Route::group(['middleware' => ['AuthCheck']], function () {
    Route::get('login', function () {
        return view('frontend.pages.auth.login');
    });

    Route::get('/', [HomeController::class, 'index'])->name('home');

    Route::get('/user', function () {
        return view('frontend.pages.user.user');
    })->name('user');

    Route::prefix('dashboard')->name('dashboard.')->group(function () {
        Route::get('/', [DashboardController::class, 'index']);

        Route::prefix('missions')->name('missions.')->group(function () {
            Route::get('/', [MissionsController::class, 'index']);

            Route::get('/type-mission', function () {
                return view('frontend.pages.missions.typeMission');
            })->name('type-mission');
            // Route::get('/create-point', [MissionsController::class, 'createPoint'])->name('create-point');
            Route::get('/tracking-mission', [MissionsController::class, 'trackingMission'])->name('tracking-mission');
            Route::get('/layer-active', [layerController::class, 'layerActive'])->name('layer-active');

            Route::prefix('/create-missions')->name('create-missions.')->group(function () {
                Route::get('/', [MissionsController::class, 'createMissions']);
                Route::get('/{id}', [MissionsController::class, 'createStepsMissions'])->name('create-steps-missions');
            });
        });

        Route::prefix('map')->name('map.')->group(function () {
            Route::get('/', [mapController::class, 'index'])->name('map');
            Route::get('/map-active', [mapController::class, 'mapActive']);
            Route::get('create-layer', [mapController::class, 'createLayer'])->name('create-layer');
            Route::get('choose-map-active', [mapController::class, 'chooseMapActive'])->name('choose-map-active');
        });

        Route::prefix('status')->name('status.')->group(function () {
            Route::get('/', [statusController::class, 'index'])->name('status');
            Route::get('item-status', [statusController::class, 'allStatus']);
        });
        Route::prefix('joystick')->name('joystick.')->group(function () {
            Route::get('/', [joystickController::class, 'index']);
        });

        Route::prefix('mapping')->name('mapping.')->group(function () {
            Route::get('/', [mappingController::class, 'index']);
        });



        Route::get('setting', [SettingController::class, 'index'])->name('setting.');

        Route::get(
            'location',
            [locationController::class, 'index']
        )->name('location.');

        Route::get('gpio', [gpioPageController::class, 'index'])->name('gpio.');

        Route::get('sound', [SoundController::class, 'index'])->name('sound.');
    });
});
