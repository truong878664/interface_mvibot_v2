@php
    $json = '[{"type":"normal","data":{"normal":["footprint#HS_123#1","marker#HS_111#1","gpio_module#JS_123#2","gpio#HB_999#23"]}},{"type":"while","data":{"condition":[{"type":"logicAnd","data":{"logicA":["gpio_module#name#2","gpio_module#name#2"],"logicB":["gpio_module#name#2","gpio_module#name#2"]}},{"type":"logicOr","data":{"logicA":["gpio_module#name#2","gpio_module#name#2"],"logicB":["gpio_module#name#2","gpio_module#name#2"]}}],"do_":["gpio_module#name#2","gpio_module#name#2"]}}]';
@endphp
@extends('frontend.layouts.mainLayout') @section('content')
    <div class="fixed top-0 left-0 right-0 bottom-0 z-10 grid place-content-center bg-white" id="loading-mission">
        <span class="loader-mission"></span>
    </div>
    <div class="relative h-[calc(100%_-_10px)] w-full lg:m-2 lg:w-[calc(100%_-_10px)] lg:p-1">
        {{-- action history --}}
        <div class="absolute top-0 z-[1]" id="action-history">
            <button data-action-history="undo" class="btn h-7 w-7 rounded-md border border-stone-400 bg-white px-2">
                <svg width="100%" height="100%" viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M465.344 341.843C465.344 255 406.72 195.281 307.188 195.281H169.375L118.625 197.469L157.125 164.875L213.563 109.969C217.719 105.813 220.563 100.563 220.563 93.3438C220.563 80.0001 211.156 70.1562 196.938 70.1562C191.031 70.1562 184.469 73.0001 179.656 77.5937L54.0938 201.406C49.0625 206 46.4375 212.563 46.4375 219.125C46.4375 225.687 49.0625 232.031 54.0938 236.844L179.656 360.656C184.469 365.251 191.031 368.093 196.938 368.093C211.156 368.093 220.563 358.25 220.563 344.688C220.563 337.686 217.719 332.438 213.563 328.064L157.125 273.156L118.625 240.781L169.375 242.969H308.719C379.155 242.969 417.875 283 417.875 339.875C417.875 396.97 379.155 438.749 308.719 438.749H257.75C243.313 438.749 233.469 449.469 233.469 462.813C233.469 475.936 243.531 486.656 257.75 486.656H310.25C408.032 486.656 465.344 429.126 465.344 341.843Z"
                        fill="black" fill-opacity="0.81" />
                </svg>
            </button>
            <button data-action-history="redo" class="btn h-7 w-7 rounded-md border border-stone-400 bg-white px-2">
                <svg width="100%" height="100%" viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M46.4377 341.843C46.4377 255 105.062 195.281 204.594 195.281H342.407L393.157 197.469L354.657 164.875L298.219 109.969C294.063 105.813 291.219 100.563 291.219 93.3438C291.219 80.0001 300.626 70.1562 314.844 70.1562C320.75 70.1562 327.313 73.0001 332.125 77.5937L457.688 201.406C462.719 206 465.344 212.563 465.344 219.125C465.344 225.687 462.719 232.031 457.688 236.844L332.125 360.656C327.313 365.251 320.75 368.093 314.844 368.093C300.626 368.093 291.219 358.25 291.219 344.688C291.219 337.686 294.063 332.438 298.219 328.064L354.657 273.156L393.157 240.781L342.407 242.969H203.063C132.626 242.969 93.9065 283 93.9065 339.875C93.9065 396.97 132.626 438.749 203.063 438.749H254.032C268.469 438.749 278.313 449.469 278.313 462.813C278.313 475.936 268.25 486.656 254.032 486.656H201.532C103.75 486.656 46.4377 429.126 46.4377 341.843Z"
                        fill="black" fill-opacity="0.81" />
                </svg>
            </button>
        </div>
        {{-- end action history --}}
        <div class="h-full w-full">
            <input class="" id="id-mission" value="{{ $itemRender->id }}" hidden />
            <input class="" id="type-mission" value="{{ $itemRender->type }}" hidden />

            <div class="relative flex h-full w-full">
                <input type="checkbox" class="peer/step-wrapper" id="step-wrapper" hidden />
                <div class="relative h-full w-full pr-2 transition-all md:peer-checked/step-wrapper:w-3/4">
                    <div id="block-step-wrapper"
                        class="inline-flex h-full w-full flex-wrap content-start items-start gap-2 overflow-y-auto pb-72 pt-4">
                        <button data-action-block-step="add"
                            class="active active-block-step-root btn relative mb-2 ml-2 flex h-[20px] w-[25px] items-center justify-center self-center rounded-md bg-sky-100 text-[16px] text-sky-500 [&.active]:bg-sky-800 [&.active]:text-white">
                            <i class="fa-solid fa-plus"></i>
                        </button>
                    </div>
                    @include('frontend.pages.missions.createMissionsV4.partials.createBlockStepBtn')
                </div>

                <label for="step-wrapper"
                    class="btn absolute top-0 right-0 z-10 mx-2 hidden px-4 py-2 rounded-full peer-checked/step-wrapper:block">
                    <i class="fa-solid fa-xmark"></i>
                </label>

                <div
                    class="absolute right-0 bottom-0 h-full w-0 overflow-hidden rounded-lg bg-white opacity-0 transition-all peer-checked/step-wrapper:w-full peer-checked/step-wrapper:opacity-100 xl:relative xl:peer-checked/step-wrapper:w-1/4">
                    @include('frontend.pages.missions.createMissionsV4.partials.function.function')
                </div>
            </div>
        </div>
    </div>
    <script type="module" src="/js/missionNew/index.js"></script>
    <script>
        window.addEventListener("load", (e) => {
            setTimeout(() => {
                document.getElementById("loading-mission")?.remove();
            }, 1500);
        });
    </script>
@endsection
