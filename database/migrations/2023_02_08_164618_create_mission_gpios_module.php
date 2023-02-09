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
        if (!Schema::hasTable('mission_gpios_module')) {
            Schema::create('mission_gpios_module', function (Blueprint $table) {
                $table->id();
                $table->string('name_gpio');
                $table->string('name_gpio_module');
                $table->integer('time_out')->default(-1);
                $table->string('mode')->default('gpioModule');
                $table->string('out_set')->nullable();
                $table->string('out_reset')->nullable();
                $table->string('in_on')->nullable();
                $table->string('in_off')->nullable();
                $table->string('in_pullup')->nullable();
                $table->string('in_pulldown')->nullable();
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
        Schema::dropIfExists('mission_gpios_module');
    }
};
