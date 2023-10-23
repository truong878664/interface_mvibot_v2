<div class="h-[28px]  w-[50px] relative mr-2">
    <button
        class="w-full h-full absolute top-0 left-0 btn border rounded-md flex items-center user-select-none {{ $type }}_btn">

        <input type="text"
            class="h-full border-none bg-transparent w-full text text-2xl text-center px-2 cursor-pointer  {{ $type }}_input"
            readonly value="{{ $type == 'command_action' ? '=' : '' }}">
    </button>
    <ul
        class="absolute top-full text-2xl w-full transition-[max-height] duration-300 item-var-ul {{ $type }}_ul overflow-auto hidden max-h-[200px]">
        @if ($type == 'command_action')
            <li class="mt-1 text-center rounded-md hover:bg-stone-200 border {{ $type }}_value var-item-value bg-[#fff]"
                type="{{ $type }}" value="=">=</li>
            <li class="mt-1 text-center rounded-md hover:bg-stone-200 border {{ $type }}_value var-item-value bg-[#fff]"
                type="{{ $type }}" value="==">==</li>
        @endif
    </ul>
</div>
