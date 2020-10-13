<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\EditorController;

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

Route::get('/editor/{id}', [EditorController::class, 'index']);

// メタ情報取得
Route::get('/editor/{id}/meta', [EditorController::class, 'meta']);
// 文章取得
Route::get('/editor/{id}/sentence', [EditorController::class, 'sentence']);
