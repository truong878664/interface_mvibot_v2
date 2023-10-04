<div class="hidden function-form-item function-mission-tab relative rounded-md bg-[#fff] p-4 pb-[60px]" data-type="variable">
    <div class="flex flex-col m-4">
        <label for="" class="text-xl">Name function variable</label>
        <input class="w-[00p text-xl px-4 py-1  input-reset name_function_variable valid-input" type="text"
            name="name_function_variable" data-type="string" required>
    </div>

    <div class="flex flex-col m-4">
        <label for="" class="text-xl">Command action</label>
        <div class="flex mt-4 z-[11] justify-between -mr-2 gap-3 text-xl">
            <div class="">
                <input class="w-24 h-12 px-2 text-center" data-type="string" name="name_variable" type="text">
            </div>
            <select data-type="string" name="command_action" id="" data-value="new" class="bg-transparent outline-none w-24 h-12  border text-3xl text-center peer/sl">
                <option value="new">New</option>
                <option value="equal">=</option>
                <option value="equal_as">==</option>
            </select>

            <div class="peer-data-[value='new']/sl:hidden">
                <input data-type="string" class="w-24 h-12 px-2 text-center" name="focus_value" type="text">
            </div>
        </div>
    </div>

    @include('frontend.pages.missions.createMissionsV4.partials.function.tab.buttonSave', [
        'type' => 'variable',
    ])
</div>
