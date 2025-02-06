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
        Schema::create('rm_raw_requests', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger("tripId");
            $table->string("productCode");
            $table->integer("quantity");
            $table->integer("quantityOdd")->nullable();
            $table->integer("workShift");
            $table->string("comment")->nullable();
            $table->string("msnv");
            $table->timestamps();
        });
        Schema::table('rm_raw_requests', function (Blueprint $table) {
            $table->foreign('tripId')->references('id')->on('rm_trips');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('rm_raw_requests');
    }
};