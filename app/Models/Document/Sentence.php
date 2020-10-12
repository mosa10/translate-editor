<?php

namespace App\Models\Document;

use DOMNode;

class Sentence
{
    var $range;
    var $source;
    var $target;

    public function load(DOMNode $node){
        $this->range = $node->getAttribute("range");

        $this->source = $node->getElementsByTagName("source")->item(0)->nodeValue;
        $this->target = $node->getElementsByTagName("target")->item(0)->nodeValue;
    }
}
