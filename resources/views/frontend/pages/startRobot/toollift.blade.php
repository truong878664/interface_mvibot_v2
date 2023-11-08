<div class="rounded-md flex flex-col bg-gray-50 shadow-sm p-4">
    <div class="">
        <span class="font-bold">Tool lift ROBOT</span>
    </div>
    <div class="flex flex-col flex-1">
        <div class="">
            @include('frontend.blocks.selectRobot', [
                'type' => 'robot_navigation',
                'id' => 'robot-tool-lift',
            ])
        </div>
        <div class=" flex-1 grid place-content-center">
            <div class="text-white text-xl ml-3 mt-5 flex gap-[50px] justify-center">
                <button data-type-button="upToolLift"
                    class="bg-main p-7 shadow-light shadow-main/20 btn font-bold rounded-full">
                    Nâng tool lift
                </button>
                <button data-type-button="downToolLift"
                    class="bg-green-500 p-7 shadow-light shadow-green-500/10 btn font-bold rounded-full">Hạ
                    tool
                    lif</button>
            </div>
        </div>
    </div>
</div>
