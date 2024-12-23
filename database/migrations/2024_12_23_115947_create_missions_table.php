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
        Schema::dropIfExists("missions");
        Schema::create('missions', function (Blueprint $table) {
            $table->id();
            $table->string("name");
            $table->string("type");
            $table->bigInteger("groupId")->unsigned()->index()->nullable();
            $table->foreign("groupId")->references("id")->on("mission_groups")->onDelete("cascade");
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('missions');
    }
};
