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
        Schema::create('staff_of_line', function (Blueprint $table) {
            $table->id();
            $table->string("msnv");
            $table->string("name");
            $table->unsignedBigInteger("userId");
            $table->timestamps();
        });

        Schema::table('staff_of_line', function (Blueprint $table) {
            $table->foreign('userId')->references('id')->on('users');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('staff_of_line');
    }
};