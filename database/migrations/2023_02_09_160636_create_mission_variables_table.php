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
        if (!Schema::hasTable('mission_variables')) {
            Schema::create('mission_variables', function (Blueprint $table) {
                $table->id();
                $table->string('name_function_variable');
                $table->integer('time_out')->default(-1);
                $table->string('mode')->default('variable');
                $table->string('command_action')->nullable();
                $table->string('name_variable')->nullable();
                $table->string('focus_value')->nullable();
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
        Schema::dropIfExists('mission_variables');
    }
};
