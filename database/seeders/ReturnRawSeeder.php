<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ReturnRawSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table("produce_code")->insert([
            [
                'lineID' => 'weight',
                'type' => 'main',
                'code' => 'Trả phôi - 0070NC',
            ],

            [
                'lineID' => 'weight',
                'type' => 'main',
                'code' => 'Trả phôi - 0070 N.Đen',
            ],

            [
                'lineID' => 'weight',
                'type' => 'main',
                'code' => 'Trả phôi - Pinion - O9190',
            ],
            [
                'lineID' => 'weight',
                'type' => 'main',
                'code' => 'Trả phôi - Pinion - O190',
            ],
            [
                'lineID' => 'weight',
                'type' => 'mai',
                'code' => 'Trả phôi - S.DRIVE - 620',
            ],
            [
                'lineID' => 'weight',
                'type' => 'mai',
                'code' => 'Trả phôi - S.DRIVE - 680',
            ],
            [
                'lineID' => 'weight',
                'type' => 'mai',
                'code' => 'Trả phôi - S.DRIVE - 200',
            ],
            [
                'lineID' => 'weight',
                'type' => 'mai',
                'code' => 'Trả phôi - S.DRIVE - 220',
            ],
            [
                'lineID' => 'weight',
                'type' => 'NC',
                'code' => 'Trả phôi - S.DRIVE - 620',
            ],
            [
                'lineID' => 'weight',
                'type' => 'NC',
                'code' => 'Trả phôi - S.DRIVE - 680',
            ],
            [
                'lineID' => 'weight',
                'type' => 'NC',
                'code' => 'Trả phôi - S.DRIVE - 200',
            ],
            [
                'lineID' => 'weight',
                'type' => 'NC',
                'code' => 'Trả phôi - S.DRIVE - 220',
            ],
            [
                'lineID' => 'weight',
                'type' => null,
                'code' => 'Trả phôi - Boss - 710',
            ],
            [
                'lineID' => 'weight',
                'type' => null,
                'code' => 'Trả phôi - Boss - 410i',
            ],
            [
                'lineID' => 'weight',
                'type' => null,
                'code' => 'Trả phôi - Plate Magnetic - 0201/0180',
            ],
            [
                'lineID' => 'weight',
                'type' => null,
                'code' => 'Trả phôi - CORE - 370',
            ],
            [
                'lineID' => 'weight',
                'type' => null,
                'code' => 'Trả phôi - CORE - 290',
            ],
            [
                'lineID' => 'weight',
                'type' => null,
                'code' => 'Trả phôi - CORE - 270',
            ],
            [
                'lineID' => 'weight',
                'type' => null,
                'code' => 'Trả phôi - CORE - 270',
            ],
            [
                'lineID' => 'weight',
                'type' => null,
                'code' => 'Trả phôi - CORE - 271',
            ],
            [
                'lineID' => 'weight',
                'type' => null,
                'code' => 'Trả phôi - CORE - 232',
            ],
            [
                'lineID' => 'weight',
                'type' => null,
                'code' => 'Trả phôi - Body - 41',
            ],
            [
                'lineID' => 'weight',
                'type' => null,
                'code' => 'Trả phôi - Core Busing - 220',
            ],
        ]);
    }
}
