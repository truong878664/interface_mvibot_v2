<div class="h-full w-full flex flex-col function-item form-else-if overflow-hidden">
    <div class="flex flex-col mr-[30px]">
        <label for="" class="text-xl">Name normal mission</label>
        <input class="w-[200px] text-xl px-4 py-1 input-reset name-normal-mission" type="text" name="" required>
    </div>
    <input type="hidden" class="value-normal-mission">
    <div class="h-[120px] w-full flex flex-wrap overflow-y-auto my-4 border normal-steps-wrapper content-start">

    </div>
    @include('frontend.blocks.mission.createMissions.typeMissionTab.functionItem', ['type' => 'normal'])
</div>
