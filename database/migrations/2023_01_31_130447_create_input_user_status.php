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
        if (!Schema::hasTable('input_user_status')) {
            Schema::create('input_user_status', function (Blueprint $table) {
                $table->string('name_seri')->unique();
                $table->integer('in1')->default(0)->nullable();
                $table->integer('in2')->default(0)->nullable();
                $table->integer('in3')->default(0)->nullable();
                $table->integer('in4')->default(0)->nullable();
                $table->integer('in5')->default(0)->nullable();
                $table->integer('in6')->default(0)->nullable();
                $table->integer('in7')->default(0)->nullable();
                $table->integer('in8')->default(0)->nullable();
                $table->integer('in9')->default(0)->nullable();
                $table->integer('in10')->default(0)->nullable();
                $table->integer('in11')->default(0)->nullable();
                $table->integer('in12')->default(0)->nullable();
                $table->integer('in13')->default(0)->nullable();
                $table->integer('in14')->default(0)->nullable();
                $table->integer('in15')->default(0)->nullable();
                $table->integer('in16')->default(0)->nullable();
                $table->integer('in17')->default(0)->nullable();
                $table->integer('in18')->default(0)->nullable();
                $table->integer('in19')->default(0)->nullable();
                $table->integer('in20')->default(0)->nullable();
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
        Schema::dropIfExists('input_user_status');
    }
};
