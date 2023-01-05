<div class="h-full w-full flex flex-col function-item form-else-if overflow-hidden">
    <div class="flex flex-col mr-[30px]">
        <label for="" class="text-xl">Name normal mission</label>
        <input class="w-[200px] text-xl px-4 py-1 input-reset" type="text" name="" required>
    </div>
    <div class="h-[80px] w-full flex flex-wrap overflow-y-auto my-4 border">
        <div class="h-[30px] px-4 bg-sky-500 text-white text-[16px] leading-[30px] rounded-lg ml-2 my-2">
            footprint|1
        </div>
    </div>
    @include('frontend.blocks.mission.createMissions.typeMissionTab.functionItem', ['type' => 'normal'])
</div>
