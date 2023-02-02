<div class="setting-detail flex">
    <div class="max-w-[700px] w-full mx-auto max-h-[calc(100vh_-_110px)] overflow-auto">
        <label class="name-robot-active font-bold block text-center">robot1</label>
        <hr />
        <div class="w-full mt-4">
            <div class="w-full flex flex-col">
                <label class="text-3xl block mb-4">MODE</label>
                <div class="items-center mx-auto inline-flex justify-center p-8 border-stone-300 border bg-stone-200">
                    <div class="flex rounded-sm overflow-hidden">
                        <div value="slam"
                            class="text-3xl px-4 h-[30px] leading-[30px] text-[#fff] opacity-60 cursor-pointer bg-main hover:opacity-80 mode-item">
                            slam</div>
                        <div value="navigation"
                            class="text-3xl px-4 h-[30px] leading-[30px]  text-[#fff] opacity-60 cursor-pointer bg-main hover:opacity-80 mode-item">
                            navigation</div>
                    </div>
                </div>
            </div>
        </div>

        <div class="w-full mt-8">
            <div class="w-full flex flex-col">
                <label class="text-3xl block mb-4">Robot parameters</label>
                <div
                    class="items-center mx-auto inline-flex justify-center p-8 border-stone-300 border bg-stone-200 flex-col">
                    <div class="flex items-center mb-4 para-item">
                        <label class="text-2xl mr-4 min-w-[100px] text-right">Robot Wmax</label>
                        <input type="text" class="w-[70px] rounded-md text-2xl h-[30px] px-4 text-center para-input">
                        <button
                            class="w-[30px] h-[30px] border btn border-stone-400 ml-4 text-2xl rounded-lg bg-stone-300 para-robot-btn hidden">
                            <i class="fa-solid fa-gear"></i>
                        </button>
                    </div>

                    <div class="flex items-center mb-4 para-item">
                        <label class="text-2xl mr-4 min-w-[100px] text-right">Robot Vmax</label>
                        <input type="text" class="w-[70px] rounded-md text-2xl h-[30px] px-4 text-center para-input">
                        <button
                            class="w-[30px] h-[30px] border btn border-stone-400 ml-4 text-2xl rounded-lg bg-stone-300 para-robot-btn hidden">
                            <i class="fa-solid fa-gear"></i>
                        </button>
                    </div>

                    <div class="flex items-center mb-4 para-item">
                        <label class="text-2xl mr-4 min-w-[100px] text-right">Robot AW</label>
                        <input type="text" class="w-[70px] rounded-md text-2xl h-[30px] px-4 text-center para-input">
                        <button
                            class="w-[30px] h-[30px] border btn border-stone-400 ml-4 text-2xl rounded-lg bg-stone-300 para-robot-btn hidden">
                            <i class="fa-solid fa-gear"></i>
                        </button>
                    </div>

                    <div class="flex items-center mb-4 para-item">
                        <label class="text-2xl mr-4 min-w-[100px] text-right">Robot AX</label>
                        <input type="text" class="w-[70px] rounded-md text-2xl h-[30px] px-4 text-center para-input">
                        <button
                            class="w-[30px] h-[30px] border btn border-stone-400 ml-4 text-2xl rounded-lg bg-stone-300 para-robot-btn hidden">
                            <i class="fa-solid fa-gear"></i>
                        </button>
                    </div>

                    <div class="flex items-center mb-4 para-item">
                        <label class="text-2xl mr-4 min-w-[100px] text-right">Robot Gear</label>
                        <input type="text" class="w-[70px] rounded-md text-2xl h-[30px] px-4 text-center para-input">
                        <button
                            class="w-[30px] h-[30px] border btn border-stone-400 ml-4 text-2xl rounded-lg bg-stone-300 para-robot-btn hidden">
                            <i class="fa-solid fa-gear"></i>
                        </button>
                    </div>

                    <div class="flex items-center mb-4 para-item">
                        <label class="text-2xl mr-4 min-w-[100px] text-right">Robot L</label>
                        <input type="text" class="w-[70px] rounded-md text-2xl h-[30px] px-4 text-center para-input">
                        <button
                            class="w-[30px] h-[30px] border btn border-stone-400 ml-4 text-2xl rounded-lg bg-stone-300 para-robot-btn hidden">
                            <i class="fa-solid fa-gear"></i>
                        </button>
                    </div>

                    <div class="flex items-center mb-4 para-item">
                        <label class="text-2xl mr-4 min-w-[100px] text-right">Robot R</label>
                        <input type="text" class="w-[70px] rounded-md text-2xl h-[30px] px-4 text-center para-input">
                        <button
                            class="w-[30px] h-[30px] border btn border-stone-400 ml-4 text-2xl rounded-lg bg-stone-300 para-robot-btn hidden">
                            <i class="fa-solid fa-gear"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>


        <div class="w-full mt-8">
            <div class="w-full flex flex-col">
                <label class="text-3xl block mb-4">Camera</label>
                <div
                    class="items-center mx-auto inline-flex justify-center p-8 border-stone-300 border bg-stone-200 flex-col">
                    <div class="w-full">
                        <div class="">
                            <span class="text-2xl">camera 1</span>
                            <div class="w-full h-[30px] bg-contain" style="background-image: url(/img/barcode.png)">
                            </div>
                            <span class="block text-center">12-83-21301243030</span>
                        </div>

                        <div class="">
                            <span class="text-2xl">camera 2</span>
                            <div class="w-full h-[30px] bg-contain" style="background-image: url(/img/barcode.png)">
                            </div>
                            <span class="block text-center">12-83-2130124311</span>
                        </div>
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
