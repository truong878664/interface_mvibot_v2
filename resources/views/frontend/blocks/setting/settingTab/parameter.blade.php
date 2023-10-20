@php
    $titleParameters = ['Robot Wmax', 'Robot Vmax', 'Robot AW', 'Robot AX', 'Robot Gear', 'Robot L', 'Robot R', 'Robot R'];
    $parameters = ['robot_wmax', 'robot_vmax', 'robot_aw', 'robot_ax', 'robot_gear', 'robot_L', 'robot_R'];
@endphp
<style>
    input[type="range"]::-webkit-slider-thumb {
        width: 30px;
        -webkit-appearance: none;
        appearance: none;
        height: 15px;
        border-radius: 5px;
        cursor: ew-resize;
        background: #FFF;
        position: relative;
    }
</style>

<div class="setting-detail flex flex-col hidden h-full">
    <div class="max-w-[700px] w-full mx-auto overflow-auto bg-[#F2EAE8] rounded-md">
        <div class="w-full flex flex-col text-xl px-8 py-4">

            @include('frontend.blocks.setting.settingTab.saveButton', ['setting' => 'parameter'])

            {{-- SOUND --}}
            <div class="flex flex-co items-center my-6 justify-between">
                <span class="font-bold min-w-[70px]">Robot volume</span>
                <div class="flex justify-end items-center">
                    <div class="flex justify-between items-center">
                        <div data-volume="low-vl" class="group/volumn text-start w-[18px]">
                            <i class="fa-solid fa-volume-xmark hidden group-data-[volume=off-vl]/volumn:block"></i>
                            <i class="fa-solid fa-volume-off hidden group-data-[volume=low-vl]/volumn:block"></i>
                            <i class="fa-solid fa-volume-low hidden group-data-[volume=medium-vl]/volumn:block"></i>
                            <i class="fa-solid fa-volume-high hidden group-data-[volume=high-vl]/volumn:block"></i>
                        </div>
                        <div class="text-2xl ml-4 text-center mr-4 min-w-[24px] value-volume">20</div>
                    </div>
                    <input type="range" class="w-[250px] rounded-lg appearance-none bg-gray-400 h-4 input-volume"
                        name="robot_volume" id="" min="0" max="150">
                </div>
            </div>
            {{-- PARAMETER --}}
            @foreach ($parameters as $index => $parameter)
                <div class="flex flex-co items-center my-6 justify-between">
                    <span class="font-bold min-w-[70px]">{{ $titleParameters[$index] }}</span>
                    <div class="">
                        @include('frontend.blocks.setting.settingTab.buttonParameter', [
                            'parameter' => $parameter,
                        ])
                    </div>
                </div>
            @endforeach

            {{-- LOW BATTERY --}}
            <div class="flex flex-co items-center my-6 justify-between">
                <span class="font-bold min-w-[70px]">Robot low battery</span>
                <div class="flex items-center">
                    <span class="mr-4 value-low-battery">1</span>
                    <input type="range" class="w-[250px] rounded-lg appearance-none bg-gray-400 h-4 input-low-battery"
                        name="robot_low_battery" id="">
                </div>
            </div>

            {{-- TYPE CONNECT --}}
            <div class="flex flex-co items-center my-6 justify-between">
                <span class="font-bold min-w-[70px]">Robot type connect</span>
                <div class="flex w-[170px] items-center justify-center">
                    <input type="radio" class="peer/lan" name="robot_type_connect" id="lan" value="lan"
                        hidden>
                    <label
                        class="peer-checked/lan:bg-gray-400 cursor-pointer hover:bg-gray-200 peer-checked/lan:text-[#fff] px-4 border py-1 w-[70px] text-center border-r-0 border-gray-400"
                        for="lan">LAN</label>

                    <input type="radio" class="peer/wifi" name="robot_type_connect" id="wifi" value="wifi"
                        hidden>
                    <label
                        class="peer-checked/wifi:bg-gray-400 cursor-pointer hover:bg-gray-200 peer-checked/wifi:text-[#fff] px-4 border py-1 w-[70px] text-center border-l-0 border-gray-400"
                        for="wifi">Wifi</label>
                </div>
            </div>
            {{-- robot_type_connect --}}
        </div>

    </div>
</div>
