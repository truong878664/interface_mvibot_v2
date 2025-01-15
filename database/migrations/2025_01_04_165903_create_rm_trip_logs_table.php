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
            $table->unsignedBigInteger("finishedProductId")->nullable()->default(null);
            $table->unsignedBigInteger("rawRequestId")->nullable()->default(null);;
            $table->unsignedBigInteger("tripId")->nullable()->default(null);;
            $table->unsignedBigInteger("userId")->nullable()->default(null);;
            $table->string("keyChange");
            $table->string("action");
            $table->string("from")->nullable()->default(null);;
            $table->string("to")->nullable()->default(null);;

            $table->timestamps();
        });

        Schema::table('rm_trip_logs', function (Blueprint $table) {
            $table->foreign("finishedProductId")->references("id")->on("rm_finished_products");
            $table->foreign("rawRequestId")->references("id")->on("rm_raw_requests");
            $table->foreign("tripId")->references("id")->on("rm_trips");
            $table->foreign("userId")->references("id")->on("users");
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