<?php

namespace App\Http\Controllers;

use App\Service\EditorService;
use App\Http\Requests\SentenceStoreRequest;
use App\Models\Sentence;

class SentenceController extends Controller
{
    public function index( $documentId )
    {
        $editorService = new EditorService;

        return $editorService->get($documentId, 0);
    }

    public function update( $documentId, SentenceStoreRequest $request )
    {
        foreach ( $request->sentence as $reqSentence ){
            $tmp = (object)$reqSentence;

            $sentence = Sentence::where('range', $tmp->range)->first();
            $sentence->fill($reqSentence)->save();

            print_r($tmp);
        }

    }
}
