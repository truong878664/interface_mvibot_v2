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
        Schema::create('rm_trip_logs', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger("finished_product_id")->nullable();
            $table->unsignedBigInteger("raw_request_id")->nullable();
            $table->string("log");
            $table->timestamps();
        });

        Schema::table('rm_trip_logs', function (Blueprint $table) {
            $table->foreign("finished_product_id")->references("id")->on("rm_finished_products");
            $table->foreign("raw_request_id")->references("id")->on("rm_raw_requests");
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('rm_trip_logs');
    }
};
