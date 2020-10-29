<?php

namespace App\Service;

use DOMDocument;
use DOMNode;
use App\Models\Document;
use App\Models\Sentence;


class DocumentService
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

    public function create(String $pathXlf)
    {
        $document = new Document;
        $id = $document->save();

        $domIn = new DOMDocument;
        $domIn->load($pathXlf);

        $listTransUnit = $domIn->getElementsByTagName("trans-unit");

        foreach ($listTransUnit as $transUnit) {
            $sentence = new Sentence;

            // id / range
            $range = $transUnit->getAttribute("id");
            $sentence->range = "{$range}:0-e";

            // source
            $sentence->source = $this->getEditText($domIn, $transUnit, "source");
            $sentence->source_tag = $this->getEditText($domIn, $transUnit, "source");

            // target
            $sentence->target = $this->getEditText($domIn, $transUnit, "target");
            $sentence->target_tag = $this->getEditText($domIn, $transUnit, "target");

            $sentence->document_id = $id;

            $sentence->save();
        }
    }

    public function getSentence($id)
    {
        return Sentence::where('document_id', $id)->get();
    }
}
