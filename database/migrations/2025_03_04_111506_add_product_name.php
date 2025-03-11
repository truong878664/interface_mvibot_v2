<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
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
        Schema::table("rm_finished_products", function (Blueprint $table) {
            $table->string("productName")->after("tripId")->default("");
        });
        Schema::table("rm_raw_requests", function (Blueprint $table) {
            $table->string("productName")->after("tripId")->default("");
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table("rm_finished_products", function (Blueprint $table) {
            $table->dropColumn("productName");
        });
        Schema::table("rm_raw_requests", function (Blueprint $table) {
            $table->dropColumn("productName");
        });
    }
};
