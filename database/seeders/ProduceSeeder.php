<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ProduceSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table("line")->insert([
            [
                "id" => "core",
                "name" => "Core",
            ],
            [
                "id" => "outer",
                "name" => "Outer",
            ],
            [
                "id" => "sleeve",
                "name" => "Sleeve",
            ],
            [
                "id" => "holder",
                "name" =>  "Holder (4 line)",
            ],
            [
                "id" => "guide",
                "name" => "Guide"
            ],
            [
                "id" => "weight",
                "name" => "Weight (6 line)"
            ]
        ]);

        DB::table("produce_code")->insert([
            [
                'lineID' => 'core',
                'type' => 'main',
                'code' => '650',
            ],
            [
                'lineID' => 'core',
                'type' => 'main',
                'code' => '610',
            ],
            [
                'lineID' => 'core',
                'type' => 'sub',
                'code' => '730',
            ],

            [
                'lineID' => 'sleeve',
                'type' => 'sub',
                'code' => '0440 NC',
            ],
            [
                'lineID' => 'sleeve',
                'type' => 'sub',
                'code' => '0441 Nhiệt',
            ],
            [
                'lineID' => 'holder',
                'type' => 'main',
                'code' => '5010'
            ],


            [
                'lineID' => 'guide',
                'type' => 'main',
                'code' => 'OO20 NC',
            ],
            [
                'lineID' => 'guide',
                'type' => 'main',
                'code' => '0020 Nhiệt',
            ],

            [
                'lineID' => 'weight',
                'type' => 'main',
                'code' => '0070NC',
            ],

            [
                'lineID' => 'weight',
                'type' => 'main',
                'code' => '0070 N.Đen',
            ],

            [
                'lineID' => 'weight',
                'type' => 'main',
                'code' => 'Pinion - O9190',
            ],
            [
                'lineID' => 'weight',
                'type' => 'main',
                'code' => 'Pinion - O190',
            ],
            [
                'lineID' => 'weight',
                'type' => 'mai',
                'code' => 'S.DRIVE - 620',
            ],
            [
                'lineID' => 'weight',
                'type' => 'mai',
                'code' => 'S.DRIVE - 680',
            ],
            [
                'lineID' => 'weight',
                'type' => 'mai',
                'code' => 'S.DRIVE - 200',
            ],
            [
                'lineID' => 'weight',
                'type' => 'mai',
                'code' => 'S.DRIVE - 220',
            ],
            [
                'lineID' => 'weight',
                'type' => 'NC',
                'code' => 'S.DRIVE - 620',
            ],
            [
                'lineID' => 'weight',
                'type' => 'NC',
                'code' => 'S.DRIVE - 680',
            ],
            [
                'lineID' => 'weight',
                'type' => 'NC',
                'code' => 'S.DRIVE - 200',
            ],
            [
                'lineID' => 'weight',
                'type' => 'NC',
                'code' => 'S.DRIVE - 220',
            ],
            [
                'lineID' => 'weight',
                'type' => null,
                'code' => 'Boss - 710',
            ],
            [
                'lineID' => 'weight',
                'type' => null,
                'code' => 'Boss - 410i',
            ],
            [
                'lineID' => 'weight',
                'type' => null,
                'code' => 'Plate Magnetic - 0201/0180',
            ],
            [
                'lineID' => 'weight',
                'type' => null,
                'code' => 'CORE - 370',
            ],
            [
                'lineID' => 'weight',
                'type' => null,
                'code' => 'CORE - 290',
            ],
            [
                'lineID' => 'weight',
                'type' => null,
                'code' => 'CORE - 270',
            ],
            [
                'lineID' => 'weight',
                'type' => null,
                'code' => 'CORE - 270',
            ],
            [
                'lineID' => 'weight',
                'type' => null,
                'code' => 'CORE - 271',
            ],
            [
                'lineID' => 'weight',
                'type' => null,
                'code' => 'CORE - 232',
            ],
            [
                'lineID' => 'weight',
                'type' => null,
                'code' => 'Body - 41',
            ],
            [
                'lineID' => 'weight',
                'type' => null,
                'code' => 'Core Busing - 220',
            ],
            [
                'lineID' => 'outer',
                'type' => null,
                'code' => 'NC',
            ],
            [
                'lineID' => 'outer',
                'type' => null,
                'code' => 'Nhiệt',
            ],

        ]);
    }
}
// ing("line");
//             $table->enum("type", array("main", "sub"));
//             $table->string("code");