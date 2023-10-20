<div class="flex flex-col">
    {{-- <span class="py-2 h-[30px] font-bold text-2xl px-2 text-right">Health</span> --}}
    <span class="py-2 h-[30px] font-bold text-2xl px-2 text-right">Charging</span>
    <span class="py-2 h-[30px] font-bold text-2xl px-2 text-right">Level</span>
    <span class="py-2 h-[30px] font-bold text-2xl px-2 text-right">Temperature</span>
    <span class="py-2 h-[30px] font-bold text-2xl px-2 text-right">Voltage</span>
    <span class="py-2 h-[30px] font-bold text-2xl px-2 text-right">Cycle count</span>
    <span class="py-2 h-[30px] font-bold text-2xl px-2 text-right">Current</span>
    <span class="py-2 h-[30px] font-bold text-2xl px-2 text-right">Num cell</span>
    <span class="py-2 h-[30px] font-bold text-2xl px-2 text-right">Capacity now</span>
    <span class="py-2 h-[30px] font-bold text-2xl px-2 text-right">Capacity max</span>
</div>
<div class="flex flex-col mx-6">
    {{-- <span class="py-2 h-[30px] text-2xl pr-8 pl-2">Gooth</span> --}}
    <span class="py-2 h-[30px] text-2xl pr-8 pl-2 parameter-status" id="charge">-</span>
    <span class="py-2 h-[30px] text-2xl pr-8 pl-2">
        <div class="w-[120px] h-[20px] border-[2px] rounded-full  text-center font-bold text-xl soc-wrapper">
            <span parameter-statusn data-parameter-status="" data-parameter-title="battery" id="soc">-</span>%
        </div>
    </span>
    <span class="py-2 h-[30px] text-2xl pr-8 pl-2">
        <span parameter-statusn data-parameter-status="" data-parameter-title="battery" id="temperature">-</span>
        <span>°C</span>
    </span>
    <span class="py-2 h-[30px] text-2xl pr-8 pl-2">
        <span parameter-statusn data-parameter-status="" data-parameter-title="battery" id="vol">-</span>
        <span>v</span>
    </span>
    <span class="py-2 h-[30px] text-2xl pr-8 pl-2 parameter-status" data-parameter-status=""
        data-parameter-title="battery" id="cycle">-</span>
    <span class="py-2 h-[30px] text-2xl pr-8 pl-2 parameter-status" data-parameter-status=""
        data-parameter-title="battery" id="current">-</span>
    <span class="py-2 h-[30px] text-2xl pr-8 pl-2 parameter-status" data-parameter-status=""
        data-parameter-title="battery" id="num_cell">-</span>
    <span class="py-2 h-[30px] text-2xl pr-8 pl-2 parameter-status" data-parameter-status=""
        data-parameter-title="battery" id="capacity_now">-</span>
    <span class="py-2 h-[30px] text-2xl pr-8 pl-2 parameter-status" data-parameter-status=""
        data-parameter-title="battery" id="capacity_max">-</span>
</div>
