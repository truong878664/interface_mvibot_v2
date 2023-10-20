<div class="hidden function-item function-mission-tab relative rounded-md bg-[#fff] p-4 pb-[60px]" data-type="variable">
    <div class="flex flex-col m-4">
        <label for="" class="text-xl">Create variable</label>
        <div class="mb-4">
            <input class="w-[50px] text-xl px-4 py-1  input-reset rounded-md name-variable" type="text" name=""
                required>
            <button class=" btn bg-[#0f6cbd] text-[#fff] self-end px-4 py-1 text-2xl rounded-md create-variable-btn">
                <i class="fa-solid fa-plus"></i>
            </button>
        </div>
    </div>
    <div class="flex flex-col m-4">
        <label for="" class="text-xl">Name function variable</label>
        <input class="w-[00p text-xl px-4 py-1  input-reset name_function_variable valid-input" type="text"
            name="" required>
    </div>

    <div class="flex flex-col m-4">
        <label for="" class="text-xl">Command action</label>
        <div class="flex mt-4 z-[11] justify-between -mr-2">
            @include('frontend.blocks.mission.createMissions.functionTab.tabVar.nameVar', [
                'type' => 'name_variable',
            ])

            @includeIf('frontend.blocks.mission.createMissions.functionTab.tabVar.nameVar', [
                'type' => 'command_action',
            ])

            @include('frontend.blocks.mission.createMissions.functionTab.tabVar.nameVar', [
                'type' => 'focus_value',
            ])
        </div>
    </div>

    @include('frontend.blocks.mission.createMissions.functionTab.buttonSave', ['type' => 'variable'])
</div>
