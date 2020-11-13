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
            if ( $reqSentence['event'] == 'update' ){
                $sentence = Sentence::where('range', $reqSentence['range'])->first();
                $sentence->fill($reqSentence['sentence'])->save();
            } else if ( $reqSentence['event'] == 'join' ){
                Sentence::where('range', $reqSentence['range'][0])->first()->delete();
                Sentence::where('range', $reqSentence['range'][1])->first()->delete();
                Sentence::create($reqSentence['sentence']);
            }
        }
    }
}
