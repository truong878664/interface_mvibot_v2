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
        Schema::table('require', function (Blueprint $table) {
            $table->enum('statusProduce', array("confirmed", "unconfirmed"))->default("unconfirmed")->after("status");
        });
        DB::statement(" ALTER TABLE `require` CHANGE `status` `status` ENUM('done','cancel','processing','require') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'require';");
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('require', function (Blueprint $table) {
            $table->dropColumn('statusProduce');
        });
        DB::statement(" ALTER TABLE `require` CHANGE `status` `status` ENUM('done','cancel','processing','require', 'confirm') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'require';");
    }
};
