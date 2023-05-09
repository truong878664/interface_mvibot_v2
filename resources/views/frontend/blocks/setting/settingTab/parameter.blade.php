<div class="setting-detail flex flex-col hidden h-full">

    <div class="max-w-[700px] w-full mx-auto overflow-auto bg-[#F2EAE8] rounded-md">
        <div class="w-full flex flex-col text-xl px-8 py-4">
            <div class="flex flex-col my-6">
                <span class="font-bold">Robot Wmax</span>
                <div class="">
                    <button data-math="minus" data-parameter="robot_wmax" class="w-[24px] h-[24px] btn bg-stone-300 math-parameter-btn"><i class="fa-solid fa-minus"></i></button>
                    <input class="max-w-[70px] text-center mt-4 bg-[rgba(255,255,255,0.5)] px-4 py-1 parameter-item" name="robot_wmax" type="number">
                    <button data-math="plus"  data-parameter="robot_wmax" class="w-[24px] h-[24px] btn bg-stone-300 math-parameter-btn"><i class="fa-solid fa-plus"></i></button>
                </div>


            </div>

            <div class="flex flex-col my-6">
                <span class="font-bold">Robot Vmax</span>
                <div class="">
                    <button data-math="minus" data-parameter="robot_vmax" class="w-[24px] h-[24px] btn bg-stone-300 math-parameter-btn"><i class="fa-solid fa-minus"></i></button>
                    <input class="max-w-[70px] text-center mt-4 bg-[rgba(255,255,255,0.5)] px-4 py-1 parameter-item" name="robot_vmax" type="number">
                    <button data-math="plus"  data-parameter="robot_vmax" class="w-[24px] h-[24px] btn bg-stone-300 math-parameter-btn"><i class="fa-solid fa-plus"></i></button>
                </div>
            </div>

            <div class="flex flex-col my-6">
                <span class="font-bold">Robot AW</span>
                <div class="">
                    <button data-math="minus" data-parameter="robot_aw" class="w-[24px] h-[24px] btn bg-stone-300 math-parameter-btn"><i class="fa-solid fa-minus"></i></button>
                    <input class="max-w-[70px] text-center mt-4 bg-[rgba(255,255,255,0.5)] px-4 py-1 parameter-item" name="robot_aw" type="number">
                    <button data-math="plus" data-parameter="robot_aw"  class="w-[24px] h-[24px] btn bg-stone-300 math-parameter-btn"><i class="fa-solid fa-plus"></i></button>
                </div>

            </div>

            <div class="flex flex-col my-6">
                <span class="font-bold">Robot AX</span>
                <div class="">
                    <button data-math="minus" data-parameter="robot_ax" class="w-[24px] h-[24px] btn bg-stone-300 math-parameter-btn"><i class="fa-solid fa-minus"></i></button>
                    <input class="max-w-[70px] text-center mt-4 bg-[rgba(255,255,255,0.5)] px-4 py-1 parameter-item" name="robot_ax" type="number">
                    <button data-math="plus" data-parameter="robot_ax"  class="w-[24px] h-[24px] btn bg-stone-300 math-parameter-btn"><i class="fa-solid fa-plus"></i></button>
                </div>

            </div>

            <div class="flex flex-col my-6">
                <span class="font-bold">Robot Gear</span>
                <div class="">
                    <button data-math="minus" data-parameter="robot_gear" class="w-[24px] h-[24px] btn bg-stone-300 math-parameter-btn"><i class="fa-solid fa-minus"></i></button>
                    <input class="max-w-[70px] text-center mt-4 bg-[rgba(255,255,255,0.5)] px-4 py-1 parameter-item" name="robot_gear" type="number">
                    <button data-math="plus"  data-parameter="robot_gear" class="w-[24px] h-[24px] btn bg-stone-300 math-parameter-btn"><i class="fa-solid fa-plus"></i></button>
                </div>

            </div>

            <div class="flex flex-col my-6">
                <span class="font-bold">Robot L</span>
                <div class="">
                    <button data-math="minus" data-parameter="robot_L" class="w-[24px] h-[24px] btn bg-stone-300 math-parameter-btn"><i class="fa-solid fa-minus"></i></button>
                    <input class="max-w-[70px] text-center mt-4 bg-[rgba(255,255,255,0.5)] px-4 py-1 parameter-item" name="robot_L" type="number">
                    <button data-math="plus" data-parameter="robot_L"  class="w-[24px] h-[24px] btn bg-stone-300 math-parameter-btn"><i class="fa-solid fa-plus"></i></button>
                </div>

            </div>

            <div class="flex flex-col my-6">
                <span class="font-bold">Robot R</span>
                <div class="">
                    <button data-math="minus" data-parameter="robot_R" class="w-[24px] h-[24px] btn bg-stone-300 math-parameter-btn"><i class="fa-solid fa-minus"></i></button>
                    <input class="max-w-[70px] text-center mt-4 bg-[rgba(255,255,255,0.5)] px-4 py-1 parameter-item" name="robot_R" type="number">
                    <button data-math="plus" data-parameter="robot_R"  class="w-[24px] h-[24px] btn bg-stone-300 math-parameter-btn"><i class="fa-solid fa-plus"></i></button>
                </div>

            </div>

        </div>
        <button
            class="float-right m-4 px-6 py-2 bg-main text-[#fff] text-[16px] btn rounded-md opacity-80 hover:opacity-100 add-parameter-btn">Save</button>
    </div>
</div>
<style>
    .mode-item.active {
        opacity: 1;
    }
</style>

<div class="flex mx-auto items-end relative hidden">

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
