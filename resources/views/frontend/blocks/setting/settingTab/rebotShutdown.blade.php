<div class="setting-detail hidden">
    {{-- <div class="inline-block mr-6">
        @include('frontend.blocks.setting.selectRobot', ['tab' => 'reboot-shutdown'])
    </div> --}}
    <div class="mx-auto w-full max-w-[700px] mt-[50px] py-10 px-5 border-stone-300 border bg-stone-200">

        <button id="reboot-btn"
            class="px-4 py-2 bg-blue-500 text-[#fff] text-[16px] btn rounded-md opacity-80 hover:opacity-100">
            <span class="mr-2">Reboot</span>
            <i class="fa-solid fa-rotate"></i>
        </button>
        <button id="shutdown-btn"
            class="px-4 py-2 bg-red-500  text-[#fff] text-[16px] btn rounded-md opacity-80 hover:opacity-100">
            <span class="mr-2">Shutdown</span>
            <i class="fa-solid fa-power-off"></i>
        </button>
    </div>
</div>
