<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\backend\PositionController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::prefix('position')->group(function() {
    Route::get('/', [PositionController::class, 'index']);
});
