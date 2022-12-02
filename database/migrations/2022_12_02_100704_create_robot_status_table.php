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
        if (!Schema::hasTable('robot_status')) {
            Schema::create('robot_status', function (Blueprint $table) {
                $table->string('name_seri')->nullable()->unique();
                $table->integer('status')->nullable();
                $table->string('mode')->nullable();
                $table->string('mode_status')->nullable();
                $table->string('ip_node')->nullable();
                $table->string('ip_master')->nullable();
                $table->string('type_connect')->nullable();
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
        Schema::dropIfExists('robot_status');
    }
};