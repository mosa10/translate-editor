<?php

namespace App\Http\Controllers;

use App\Service\DocumentService;

class DocumentController extends Controller
{
    public function edit( $id )
    {
        $documentService = new DocumentService;

        $listSentence = $documentService->getSentence($id);

        return view('document.edit', [
            'listSentence' => $listSentence,
        ]);
    }

    public function meta( $id )
    {
        $editorService = new EditorService;

        return $editorService->getMeta($id);
    }
}
