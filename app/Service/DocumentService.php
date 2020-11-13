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

    private function getText(DOMDocument $dom, DOMNode $transUnit, String $tagName)
    {
        // source要素 取得
        $listSource = $transUnit->getElementsByTagName($tagName);
        // 先頭取得
        $source = $listSource->item(0);

        return $source->nodeValue;
    }

    public function create(String $pathXlf)
    {
        $document = new Document;
        $id = $document->save();

        Sentence::where('document_id', $id)->delete();

        $domIn = new DOMDocument;
        $domIn->load($pathXlf);

        $listTransUnit = $domIn->getElementsByTagName("trans-unit");

        // Todo
        $P = [
            'mt', 'sim', 'src', 'none'
        ];

        foreach ($listTransUnit as $transUnit) {
            $sentence = new Sentence;

            // get source text
            $textS = $this->getText($domIn, $transUnit, "source");
            // get text length
            $lenS = mb_strlen($textS);

            // id / range
            $range = $transUnit->getAttribute("id");
            $sentence->range = "{$range}:0-{$lenS}";

            // source
            $sentence->source = $this->getText($domIn, $transUnit, "source");
            $sentence->source_tag = $this->getEditText($domIn, $transUnit, "source");

            // target
            //$sentence->target = $this->getText($domIn, $transUnit, "target");
            //$sentence->target_tag = $this->getEditText($domIn, $transUnit, "target");
            $sentence->target = $this->getText($domIn, $transUnit, "source");
            $sentence->target_tag = $this->getEditText($domIn, $transUnit, "source");

            // confirm
            $sentence->confirm = rand("0", "1");
            // preprocess
            $sentence->preprocess = $P[rand(0, count($P)-1)];
            // bookmark
            $sentence->bookmark = rand("0", "1");

            $sentence->document_id = $id;

            $sentence->save();
        }
    }

    public function getSentence($id)
    {
        return Sentence::where('document_id', $id)->get();
    }
}
