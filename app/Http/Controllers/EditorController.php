<?php

namespace App\Http\Controllers;

use App\Service\EditorService;
use Illuminate\Http\Request;

class EditorController extends Controller
{
    public function index( $id )
    {
        $editorService = new EditorService;

        $listSentence = $editorService->getSentence($id);

        return view('editor.index', [
            'listSentence' => $listSentence,
        ]);
    }

    public function meta( $id )
    {
        $editorService = new EditorService;

        return $editorService->getMeta($id);
    }

    public function sentence( $id )
    {
        $editorService = new EditorService;

        return $editorService->getSentence($id, 0);
    }
}
