<?php

use App\Http\Controllers\Api\FootprintController;
use App\Http\Controllers\Api\GpioController;
use App\Http\Controllers\Api\LayerController;
use App\Http\Controllers\Api\MarkerController;
use App\Http\Controllers\Api\MiController;
use App\Http\Controllers\Api\MissionController;
use App\Http\Controllers\Api\PositionController;
use App\Http\Controllers\Api\SleepController;
use App\Http\Controllers\Api\StepController;
use App\Http\Controllers\Api\TypeMissionController;
use App\Http\Controllers\Api\userController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});


Route::resource('mission', MissionController::class);
Route::resource('position', PositionController::class);
Route::resource('layer', LayerController::class);
Route::resource('step', StepController::class);
Route::resource('user', userController::class);

Route::resource('footprint', FootprintController::class);
Route::resource('gpio', GpioController::class);
Route::resource('marker', MarkerController::class);
Route::resource('sleep', SleepController::class);


Route::resource('mi', MiController::class);
Route::resource('type-mission', TypeMissionController::class);