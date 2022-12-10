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
        if (!Schema::hasTable('motor_right_status')) {
            Schema::create('motor_right_status', function (Blueprint $table) {
                $table->string('name_seri')->nullable()->unique();
                $table->integer('live')->nullable();
                $table->integer('error')->nullable();
                $table->integer('enable')->nullable();
                $table->integer('brake')->nullable();
            });
        }
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('motor_right_status');
    }
};