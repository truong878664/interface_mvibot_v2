<div class="setting-detail flex hidden h-full">
    <div class="max-w-[700px] w-full mx-auto overflow-auto">
        <label class="name-robot-active font-bold block text-center">robot1</label>
        <div class="w-full flex flex-col setting-param-item mt-4">
            <label class="text-2xl block mb-4">IP</label>
            <div class="flex mx-auto items-end relative">

                <div class="inline-flex items-center justify-center px-8 pb-8 border-stone-300 border bg-stone-200">
                    <div class="w-full">
                        <span class="text-2xl ">IP master</span>
                        <div class="w-full mb-10">
                            <input type="text"
                                class="mr-4 h-[34px] px-4 tracking-[0.7rem] text-2xl address-ip-master input-param"
                                name="ip_master" value="">
                            <button
                                class="px-4 py-2 bg-main hidden text-[#fff] text-2xl btn rounded-md opacity-80 hover:opacity-100 float-right set-ip-master-btn w-[130px]">
                                <span class="mr-2">Set IP master</span>
                            </button>
                        </div>
                        <span class="text-2xl">IP node</span>
                        <div class="w-full">
                            <input type="text"
                                class="mr-4 h-[34px] px-4 tracking-[0.7rem] text-2xl address-ip-node input-param"
                                name="ip_node" value="">
                            <button
                                class="px-4 py-2 bg-main hidden text-[#fff] text-2xl btn rounded-md opacity-80 hover:opacity-100 float-right set-ip-node-btn w-[130px]">
                                <span class="mr-2">Set IP node</span>
                            </button>
                        </div>
                    </div>
                </div>
                <button
                    class="px-4 py-1 bg-main text-[#fff] text-2xl btn rounded-md opacity-80 hover:opacity-100 ml-4 hidden save-para-btn absolute left-full">save</button>
            </div>
        </div>

        <hr class="my-4 border-stone-300">

        <div class="w-full flex flex-col setting-param-item mt-8 mode-setting">
            <label class="text-2xl block mb-4">MODE</label>
            <div class="flex mx-auto items-end relative">
                <div class="items-center inline-flex justify-center p-8 border-stone-300 border bg-stone-200">
                    <div class="flex rounded-sm overflow-hidden">
                        <div value="slam"
                            class="text-2xl px-4 h-[30px] leading-[30px] text-[#fff] opacity-60 cursor-pointer bg-main hover:opacity-80 mode-item">
                            slam</div>
                        <div value="navigation"
                            class="text-2xl px-4 h-[30px] leading-[30px]  text-[#fff] opacity-60 cursor-pointer bg-main hover:opacity-80 mode-item">
                            navigation</div>
                    </div>
                </div>
                <button
                    class="px-4 py-1 bg-main text-[#fff] text-2xl btn rounded-md opacity-80 hover:opacity-100 ml-4 hidden save-para-btn absolute left-full">save</button>
            </div>
        </div>

        <hr class="my-4 border-stone-300">

        <div class="w-full flex flex-col setting-param-item mt-8">
            <label class="text-2xl block mb-4">Volume</label>
            <div class="flex mx-auto items-end relative">
                <div class="items-center inline-flex justify-center p-8 border-stone-300 border bg-stone-200 w-[300px]">
                    <i class="fa-solid fa-volume-high mr-2 "></i>
                    <input id="default-range" type="range" value="1" min="0" max="100"
                        name="robot_volume"
                        class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700 input-param">
                    <span class="ml-2 text-2xl number-volume">50</span>
                </div>

                <button
                    class="px-4 py-1 bg-main text-[#fff] text-2xl btn rounded-md opacity-80 hover:opacity-100 ml-4 hidden save-para-btn absolute left-full">save</button>
            </div>
        </div>

        <hr class="my-4 border-stone-300">


        <div class="w-full flex flex-col setting-param-item mt-8">
            <label class="text-2xl block mb-4">Robot parameters</label>
            <div class="flex mx-auto items-end relative">

                <div class="inline-flex justify-center p-8 border-stone-300 border bg-stone-200 flex-col items-end">
                    <div class="flex items-center mb-4 para-item">
                        <label class="text-2xl mr-4 min-w-[100px] text-right">Robot Wmax</label>
                        <input type="number" name="robot_wmax"
                            class="w-[70px] rounded-md text-2xl h-[30px] px-4 text-center para-input robot_wmax_input input-param"
                            id="robot_wmax">
                        <button
                            class="w-[30px] h-[30px] border btn border-stone-400 ml-4 text-2xl rounded-lg bg-stone-300 para-robot-btn hidden robot_wmax-btn"
                            type="robot_wmax">
                            <i class="fa-solid fa-gear"></i>
                        </button>
                    </div>

                    <div class="flex items-center mb-4 para-item">
                        <label class="text-2xl mr-4 min-w-[100px] text-right">Robot Vmax</label>
                        <input type="number" name="robot_vmax"
                            class="w-[70px] rounded-md text-2xl h-[30px] px-4 text-center para-input robot_vmax_input input-param"
                            id="robot_vmax">
                        <button
                            class="w-[30px] h-[30px] border btn border-stone-400 ml-4 text-2xl rounded-lg bg-stone-300 para-robot-btn hidden robot_vmax-btn"
                            type="robot_vmax">
                            <i class="fa-solid fa-gear"></i>
                        </button>
                    </div>

                    <div class="flex items-center mb-4 para-item">
                        <label class="text-2xl mr-4 min-w-[100px] text-right">Robot AW</label>
                        <input type="number" name="robot_aw"
                            class="w-[70px] rounded-md text-2xl h-[30px] px-4 text-center para-input robot_aw_input input-param"
                            id="robot_aw">
                        <button
                            class="w-[30px] h-[30px] border btn border-stone-400 ml-4 text-2xl rounded-lg bg-stone-300 para-robot-btn hidden robot_aw-btn"
                            type="robot_aw">
                            <i class="fa-solid fa-gear"></i>
                        </button>
                    </div>

                    <div class="flex items-center mb-4 para-item">
                        <label class="text-2xl mr-4 min-w-[100px] text-right">Robot AX</label>
                        <input type="number"
                            class="w-[70px] rounded-md text-2xl h-[30px] px-4 text-center para-input robot_ax_input input-param"
                            name="robot_ax" id="robot_ax">
                        <button
                            class="w-[30px] h-[30px] border btn border-stone-400 ml-4 text-2xl rounded-lg bg-stone-300 para-robot-btn hidden robot_ax-btn"
                            type="robot_ax">
                            <i class="fa-solid fa-gear"></i>
                        </button>
                    </div>

                    <div class="flex items-center mb-4 para-item">
                        <label class="text-2xl mr-4 min-w-[100px] text-right">Robot Gear</label>
                        <input type="number"
                            class="w-[70px] rounded-md text-2xl h-[30px] px-4 text-center para-input robot_gear_input input-param"
                            name="robot_gear" id="robot_gear">
                        <button
                            class="w-[30px] h-[30px] border btn border-stone-400 ml-4 text-2xl rounded-lg bg-stone-300 para-robot-btn hidden robot_gear-btn"
                            type="robot_gear">
                            <i class="fa-solid fa-gear"></i>
                        </button>
                    </div>

                    <div class="flex items-center mb-4 para-item">
                        <label class="text-2xl mr-4 min-w-[100px] text-right">Robot L</label>
                        <input type="number"
                            class="w-[70px] rounded-md text-2xl h-[30px] px-4 text-center para-input robot_l_input input-param"
                            name="robot_L" id="robot_l">
                        <button
                            class="w-[30px] h-[30px] border btn border-stone-400 ml-4 text-2xl rounded-lg bg-stone-300 para-robot-btn hidden robot_l-btn"
                            type="robot_l">
                            <i class="fa-solid fa-gear"></i>
                        </button>
                    </div>

                    <div class="flex items-center mb-4 para-item">
                        <label class="text-2xl mr-4 min-w-[100px] text-right">Robot R</label>
                        <input type="number" name="robot_R"
                            class="w-[70px] rounded-md text-2xl h-[30px] px-4 text-center para-input robot_r_input input-param"
                            id="robot_r">
                        <button
                            class="w-[30px] h-[30px] border btn border-stone-400 ml-4 text-2xl rounded-lg bg-stone-300 para-robot-btn hidden robot_r-btn"
                            type="robot_r">
                            <i class="fa-solid fa-gear"></i>
                        </button>
                    </div>
                </div>
                <button
                    class="px-4 py-1 bg-main text-[#fff] text-2xl btn rounded-md opacity-80 hover:opacity-100 ml-4 hidden save-para-btn absolute left-full">save</button>
            </div>
        </div>

        <hr class="my-4 border-stone-300">

        <div class="w-full flex flex-col setting-param-item mt-8">
            <label class="text-2xl block mb-4">Camera</label>
            <div
                class="items-center mx-auto inline-flex justify-center p-8 border-stone-300 border bg-stone-200 flex-col">
                <div class="w-full">
                    <div class="">
                        <span class="text-2xl">camera 1</span>
                        <div class="w-full h-[30px] bg-contain" style="background-image: url(/img/barcode.png)">
                        </div>
                        <input class="block text-center text-2xl bg-transparent" readonly name="serial_camera1"
                            value="12-83-21301243030" />
                    </div>

                    <div class="">
                        <span class="text-2xl">camera 2</span>
                        <div class="w-full h-[30px] bg-contain" style="background-image: url(/img/barcode.png)">
                        </div>
                        <input class="block text-center text-2xl bg-transparent" readonly name="serial_camera2"
                            value="12-83-2130124311" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<style>
    .mode-item.active {
        opacity: 1;
    }
</style>
