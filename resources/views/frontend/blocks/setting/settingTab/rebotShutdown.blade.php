<div class="setting-detail hidden">
    {{-- <div class="inline-block mr-6">
        @include('frontend.blocks.setting.selectRobot', ['tab' => 'reboot-shutdown'])
    </div> --}}
    <div
        class="mx-auto w-full max-w-[700px] mt-[50px] py-10 px-5 bg-[#F2EAE8] flex justify-between">
        <div class="">
            <button id="reboot-btn"
                class="px-4 py-2 bg-blue-500 text-[#fff] text-[16px] btn rounded-md opacity-80 hover:opacity-100">
                <span class="mr-2">Reboot</span>
                <i class="fa-solid fa-arrow-rotate-right"></i>
            </button>
            <button id="shutdown-btn"
                class="px-4 py-2 bg-red-500  text-[#fff] text-[16px] btn rounded-md opacity-80 hover:opacity-100">
                <span class="mr-2">Shutdown</span>
                <i class="fa-solid fa-power-off"></i>
            </button>
        </div>

        <button id="shutdown-btn"
            class="px-4 py-2 bg-sky-500  text-[#fff] text-[16px] btn rounded-md opacity-80 hover:opacity-100">
            <span class="mr-2">Reset defalt</span>
            <i class="fa-solid fa-rotate"></i>
        </button>
    </div>
</div>
