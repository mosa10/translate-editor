<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateDocumentTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('document', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
        });

        Schema::create('sentence', function (Blueprint $table) {
            $table->id();
            $table->text('range');
            $table->text('source');
            $table->text('source_tag');
            $table->text('target')->nullable();
            $table->text('target_tag')->nullable();
            $table->text('confirm')->nullable();
            $table->text('preprocess')->nullable();
            $table->text('bookmark')->nullable();
            $table->foreignId('document_id')->constrained('document');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('sentence');
        Schema::dropIfExists('document');
    }
}
