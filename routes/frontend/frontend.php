<?php

use Illuminate\Support\Facades\Route;

use App\Http\Controllers\backend\layerController;
use App\Http\Controllers\backend\mapController;
use App\Http\Controllers\backend\SettingController;
use App\Http\Controllers\frontend\BatteryController;
use App\Http\Controllers\frontend\DashboardController;
use App\Http\Controllers\frontend\gpioPageController;
use App\Http\Controllers\frontend\HomeController;
use App\Http\Controllers\frontend\joystickController;
use App\Http\Controllers\frontend\locationController;
use App\Http\Controllers\frontend\mappingController;
use App\Http\Controllers\frontend\MissionsController;
use App\Http\Controllers\frontend\MissionsV4Controller;
use App\Http\Controllers\frontend\SoundController;
use App\Http\Controllers\frontend\statusController;

Route::group(['middleware' => ['AuthCheck']], function () {
    Route::get('login', function () {
        return view('frontend.pages.auth.login');
    });

    Route::get('/', [HomeController::class, 'index'])->name('home');

    Route::get('/user', function () {
        $title = "user";
        return view('frontend.pages.user.user', compact('title'));
    })->name('user');

    Route::prefix('dashboard')->name('dashboard.')->group(function () {
        Route::get('/', [DashboardController::class, 'index']);

        Route::prefix('missions')->name('missions.')->group(function () {
            Route::prefix('v3')->name('v3.')->group(function () {
                Route::get('/', [MissionsController::class, 'index']);
                Route::get('/select-mission', function () {
                    $title = "select mission";
                    $v = 'v3';
                    return view('frontend.pages.missions.selectMission', compact('title', 'v'));
                })->name('select');

                Route::get('/type-mission',  [MissionsController::class, 'typeMission'])->name('type-mission');


                Route::prefix('/create-missions')->name('create-missions.')->group(function () {
                    Route::get('/', [MissionsController::class, 'createMissions']);
                    Route::get('/{id}', [MissionsController::class, 'createStepsMissions'])->name('create-steps-missions');
                });
            });

            Route::prefix('v4')->name('v4.')->group(function () {
                Route::get('/', [MissionsController::class, 'index']);
                Route::get('/select-mission', function () {
                    $title = "select mission";
                    $v = 'v4';
                    return view('frontend.pages.missions.selectMission', compact('title', 'v'));
                })->name('select');

                Route::get('/type-mission',  [MissionsV4Controller::class, 'typeMission'])->name('type-mission');

                Route::prefix('/create-missions')->name('create-missions.')->group(function () {
                    Route::get('/', [MissionsV4Controller::class, 'createMissions']);
                    Route::get('/{id}', [MissionsV4Controller::class, 'createStepsMissions'])->name('create-steps-missions');
                });
            });

            // Route::get('/layer-active', [layerController::class, 'layerActive'])->name('layer-active');
        });
        Route::get('/tracking-mission', [MissionsController::class, 'trackingMission'])->name('tracking-mission');

        Route::prefix('map')->name('map.')->group(function () {
            Route::get('/', [mapController::class, 'index'])->name('map');
            Route::get('/map-active', [mapController::class, 'mapActive']);
            Route::get('create-layer', [mapController::class, 'createLayer'])->name('create-layer');
            Route::get('create-layer-v2', [mapController::class, 'createLayerV2'])->name('create-layer-v2');
            Route::get('choose-map-active', [mapController::class, 'chooseMapActive'])->name('choose-map-active');
            Route::get('edit-map', [mapController::class, 'editMap'])->name('edit-map');
        });

        Route::prefix('status')->name('status.')->group(function () {
            Route::get('/', [statusController::class, 'index'])->name('status');
            Route::get('item-status', [statusController::class, 'allStatus']);
        });

        Route::get('/battery', [BatteryController::class, 'index'])->name('battery');

        Route::prefix('joystick')->name('joystick.')->group(function () {
            Route::get('/', [joystickController::class, 'index']);
        });

        Route::prefix('mapping')->name('mapping.')->group(function () {
            Route::get('/', [mappingController::class, 'index']);
        });

        Route::get('wifi', function () {
            return view('frontend.pages.wifi.wifi');
        })->name('wifi');

        Route::get('setting', [SettingController::class, 'index'])->name('setting.');

        Route::get(
            'location',
            [locationController::class, 'index']
        )->name('location.');

        Route::get('gpio', [gpioPageController::class, 'index'])->name('gpio.');

        Route::get('sound', [SoundController::class, 'index'])->name('sound.');

        Route::get('hook-status', function () {
            $title = "hook";
            return view('frontend.pages.hook.hook', compact('title'));
        })->name('hook');

        Route::get('history', function () {
            $title = 'History';
            return view('frontend.pages.history.history', compact('title'));
        })->name('history');

        Route::get('start-robot', function () {
            $title = 'Start robot';
            return  view('frontend.pages.startRobot.index', compact('title'));
        })->name('start-robot');
        Route::get('chart', function () {
            $title = 'Activity chart';
            return  view('frontend.pages.chart.index', compact('title'));
        })->name('chart');
    });
});