<?php

namespace App\Http\Controllers;

use App\Service\EditorService;
use Illuminate\Http\Request;

class EditorController extends Controller
{
    public function index()
    {
        return view('editor.index');
    }

    public function sentence( $id )
    {
        $editorService = new EditorService;

        return $editorService->getSentence($id, 0);
    }
}
