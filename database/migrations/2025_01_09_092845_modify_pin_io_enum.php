<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        DB::statement("ALTER TABLE pin_io_material MODIFY `when` ENUM('done', 'cancel', 'processing', 'require', 'product_wrong_pin_io')");
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        // DB::statement("ALTER TABLE pin_io_material MODIFY `when` ENUM('done', 'cancel', 'processing', 'require')");
    }
};
