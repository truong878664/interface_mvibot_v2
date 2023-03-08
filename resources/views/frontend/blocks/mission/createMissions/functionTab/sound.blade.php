<div class="hidden function-item">
    <div class="flex flex-col mb-4">
        <label for="" class="text-xl">Name function sound</label>
        <input class="w-[200px] text-xl px-4 py-1  input-reset name_function_sound valid-input" type="text" required>
    </div>

    <div class="flex ml-4 mt-8">
        <div class="relative">
            <button
                class="btn rounded-md relative flex items-center text-2xl px-4 py-1 ml-1 mr-8 bg-green-500 opacity-30  text-[#fff] hover:opacity-90 sound-btn sound-start-btn active"
                type='start' value="1" data-mode="basic" style="--color: rgb(56 189 248);">Start</button>

            <ul class="absolute top-full text-2xl w-full mt-2 hidden mode-sound">
                <li class="mt-1 flex justify-between pl-4 pr-2 text-center rounded-md bg-red-400 btn mode-music-btn"
                    mode="buzzer1" value="1">
                    <span class="pointer-events-none">buzzer1</span>
                    <i class="fa-solid fa-music text-sm"></i>
                </li>
                <li class="mt-1 flex justify-between pl-4 pr-2 text-center rounded-md bg-red-400 btn mode-music-btn"
                    mode="buzzer2" value="2">
                    <span class="pointer-events-none">buzzer2</span>
                    <i class="fa-solid fa-music text-sm"></i>
                </li>
                <li class="mt-1 flex justify-between pl-4 pr-2 text-center rounded-md bg-sky-400 btn mode-music-btn"
                    mode="basic" value="3">
                    <span class="pointer-events-none">basic</span>
                    <i class="fa-solid fa-music text-sm"></i>
                </li>
                <li class="mt-1 flex justify-between pl-4 pr-2 text-center rounded-md bg-yellow-400  btn mode-music-btn"
                    mode="custom" value="4">
                    <span class="pointer-events-none">custom</span>
                    <i class="fa-solid fa-music text-sm"></i>
                </li>
            </ul>

        </div>

        <button
            class="btn rounded-md flex items-center text-2xl px-4 py-1 mx-1  bg-red-500 text-[#fff] opacity-30 hover:opacity-90 sound-btn sound-stop-btn"
            type='stop' value="0">Stop</button>
    </div>
    @include('frontend.blocks.mission.createMissions.functionTab.buttonSave', ['type' => 'sound'])

</div>
<style>
    .sound-btn.active {
        opacity: 1;
        font-weight: 700;
    }

    .sound-start-btn::after {
        content: attr(data-mode);
        position: absolute;
        bottom: 0;
        right: 0;
        font-size: 10px;
        background-color: #fff;
        color: var(--color);
        border-radius: 4px;
        transform: translateX(50%) translateY(50%);
        padding: 0 4px;
        border: solid 1px var(--color);
        font-weight: 400;
    }
</style>
