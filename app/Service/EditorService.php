<?php

namespace App\Service;

use DOMDocument;
use DOMNode;
use App\Models\Document\Sentence;


class EditorService
{
    private function getInnerXML(DOMDocument $dom, DOMNode $node)
    {
        // innerXML 取得
        $tmp = $dom->saveXML($node);
        // 外側のタグ除去
        $tmp = preg_replace('@^<' . $node->nodeName . '[^>]*>|</' . $node->nodeName . '>$@', '', $tmp);

        return $tmp;
    }

    private function convertEditFormat(String $text)
    {
        // 開始タグ変換
        $text = preg_replace('/<([^\/].*?)\s.*?id="([0-9]+)".*?>/', '{$1:$2}', $text);
        // 終了タグ変換
        $text = preg_replace('/<\/(.*?)>/', '{/$1}', $text);

        return $text;
    }

    private function getEditText(DOMDocument $dom, DOMNode $transUnit, String $tagName)
    {
        // source要素 取得
        $listSource = $transUnit->getElementsByTagName($tagName);
        // 先頭取得
        $source = $listSource->item(0);

        // innerXML 取得
        $tmp = $this->getInnerXML($dom, $source);

        $tmp = $this->convertEditFormat($tmp);

        return $tmp;
    }

    public function convertWork(String $pathXlf, String $pathXml)
    {
        $domIn = new DOMDocument;
        $domIn->load($pathXlf);

        $domOut = new DOMDocument;
        $domOut->formatOutput = true;
        $domOut->encoding = "UTF-8";

        $document = $domOut->createElement("document");
        $domOut->appendChild($document);

        $listTransUnit = $domIn->getElementsByTagName("trans-unit");

        foreach ($listTransUnit as $transUnit) {
            $sentence = $domOut->createElement("sentence");
            $document->appendChild($sentence);

            // id
            $id = $transUnit->getAttribute("id");
            list($prefix, $key) = explode("-", $id);
            $sentence->setAttribute("range", "{$key}:0-e");

            // source
            $source = $domOut->createElement("source");
            $source->nodeValue = $this->getEditText($domIn, $transUnit, "source");
            $sentence->appendChild($source);

            // target
            $target = $domOut->createElement("target");
            $target->nodeValue = $this->getEditText($domIn, $transUnit, "target");
            $sentence->appendChild($target);
        }

        $domOut->save($pathXml);
    }

    public function getSentence($id, $indexStart, $indexEnd = null)
    {
        $result = [];

        $pathWork = "/var/www/data/work.xml";

        $dom = new DOMDocument;
        $dom->load($pathWork);

        $listSentence = $dom->getElementsByTagName("sentence");

        if ( is_null($indexEnd) ){
            $indexEnd = $listSentence->length;
        }

        for ($index = $indexStart; $index < $indexEnd; $index++) {
            $sentence = new Sentence;

            $node = $listSentence->item($index);

            $sentence->load($node);

            $result[$index] = $sentence;
        }

        return $result;
    }
}
