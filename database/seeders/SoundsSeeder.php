<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class SoundsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('sounds')->insert([
            [
                'href' => 'sound/system/ambiencce.mp3',
                'name' => 'Ambiencce',
                'type' => 'system'
            ],
            [
                'href' => 'sound/system/bell-ring.mp3',
                'name' => 'Bell ring',
                'type' => 'system'
            ],
            [
                'href' => 'sound/system/bundle.mp3',
                'name' => 'Bundle',
                'type' => 'system'
            ],
            [
                'href' => 'sound/system/cheering.mp3',
                'name' => 'Cheering',
                'type' => 'system'
            ],
            [
                'href' => 'sound/system/rain-and-wind.mp3',
                'name' => 'Rain and wind',
                'type' => 'system'
            ],
            [
                'href' => 'sound/system/switch-patch.mp3',
                'name' => 'Switch patch',
                'type' => 'system'
            ],
            [
                'href' => 'sound/system/whooshes.mp3',
                'name' => 'Whooshes',
                'type' => 'system'
            ],
        ]);
    }
}
