<?php

namespace Database\Factories;

use App\Models\Sentence;
use Illuminate\Database\Eloquent\Factories\Factory;

class SentenceFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Sentence::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'source' => $this->faker->sentence,
            'source_tag' => $this->faker->sentence,
            'target' => $this->faker->sentence,
            'target_tag' => $this->faker->sentence,
            'pid' => $this->faker->numberBetween($min = 1, $max = 1000),
        ];
    }
}
