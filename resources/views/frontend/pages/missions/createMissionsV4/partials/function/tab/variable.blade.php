@php
    $formatCommandActionList = [['value' => 'new', 'symbol' => 'new'], ['value' => 'equal', 'symbol' => '='], ['value' => 'equal_as', 'symbol' => '=='], ['value' => 'equal_not', 'symbol' => '!='], ['value' => 'smaller_as', 'symbol' => '<'], ['value' => 'smaller_equal_as', 'symbol' => '<='], ['value' => 'bigger_as', 'symbol' => '>'], ['value' => 'bigger_equal_as', 'symbol' => '>='], ['value' => 'equal_+', 'symbol' => '++'], ['value' => 'equal_-', 'symbol' => '--'], ['value' => 'reset', 'symbol' => 'reset'], ['value' => 'delete', 'symbol' => 'delete']];
    
@endphp


<div class="hidden function-form-item function-mission-tab relative rounded-md bg-[#fff] p-4 pb-[60px]"
    data-type="variable">
    <div class="flex flex-col m-4">
        <label for="" class="text-xl">Name function variable</label>
        <input class="text-2xl px-4 py-1  input-reset name_function_variable valid-input" type="text"
            name="name_function_variable" data-type="string" required>
    </div>

    <div class="flex flex-col m-4">
        <label for="" class="text-2xl">Command action</label>
        <div class="flex mt-4 z-[11] justify-between text-2xl -mr-2 gap-3">
            <select data-type="string" name="command_action" id="" data-value="new"
                class="bg-transparent outline-none border text-2xl text-center peer/sl py-1">
                @foreach ($formatCommandActionList as $item)
                    <option value="{{ $item['value'] }}" class="text-4xl">{{ $item['symbol'] }}</option>
                @endforeach
            </select>
            <input
                class="w-24 px-2 py-1 text-center  peer-data-[value='reset']/sl:hidden peer-data-[value='delete']/sl:hidden"
                data-type="string" name="name_variable" type="text" placeholder="Name">

            <input placeholder="focus value" data-type="string"
                class="w-40 px-2 py-1 text-center peer-data-[value='new']/sl:hidden peer-data-[value='reset']/sl:hidden peer-data-[value='delete']/sl:hidden"
                name="focus_value" type="text">
        </div>
    </div>

    @include('frontend.pages.missions.createMissionsV4.partials.function.tab.buttonSave', [
        'type' => 'variable',
    ])
</div>
