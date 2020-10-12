<?php

namespace App\Console\Commands\editor;

use Illuminate\Console\Command;
use App\Service\EditorService;

class XLIFF2XMLCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'command:xliff2xml';

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
        echo "xliff2xml\n";

        $editorService = new EditorService;
        $editorService->convertWork("/var/www/data/test.docx.xlf", "/var/www/data/work.xml");

        return 0;
    }
}
