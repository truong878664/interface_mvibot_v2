@extends('frontend.layouts.mainLayout')
@section('content')
    <div class="w-[calc(100%_-_10px)] h-[calc(100%_-_10px)] m-2 overflow-aut p-4 relative">
        @php
            $json = '[{"type":"normal","data":{"normal":["footprint#HS_123#1","marker#HS_111#1","gpio_module#JS_123#2","gpio#HB_999#23"]}},{"type":"while","data":{"condition":[{"type":"logicAnd","data":{"logicA":["gpio_module#name#2","gpio_module#name#2"],"logicB":["gpio_module#name#2","gpio_module#name#2"]}},{"type":"logicOr","data":{"logicA":["gpio_module#name#2","gpio_module#name#2"],"logicB":["gpio_module#name#2","gpio_module#name#2"]}}],"do_":["gpio_module#name#2","gpio_module#name#2"]}}]';
        @endphp
        <div class="h-full w-full">
            <div class="flex w-full h-full ">
                <input type="checkbox" class="peer/step-wrapper" id="step-wrapper" checked hidden>
                <div class="w-full h-full relative mr-4 peer-checked/step-wrapper:w-3/4 transition-all">
                    <div id="block-step-wrapper" class="h-full overflow-y-auto pb-32"></div>
                    @include('frontend.pages.missions.createMissionsV4.partials.createBlockStepBtn')
                </div>
                <div
                    class="w-0 opacity-0 h-full bg-white rounded-lg p-4 peer-checked/step-wrapper:w-1/4 peer-checked/step-wrapper:opacity-100 transition-all">
                    @include('frontend.pages.missions.createMissionsV4.partials.function.function')
                </div>
            </div>
        </div>
    </div>
    <script type="module" src="/js/missionNew/index.js"></script>
@endsection
