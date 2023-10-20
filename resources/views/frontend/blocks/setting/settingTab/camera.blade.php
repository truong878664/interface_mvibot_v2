<div class="setting-detail flex flex-col hidden h-full">
    <div class="max-w-[700px] w-full mx-auto overflow-auto">
        <div class="w-3/4 mx-auto min-w-[300px] text-2xl overflow-hidden py-4 rounded-md px-10">
            <div class="w-full flex flex-col setting-param-item mt-8 bg-[#F2EAE8] p-4 rounded-md relative">
                @include('frontend.blocks.setting.settingTab.saveButton', ['setting' => 'camera'])
                <div class="w-full flex justify-between">
                    <label class="text-2xl block font-bold">Camera</label>
                    <button data-edit-camera="0"
                        class="text-[#b1b1b1] btn edit-camera-btn bg-gray-300 rounded-full w-[30px] h-[30px] flex justify-center items-center data-[edit-camera='1']:bg-gray-400 data-[edit-camera='1']:text-[#fff]"><i
                            class="fa-solid fa-pen"></i></button>
                </div>
                <div class="items-center mx-auto inline-flex justify-center p-8 flex-col">
                    <div class="mb-12">
                        <span class="text-2xl">Serial camera 1</span>
                        <div class="w-full h-[30px] bg-contain" style="background-image: url(/img/barcode.png)">
                        </div>
                        <input
                            class="block text-center text-2xl bg-transparent input-serial-camera rounded-md border-2 border-orange-600 mt-2 read-only:border-none"
                            readonly name="serial_camera1" value="" />
                    </div>

                    <div class="">
                        <span class="text-2xl">Serial camera 2</span>
                        <div class="w-full h-[30px] bg-contain" style="background-image: url(/img/barcode.png)">
                        </div>
                        <input
                            class="block text-center text-2xl bg-transparent input-serial-camera rounded-md border-2 border-orange-600 mt-2 read-only:border-none"
                            readonly name="serial_camera2" value="" />
                    </div>
                </div>
            </div>

        </div>
    </div>
</div>
