@extends('frontend.layouts.mainLayout') @section('content')
    <div data-map-active="{{ $mapActive }}"
        class="relative m-2 h-[calc(100%_-_10px)] w-[calc(100%_-_10px)] overflow-hidden rounded-md bg-stone-200">
        <div class="absolute left-0 top-0 min-h-[40px] p-2">
            <div class="flex h-full rounded-md border bg-white shadow-md backdrop-blur-sm">
                <div class="flex items-center" data-name="tool-layer">
                    <label>
                        <input type="radio" class="peer/select sr-only" name="tool" data-name="default-layer" checked />
                        <div
                            class="justify-content-center flex cursor-pointer items-center gap-2 rounded-md px-3 py-1 text-black peer-checked/select:text-main">
                            <span class="rotate-[-80deg]">
                                <i class="fa-solid fa-location-arrow"></i>
                            </span>
                            <span class="text-slate-400 text-sm font-bold">V</span>
                        </div>
                    </label>
                    <label>
                        <input type="radio" class="peer/select sr-only" name="tool" data-name="create-layer" />
                        <div
                            class="flex cursor-pointer items-center gap-2 rounded-md px-3 py-1 text-black peer-checked/select:text-main">
                            <i class="fa-solid fa-square"></i>
                            <span class="text-sm">Create layer <span class="text-slate-400">C</span></span>
                        </div>
                    </label>
                    <label>
                        <input type="radio" class="peer/select sr-only" name="tool" data-name="select-layer" />
                        <div
                            class="flex cursor-pointer items-center gap-2 rounded-md px-3 py-1 text-black peer-checked/select:text-main">
                            <i class="fa-solid fa-arrow-pointer"></i>
                            <span class="text-sm">Select <span class="text-slate-400 font-bold">S</span></span>
                        </div>
                    </label>
                </div>
                <div class="relative">
                    <input type="checkbox" class="peer/select sr-only" id="list-layer" />
                    <label for="list-layer"
                        class="group/list relative flex items-center gap-2 rounded-md px-3 py-1 text-black">
                        <span class="text-main transition-all duration-300 peer-checked/select:group-[]/list:rotate-180">
                            <i class="fa-solid fa-caret-down"></i>
                        </span>
                        <span class="text-sm">List layer</span>
                    </label>
                    <div
                        class="absolute top-full mt-2 max-h-0 w-72 overflow-y-auto overflow-x-hidden rounded-md bg-white shadow-md transition-all duration-300 peer-checked/select:max-h-96">
                        <div class="p-4">
                            @for ($i = 0; $i < 20; $i++)
                                <div>123</div>
                            @endfor
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="h-full w-full" id="map"></div>
        <script src="/js/map/layerV2.js" type="module"></script>
    </div>
@endsection
