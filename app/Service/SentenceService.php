<?php

namespace App\Service;

use DOMDocument;
use DOMNode;
use App\Models\Document\Sentence;


class SentenceService
{
    public function get($documentId, $indexStart = 0, $indexEnd = null)
    {
        $result = [];

        $pathWork = "/var/www/data/work.docx.xml";

        $dom = new DOMDocument;
        $dom->load($pathWork);

        $listSentence = $dom->getElementsByTagName("sentence");

        if (is_null($indexEnd)) {
            $indexEnd = $listSentence->length;
        }

        for ($index = $indexStart; $index < $indexEnd; $index++) {
            $node = $listSentence->item($index);

            $sentence = new Sentence;
            $sentence->load($node);

            $result[$index] = $sentence;
        }

        return $result;
    }

    public function set($documentId, $listSentence)
    {
        $pathWork = "/var/www/data/work.docx.xml";

        $dom = new DOMDocument;
        $dom->load($pathWork);

        $listElementSentence = $dom->getElementsByTagName("sentence");

        foreach ( $listSentence as $sentence ){
            foreach ( $listElementSentence as $elementSentence ){
                $range = $elementSentence->getAttribute("range");

                if ( strcmp($range, $sentence->reange) === 0 ){
                    
                }
            }
        }
    }
}
