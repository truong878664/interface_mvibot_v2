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
<div class="function-form-item function-mission-tab relative hidden rounded-md bg-[#fff] p-4 pb-[60px]" data-type="sound">
    <div class="mb-4 flex flex-col">
        <label for="">Name function sound</label>
        <input class="input-reset name_function_sound valid-input w-[200px] px-4 py-1 " type="text" required />
    </div>

    @php $nameSound = ['buzzer1', 'buzzer2', 'basic', 'custom']; @endphp

    <div class="mt-8 flex">
        <ul class="sound-list w-full ">
            @for ($i = 0; $i < count($nameSound); $i++)
                <li data-number-sound="{{ $i + 1 }}"
                    class="sound-item mb-[2px] flex w-full cursor-pointer items-center justify-between rounded-md bg-stone-100 py-4 px-2 transition-all hover:scale-105 hover:bg-sky-300 hover:font-bold [&.active]:bg-sky-300 [&.active]:font-bold">
                    <span class="w-1/6 text-center">{{ $i + 1 }}</span>
                    <span class="w-4/6 text-left">
                        {{ $nameSound[$i] }}
                    </span>
                    <span class="btn w-1/6 text-center">
                        <i class="fa-solid fa-play"></i>
                    </span>
                </li>
            @endfor

            <li data-number-sound="0"
                class="sound-item mb-[2px] flex w-full cursor-pointer items-center justify-between rounded-md bg-stone-100 py-4 px-2 transition-all hover:scale-105 hover:bg-sky-300 hover:font-bold [&.active]:bg-sky-300 [&.active]:font-bold">
                <span class="w-1/6 text-center">{{ $i + 1 }}</span>
                <span class="w-4/6 text-left"> Sound OFF </span>
                <span class="btn w-1/6 text-center"> </span>
            </li>
        </ul>
    </div>
    @include('frontend.pages.missions.createMissionsV4.partials.function.tab.buttonSave', [
        'type' => 'sound',
    ])
</div>
