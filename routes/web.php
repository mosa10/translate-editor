<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\DocumentController;
use App\Http\Controllers\SentenceController;

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

Route::get('/document/{id}/edit', [DocumentController::class, 'edit']);

// メタ情報取得
Route::get('/document/{id}/meta', [DocumentController::class, 'meta']);
// 文章
Route::resource('/document/{documentId}/sentence', SentenceController::class)->only([
    'index', 'update'
]);
Route::put('/document/{documentId}/sentence', [SentenceController::class, 'update']);
