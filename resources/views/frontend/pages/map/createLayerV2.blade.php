@extends('frontend.layouts.mainLayout') @section('content')
    <div data-map-active="{{ $mapActive }}"
        class="relative m-2 h-[calc(100%_-_10px)] w-[calc(100%_-_10px)] overflow-hidden rounded-md bg-stone-200">
        <div class="absolute top-0 left-0 min-h-[40px] p-2">
            <div class="flex h-full rounded-md border bg-white shadow-md backdrop-blur-sm">
                <label>
                    <input type="checkbox" class="peer/select sr-only" id="create-layer" />
                    <div class="flex items-center gap-2 rounded-md px-3 py-2 text-black peer-checked/select:bg-stone-200">
                        <i class="fa-solid fa-layer-group"></i>
                        <span class="">Create layer</span>
                    </div>
                </label>
                <label>
                    <input type="checkbox" class="peer/select sr-only" />
                    <div class="flex items-center gap-2 rounded-md px-3 py-2 text-black peer-checked/select:bg-stone-200">
                        <i class="fa-solid fa-caret-down"></i>
                        <span class="">List layer</span>
                    </div>
                </label>
            </div>
        </div>
        <div class="h-full w-full" id="map"></div>
        <script src="/js/map/layerV2.js" type="module"></script>
    </div>
@endsection
