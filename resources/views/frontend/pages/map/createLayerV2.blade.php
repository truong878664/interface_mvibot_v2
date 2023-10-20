@extends('frontend.layouts.mainLayout')
@section('content')
    <div data-map-active="{{ $mapActive }}"
        class="w-[calc(100%_-_10px)] h-[calc(100%_-_10px)] m-2 rounded-md overflow-hidden bg-stone-200 relative">
        <div class="absolute top-0 left-0 min-h-[40px] p-2">
            <div class="backdrop-blur-sm h-full rounded-md flex bg-white shadow-md border">
                <label>
                    <input type="checkbox" class="sr-only peer/select" id="create-layer">
                    <div
                        class="px-3 py-2 text-2xl rounded-md text-black peer-checked/select:bg-stone-200 flex items-center gap-2">
                        <i class="fa-solid fa-layer-group"></i>
                        <span class="">Create layer</span>
                    </div>
                </label>
                <label>
                    <input type="checkbox" class="sr-only peer/select">
                    <div
                        class="px-3 py-2 text-2xl rounded-md text-black peer-checked/select:bg-stone-200 flex items-center gap-2">
                        <i class="fa-solid fa-caret-down"></i>
                        <span class="">List layer</span>
                    </div>
                </label>
            </div>
        </div>
        <div class="w-full h-full" id="map"></div>
        <script src="/js/map/layerV2.js" type="module"></script>
    </div>
@endsection
