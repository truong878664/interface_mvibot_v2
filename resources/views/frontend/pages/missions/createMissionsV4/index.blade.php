@extends('frontend.layouts.mainLayout')
@section('content')
    <div class="fixed top-0 left-0 right-0 bottom-0 bg-white z-10 grid place-content-center" id="loading-mission">
        <span class="loader-mission"></span>
    </div>
    <div class="w-full lg:w-[calc(100%_-_10px)] h-[calc(100%_-_10px)] lg:m-2 overflow-aut lg:p-4 relative">
        @php
            $json = '[{"type":"normal","data":{"normal":["footprint#HS_123#1","marker#HS_111#1","gpio_module#JS_123#2","gpio#HB_999#23"]}},{"type":"while","data":{"condition":[{"type":"logicAnd","data":{"logicA":["gpio_module#name#2","gpio_module#name#2"],"logicB":["gpio_module#name#2","gpio_module#name#2"]}},{"type":"logicOr","data":{"logicA":["gpio_module#name#2","gpio_module#name#2"],"logicB":["gpio_module#name#2","gpio_module#name#2"]}}],"do_":["gpio_module#name#2","gpio_module#name#2"]}}]';
        @endphp
        <div class="h-full w-full">
            <input class="" id="id-mission" value="{{ $itemRender->id }}" hidden>
            <input class="" id="type-mission" value="{{ $itemRender->type }}" hidden>
            <div class="flex w-full h-full relative">
                <input type="checkbox" class="peer/step-wrapper" id="step-wrapper" hidden>
                <div class="w-full h-full relative lg:mr-4 md:peer-checked/step-wrapper:w-3/4 transition-all ">
                    <div id="block-step-wrapper" class="overflow-y-auto max-h-full pb-32">
                        <button data-action-block-step="add"
                            class="active active-block-step-root btn w-[25px] h-[20px] relative flex justify-center text-[16px] rounded-md mb-2 ml-2  items-center text-sky-500 bg-sky-100 self-center [&amp;.active]:bg-sky-800 [&amp;.active]:text-white">
                            <i class="fa-solid fa-plus"></i>
                        </button>
                    </div>
                    @include('frontend.pages.missions.createMissionsV4.partials.createBlockStepBtn')
                </div>

                <label for="step-wrapper" class="btn rounded-lg px-4 py-2 mx-2 text-2xl absolute top-0 right-0 z-10 hidden peer-checked/step-wrapper:block">
                    <i class="fa-solid fa-xmark"></i>
                </label>

                <div
                    class="absolute right-0 bottom-0 w-0 opacity-0 h-full bg-white rounded-lg xl:p-4 peer-checked/step-wrapper:w-full peer-checked/step-wrapper:opacity-100 transition-all overflow-hidden xl:relative xl:peer-checked/step-wrapper:w-1/4">
                    @include('frontend.pages.missions.createMissionsV4.partials.function.function')
                </div>

                {{-- <div
                    class="w-0 opacity-0 h-full bg-white rounded-lg p-4 peer-checked/step-wrapper:w-1/4 peer-checked/step-wrapper:opacity-100 transition-all overflow-hidden hidden">
                    @include('frontend.pages.missions.createMissionsV4.partials.function.function')
                </div> --}}
            </div>
        </div>
    </div>
    <script type="module" src="/js/missionNew/index.js"></script>
    <script>
        window.addEventListener('load', e => {
            setTimeout(() => {
                document.getElementById("loading-mission")?.remove()
            }, 1500);
        })
    </script>
@endsection
