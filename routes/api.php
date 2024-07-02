<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\BatteryChartController;
use App\Http\Controllers\Api\BookmarkController;
use App\Http\Controllers\Api\ConfigController;
use App\Http\Controllers\Api\ConfigRobotController;
use App\Http\Controllers\Api\ErrorSystemController;
use App\Http\Controllers\Api\FootprintController;
use App\Http\Controllers\Api\FunctionController;
use App\Http\Controllers\Api\GpioController;
use App\Http\Controllers\Api\GpioModuleController;
use App\Http\Controllers\Api\InputGpioController;
use App\Http\Controllers\Api\LayerController;
use App\Http\Controllers\Api\MapController;
use App\Http\Controllers\Api\MarkerController;
use App\Http\Controllers\Api\MiController;
use App\Http\Controllers\Api\MissionController;
use App\Http\Controllers\Api\MissionSentController;
use App\Http\Controllers\Api\MissionSentV2Controller;
use App\Http\Controllers\Api\MissionV4Controller;
use App\Http\Controllers\Api\PositionController;
use App\Http\Controllers\Api\RawMaterialController;
use App\Http\Controllers\Api\ResetController;
use App\Http\Controllers\Api\RobotController;
use App\Http\Controllers\Api\SleepController;
use App\Http\Controllers\Api\SoundController;
use App\Http\Controllers\Api\SoundFileController;
use App\Http\Controllers\Api\StartController;
use App\Http\Controllers\Api\StatusController;
use App\Http\Controllers\Api\StepController;
use App\Http\Controllers\Api\StopController;
use App\Http\Controllers\Api\TelegramController;
use App\Http\Controllers\Api\ToolliftController;
use App\Http\Controllers\Api\TypeMissionController;
use App\Http\Controllers\Api\TypeMissionVerController;
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

Route::group([
    'middleware' => 'api',
    'namespace' => 'App\Http\Controllers',
    'prefix' => 'auth'

], function ($route) {
    Route::post('/login', 'Api\AuthController@login');
    Route::post('/register', 'Api\AuthController@register');
    Route::post('/logout', 'Api\AuthController@logout');
    Route::post('/refresh', 'Api\AuthController@refresh');
    Route::get('/user-profile', 'Api\AuthController@userProfile');
    Route::post('/change-pass', 'Api\AuthController@changePassWord');
});

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::group(['middleware' => ['VerifyJWTToken']], function () {
    Route::resource('start', StartController::class);
    Route::resource('reset', ResetController::class);

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
    Route::resource('config', ConfigController::class);
    Route::resource('telegram', TelegramController::class);
    Route::resource('lift', ToolliftController::class);

    Route::resource('mi', MiController::class);
    Route::resource('type-mission', TypeMissionController::class);

    Route::resource('wake_up', WakeUpController::class);
    Route::resource('stop', StopController::class);

    Route::resource('input-gpio', InputGpioController::class);

    Route::resource('robot', RobotController::class);
    Route::resource('function', FunctionController::class);

    Route::resource('var', VarController::class);
    Route::resource('sound-file', SoundFileController::class)->only('destroy');
    Route::resource('config-status', ConfigRobotController::class)->only('index');
    Route::resource('status', StatusController::class);

    Route::resource('bookmark', BookmarkController::class);
    Route::resource('error-system', ErrorSystemController::class);
    Route::resource("battery-chart", BatteryChartController::class)->only("index");

    // mission v4
    Route::resource('mission-v4', MissionV4Controller::class);
    Route::resource('type-mission-v4', TypeMissionVerController::class);
    Route::resource('mission-sent', MissionSentController::class);
    Route::resource('mission-sent-v2', MissionSentV2Controller::class);
    Route::resource('auth', AuthController::class);
    Route::resource('map', MapController::class)->only("index");
    Route::resource('raw-material', RawMaterialController::class);
});
