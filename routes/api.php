<?php

use App\Http\Controllers\Api\FootprintController;
use App\Http\Controllers\Api\FunctionController;
use App\Http\Controllers\Api\GpioController;
use App\Http\Controllers\Api\GpioModuleController;
use App\Http\Controllers\Api\InputGpioController;
use App\Http\Controllers\Api\LayerController;
use App\Http\Controllers\Api\MarkerController;
use App\Http\Controllers\Api\MiController;
use App\Http\Controllers\Api\MissionController;
use App\Http\Controllers\Api\PositionController;
use App\Http\Controllers\Api\RobotController;
use App\Http\Controllers\Api\SleepController;
use App\Http\Controllers\Api\SoundController;
use App\Http\Controllers\Api\StepController;
use App\Http\Controllers\Api\StopController;
use App\Http\Controllers\Api\TypeMissionController;
use App\Http\Controllers\Api\userController;
use App\Http\Controllers\Api\VarController;
use App\Http\Controllers\Api\VariableController;
use App\Http\Controllers\Api\WakeUpController;
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
Route::resource('gpio_module', GpioModuleController::class);
Route::resource('marker', MarkerController::class);
Route::resource('sleep', SleepController::class);
Route::resource('variable', VariableController::class);
Route::resource('sound', SoundController::class);

Route::resource('mi', MiController::class);
Route::resource('type-mission', TypeMissionController::class);

Route::resource('wake-up', WakeUpController::class)->only('store');
Route::resource('stop', StopController::class)->only('store');

Route::resource('input-gpio', InputGpioController::class)->only('index');

Route::resource('robot', RobotController::class);
Route::resource('function', FunctionController::class)->only('index');

Route::resource('var', VarController::class);
