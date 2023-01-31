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
        if (!Schema::hasTable('output_user_status')) {

            Schema::create('output_user_status', function (Blueprint $table) {
                $table->string('name_seri')->unique();
                $table->integer('out1')->default(0)->nullable();
                $table->integer('out2')->default(0)->nullable();
                $table->integer('out3')->default(0)->nullable();
                $table->integer('out4')->default(0)->nullable();
                $table->integer('out5')->default(0)->nullable();
                $table->integer('out6')->default(0)->nullable();
                $table->integer('out7')->default(0)->nullable();
                $table->integer('out8')->default(0)->nullable();
                $table->integer('out9')->default(0)->nullable();
                $table->integer('out10')->default(0)->nullable();
                $table->integer('out11')->default(0)->nullable();
                $table->integer('out12')->default(0)->nullable();
                $table->integer('out13')->default(0)->nullable();
                $table->integer('out14')->default(0)->nullable();
                $table->integer('out15')->default(0)->nullable();
                $table->integer('out16')->default(0)->nullable();
                $table->integer('out17')->default(0)->nullable();
                $table->integer('out18')->default(0)->nullable();
                $table->integer('out19')->default(0)->nullable();
                $table->integer('out20')->default(0)->nullable();
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
        Schema::dropIfExists('output_user_status');
    }
};
