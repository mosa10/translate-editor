<?php

namespace App\Console\Commands\editor;

use Illuminate\Console\Command;
use App\Service\DocumentService;
use App\Models\Document;
use App\Models\Sentence;

class Xlf2DBCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'command:xlf2db';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command description';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        echo "xlf2db\n";

        $documentService = new DocumentService;
        $documentService->create("/var/www/data/test.docx.xlf");
        //$documentService->create("/var/www/data/test2.html.xlf");

        return 0;
    }
}
