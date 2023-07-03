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
<div class="hidden function-item function-mission-tab rounded-md bg-[#fff] p-4 pb-[60px] relative" data-type="sound">
    <div class="flex flex-col mb-4">
        <label for="" class="text-xl">Name function sound</label>
        <input class="w-[200px] text-xl px-4 py-1  input-reset name_function_sound valid-input" type="text" required>
    </div>

    @php
        $nameSound = ['buzzer1', 'buzzer2', 'basic', 'custom'];
    @endphp

    <div class="flex mt-8">
        <ul class="text-xl w-full sound-list">
            @for ($i = 0; $i < count($nameSound); $i++)
                <li data-number-sound="{{$i + 1}}"
                    class="flex w-full justify-between items-center py-4 bg-stone-100 rounded-md px-2 hover:bg-sky-300 hover:scale-105 hover:font-bold transition-all [&.active]:bg-sky-300 [&.active]:font-bold mb-[2px] cursor-pointer sound-item">
                    <span class="w-1/6 text-center">{{ $i + 1 }}</span>
                    <span class="text-left w-4/6">
                        {{$nameSound[$i]}}
                    </span>
                    <span class="w-1/6 btn text-center">
                        <i class="fa-solid fa-play"></i>
                    </span>
                </li>
            @endfor

            <li  data-number-sound="0"
                class="flex w-full justify-between items-center py-4 bg-stone-100 rounded-md px-2 hover:bg-sky-300 hover:scale-105 hover:font-bold transition-all [&.active]:bg-sky-300 [&.active]:font-bold mb-[2px] cursor-pointer sound-item">
                <span class="w-1/6 text-center">{{ $i + 1 }}</span>
                <span class="text-left w-4/6">
                    Sound OFF
                </span>
                <span class="w-1/6 btn text-center">
                </span>
            </li>
        </ul>
    </div>
    @include('frontend.pages.missions.createMissionsV4.partials.function.tab.buttonSave', ['type' => 'sound'])

</div>
