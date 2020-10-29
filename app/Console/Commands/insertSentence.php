<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\Sentence;
use Faker\Factory;

class insertSentence extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'command:insertSentence {count=100}';

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
        // パラメータ取得
        $count = (int)$this->argument('count');
        // テーブルを truncate
        Sentence::truncate();

        // インサート処理
        $loop      = (int)floor($count / 100);
        $remainder = $count % 100;

        // プログレスバー
        $bar = $this->output->createProgressBar($loop + 1);

        for ($i = 0; $i < $loop; $i++) {
            $users = $this->times(100);
            // 100 ずつ bulk insert
            Sentence::insert($users);
            $bar->advance();
        }

        // 余りをインサート
        Sentence::insert($this->times($remainder));
        $bar->advance();
        $bar->finish();
        $this->info("done.");
    }

    protected function times($count)
    {
        $faker      = Factory::create();
        $attributes = [];
        for ($i = 0; $i < $count; $i++) {
            $attributes[] = [
                'source' => $faker->sentence,
                'source_tag' => $faker->sentence,
                'target' => $faker->sentence,
                'target_tag' => $faker->sentence,
                'pid' => $faker->numberBetween($min = 1, $max = 1000),
            ];
        }

        return $attributes;
    }
}
