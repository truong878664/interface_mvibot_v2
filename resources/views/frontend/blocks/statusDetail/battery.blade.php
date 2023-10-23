<div class="flex flex-col font-bold text-right">
    {{-- <span class="py-2 h-8 font-bold px-2 text-right">Health</span> --}}
    <span class="p-2 h-8">Charging</span>
    <span class="p-2 h-8">Level</span>
    <span class="p-2 h-8">Temperature</span>
    <span class="p-2 h-8">Voltage</span>
    <span class="p-2 h-8">Cycle count</span>
    <span class="p-2 h-8">Current</span>
    <span class="p-2 h-8">Num cell</span>
    <span class="p-2 h-8">Capacity now</span>
    <span class="p-2 h-8">Capacity max</span>
</div>
<div class="flex flex-col mx-6">
    {{-- <span class="py-2 h-[30px] pr-8 pl-2">Gooth</span> --}}
    <span class="py-2 h-8 pr-8 pl-2 parameter-status" id="charge">-</span>
    <span class="py-2 h-8 pr-8 pl-2 grid place-content-center">
        <div class="w-24 h-5 border-2 rounded-full text-center font-bold soc-wrapper text-xs">
            <span parameter-statusn data-parameter-status="" data-parameter-title="battery" id="soc"
                class="">-</span>%
        </div>
    </span>
    <span class="py-2 h-8 pr-8 pl-2">
        <span parameter-statusn data-parameter-status="" data-parameter-title="battery" id="temperature">-</span>
        <span>°C</span>
    </span>
    <span class="py-2 h-8 pr-8 pl-2">
        <span parameter-statusn data-parameter-status="" data-parameter-title="battery" id="vol">-</span>
        <span>v</span>
    </span>
    <span class="py-2 h-8 pr-8 pl-2 parameter-status" data-parameter-status="" data-parameter-title="battery"
        id="cycle">-</span>
    <span class="py-2 h-8 pr-8 pl-2 parameter-status" data-parameter-status="" data-parameter-title="battery"
        id="current">-</span>
    <span class="py-2 h-8 pr-8 pl-2 parameter-status" data-parameter-status="" data-parameter-title="battery"
        id="num_cell">-</span>
    <span class="py-2 h-8 pr-8 pl-2 parameter-status" data-parameter-status="" data-parameter-title="battery"
        id="capacity_now">-</span>
    <span class="py-2 h-8 pr-8 pl-2 parameter-status" data-parameter-status="" data-parameter-title="battery"
        id="capacity_max">-</span>
</div>
