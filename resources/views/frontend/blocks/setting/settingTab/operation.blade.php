<div class="setting-detail flex flex-col hidden h-full">
    <div class="max-w-[700px] w-full mx-auto overflow-auto bg-[#F2EAE8] rounded-md">
        @include('frontend.blocks.setting.settingTab.saveButton', ['setting'=> 'operation'])
        {{-- MODE --}}
        <div class="mx-8 my-6 flex justify-between text-2xl">
            <span class="font-bold min-w-[70px]">Mode</span>
            <div class="flex w-[170px] items-center justify-end">
                <input type="radio" class="peer/slam input-mode" name="mode-value" id="slam" value="slam" hidden>
                <label
                    class="peer-checked/slam:bg-gray-400 cursor-pointer hover:bg-gray-200 peer-checked/slam:font-bold peer-checked/slam:text-[#fff] px-4 border py-1 text-center border-r-0 border-gray-400"
                    for="slam">Slam</label>

                <input type="radio" class="peer/navigation input-mode" name="mode-value" id="navigation" value="navigation" hidden>
                <label
                    class="peer-checked/navigation:bg-gray-400 cursor-pointer hover:bg-gray-200 peer-checked/navigation:font-bold peer-checked/navigation:text-[#fff] px-4 border py-1 text-center border-l-0 border-gray-400"
                    for="navigation">Navigation</label>
            </div>
        </div>

        {{-- IS MASTER --}}
        <div data-ismaster="hidden" class="mx-8 mt-16 my-6 flex justify-between text-2xl peer/iswrapper">
            <span class="font-bold min-w-[70px]">Is master</span>
            <label class="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" value="" class="sr-only peer/ismaster" id="is-master">
                <div
                    class="w-11 h-[16px] bg-gray-200 peer-focus/ismaster:outline-none peer-focus/ismaster:ring-2 peer-focus/ismaster:ring-blue-300 dark:peer-focus/ismaster:ring-blue-600 rounded-full peer dark:bg-gray-300 peer-checked/ismaster:after:translate-x-full peer-checked/ismaster:after:border-white after:content-[''] after:absolute after:top-1/2 after:left-[2px] after:-translate-y-1/2 after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-300 peer-checked/ismaster:bg-blue-600">
                </div>
            </label>
        </div>

        {{-- IP MASTER --}}
        <div
            class="mx-8 my-6 justify-between text-2xl ip-master-wrapper flex peer-data-[ismaster=hidden]/iswrapper:hidden">
            <span class="font-bold">Ip master</span>
            <div class="border inline-block py-2 px-1 rounded-md bg-stone-200">
                <input class="w-[50px] text-center border-none bg-transparent ip-master-partial ip-partial"
                    data-ip="master" type="number">
                <span>.</span>
                <input class="w-[50px] text-center border-none bg-transparent ip-master-partial ip-partial"
                    data-ip="master" type="number">
                <span>.</span>
                <input class="w-[50px] text-center border-none bg-transparent ip-master-partial ip-partial"
                    data-ip="master" type="number">
                <span>.</span>
                <input class="w-[50px] text-center border-none bg-transparent ip-master-partial ip-partial"
                    data-ip="master" type="number">
            </div>
        </div>

        {{-- IP NODE --}}
        <div class="mx-8 my-6 flex justify-between text-2xl hidden">
            <span class="font-bold">Ip node</span>
            <div class="bg-[#ffffffab] inline-block py-2 px-1 rounded-md">
                <input class="w-[50px] text-center border-none bg-transparent ip-node-partial ip-partial" data-ip="node"
                    type="number">
                <span>.</span>
                <input class="w-[50px] text-center border-none bg-transparent ip-node-partial ip-partial" data-ip="node"
                    type="number">
                <span>.</span>
                <input class="w-[50px] text-center border-none bg-transparent ip-node-partial ip-partial" data-ip="node"
                    type="number">
                <span>.</span>
                <input class="w-[50px] text-center border-none bg-transparent ip-node-partial ip-partial" data-ip="node"
                    type="number">
            </div>
        </div>
    </div>

    <script>
        const checkboxIsMaster = document.querySelector('#is-master');
        checkboxIsMaster.onchange = (e) => {
            const isMaster = e.target.checked;
            document.querySelector('[data-ismaster]').dataset.ismaster = isMaster ? 'show' : 'hidden';
        }
    </script>

</div>
