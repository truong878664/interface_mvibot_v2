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
            $table->unsignedBigInteger("trip_id");
            $table->string("product_name");
            $table->integer("quality");
            $table->integer("pcs")->nullable();
            $table->string("note")->nullable();
            $table->string("line");
            $table->timestamps();
        });
        Schema::table('rm_raw_requests', function (Blueprint $table) {
            $table->foreign('trip_id')->references('id')->on('rm_trips');
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
