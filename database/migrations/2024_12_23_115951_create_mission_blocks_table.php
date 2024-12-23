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
        Schema::dropIfExists('mission_blocks');
        Schema::create('mission_blocks', function (Blueprint $table) {
            $table->string("id")->unique()->index();

            $table->string("title");
            $table->string("opcode");

            $table->string("next")->index()->nullable()->default(null);
            $table->string("prev")->index()->nullable()->default(null);
            $table->string("parent")->index()->nullable()->default(null);
            $table->string("asyncTo")->index()->nullable()->default(null);
            $table->string("rootId")->index()->nullable()->default(null);

            $table->boolean("topLever")->default(false);
            $table->boolean("isAsync")->default(false);

            $table->json("fields");
            $table->json("setting");
            $table->bigInteger("missionId")->unsigned()->index();

            $table->timestamps();
        });

        Schema::table("mission_blocks", function (Blueprint $table) {
            $table->foreign("next")->references("id")->on("mission_blocks")->onDelete("cascade");
            $table->foreign("prev")->references("id")->on("mission_blocks")->onDelete("cascade");
            $table->foreign("parent")->references("id")->on("mission_blocks")->onDelete("cascade");
            $table->foreign("asyncTo")->references("id")->on("mission_blocks")->onDelete("cascade");
            $table->foreign("rootId")->references("id")->on("mission_blocks")->onDelete("cascade");

            $table->foreign("missionId")->references("id")->on("missions")->onDelete("cascade");
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('mission_blocks');
    }
};
