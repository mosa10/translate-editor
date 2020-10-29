<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Sentence;

class SentenceTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //
        Sentence::factory()->count(10000)->create();
    }
}
