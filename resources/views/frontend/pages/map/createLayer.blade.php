@extends('frontend.layouts.mainLayout')
@section('content')
    <div class="p-1 w-full h-full overflow-hidden rounded-md bg-stone-200">
        <div class="flex h-full flex-col">
            <div class="flex flex-1">
                <div class="relative h-full w-5/6 overflow-hidden">
                    <div class="absolute h-full w-full cursor-copy overflow-hidden rounded-md" id="map"></div>
                    {{-- ===heading map=== --}}
                    <div class="absolute flex w-full p-2">
                        <div class="">
                            <span>Map active:</span>
                            <span id="map-active">{{ $mapActive }}</span>
                        </div>
                        <div class="absolute top-3 right-3 w-[200px] bg-[#fff]">
                            <label for=""
                                class="absolute top-0 block h-[23px] w-full select-none rounded-sm bg-[#0f6cbd] text-center text-[#fff]"
                                id="list-layer-btn">
                                <span>Saved layer list</span>
                                <span class="float-right pr-4  leading-[23px]">
                                    <i class="fa-solid fa-chevron-down hidden" id="down-icon"></i>
                                    <i class="fa-solid fa-chevron-up hidden" id="up-icon"></i>
                                </span>
                            </label>
                            @php
                                $allLayerJson = json_encode($allLayer->toArray());
                            @endphp
                            <input type="hidden" value="{{ $allLayerJson }}" id="data-layer-json" />
                            <div class="mt-[23px] hidden max-h-[300px] overflow-scroll overflow-x-hidden"
                                id="list-layer-item">
                                <div
                                    class="flex cursor-pointer items-center justify-between px-4 py-2 hover:bg-[rgba(204,204,204,0.43)]">
                                    <button class="text-[rgba(51,51,51,0.38)] hover:text-[#333]">
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="flex max-w-[300px] flex-col content-start justify-end rounded-md px-5 h-full">
                    <div class="">
                        <div for="" class="relative mb-9 w-full ">
                            <div class="flex items-center">
                                <span class="min-w-[77px] pr-2">Name layer</span>
                                <input type="text" class="w-[200px] px-4" id="name_layer" />
                            </div>
                            <span class="absolute bottom-0 right-0 block w-full translate-y-full text-right  text-red-500"
                                id="msg-name-layer"></span>
                        </div>

                        <div for="" class="mb-9 flex w-full items-center ">
                            <span class="min-w-[77px] pr-2">Type layer</span>
                            <select name="" id="type-layer" class="w-[200px] flex-1 border-[1px] px-4 outline-none">
                                <option value="high_zone">high_zone</option>
                                <option value="dead_zone">dead_zone</option>
                            </select>
                        </div>

                        <div for="" class="mb-9 flex w-full items-center text ">
                            <span class="min-w-[77px] pr-2">Width</span>
                            <div class="flex flex-1 flex-col">
                                <input type="number" class="w-[200px] flex-1 px-4" value="1" id="width-layer" />
                                <input id="width-layer-range" type="range" step="0.1" value="0.1" max="50"
                                    min="0.1"
                                    class="layer-range mt-3 h-2 w-full cursor-pointer appearance-none rounded-lg bg-gray-200 dark:bg-gray-700" />
                            </div>
                        </div>

                        <div for="" class="mb-9 flex w-full items-center ">
                            <span class="min-w-[77px] pr-2">Length</span>
                            <div class="flex flex-1 flex-col">
                                <input type="number" class="w-[200px] flex-1 px-4" value="1" id="height-layer" />
                                <input id="height-layer-range" type="range" step="0.1" max="50" value="0.1"
                                    min="0.1"
                                    class="layer-range mt-3 h-2 w-full cursor-pointer appearance-none rounded-lg bg-gray-200 dark:bg-gray-700" />
                            </div>
                        </div>

                        <div for="" class="mb-9 flex w-full items-center ">
                            <span class="min-w-[77px] pr-2">X</span>
                            <div class="flex flex-1 flex-col">
                                <input type="number" class="w-[200px] flex-1 px-4" value="0" name="xo"
                                    id="xo" />
                                <input id="xo-range" type="range" step="0.1" value="0" max="30"
                                    min="-30" value="1"
                                    class="layer-range mt-3 h-2 w-full cursor-pointer appearance-none rounded-lg bg-gray-200 dark:bg-gray-700" />
                            </div>
                        </div>

                        <div for="" class="mb-9 flex w-full items-center ">
                            <span class="min-w-[77px] pr-2">Y</span>
                            <div class="flex flex-1 flex-col">
                                <input type="number" class="w-[200px] flex-1 px-4" value="0" name="yo"
                                    id="yo" />
                                <input id="yo-range" type="range" step="0.1" value="0" max="30"
                                    min="-30"
                                    class="layer-range mt-3 h-2 w-full cursor-pointer appearance-none rounded-lg bg-gray-200 dark:bg-gray-700" />
                            </div>
                        </div>

                        <div for="" class="mb-9 flex w-full items-center ">
                            <span class="min-w-[77px] pr-2">Angle</span>
                            <div class="flex flex-1 flex-col">
                                <input type="number" class="w-[200px] flex-1 px-4" value="0" id="z-rotate" />
                                <input id="z-rotate-range" type="range" step="1" value="0" max="180"
                                    min="-180"
                                    class="layer-range mt-3 h-2 w-full cursor-pointer appearance-none rounded-lg bg-gray-200 dark:bg-gray-700" />
                            </div>
                        </div>
                    </div>

                    {{-- ===list layer=== --}}
                    <div class="relative mt-10 flex-1 overflow-hidden border-[1px] border-solid border-[#ccc]"
                        id="list-layer-wrapper">
                        <label class="absolute block h-[30px] w-full bg-[rgba(204,204,204,0.51)] text-center">list
                            layer</label>
                        <div class="mt-[30px] max-h-[300px] overflow-x-auto overflow-y-visible" id="layer-container">
                            <div class="flex select-none justify-between px-8 py-3 hover:bg-[#cccccc25]">
                                <button
                                    class="delete-layer-btn px-2 text-[rgba(51,51,51,0.34)] hover:text-[#333]"></button>
                            </div>
                        </div>

                        <div class="absolute bottom-0 right-0">
                            <form method="POST" action="{{ route('add-layer') }}" id="form-add-layer">
                                <input type="text" id="data-layer" name="data_layer" hidden />
                                @csrf
                                <button class="btn m-4 bg-[#0f6cbd] px-4 text-[#fff]" id="save-layer-btn">
                                    Save
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    @include('frontend.blocks.message')
    <script src="/js/library/roslib.min.js"></script>
    <script src="/js/library/nipplejs.js"></script>
    <script type="module" src="/js/map/createLayer.js"></script>
    <script>
        const $ = document.querySelector.bind(document);
        let isShowListlayer = JSON.parse(localStorage.getItem("isShowListlayer"));
        showIcon(isShowListlayer);
        isShowListlayer && $("#list-layer-item").classList.remove("hidden");
        $("#list-layer-btn").onclick = () => {
            $("#list-layer-item").classList.toggle("hidden");
            isShowListlayer = !isShowListlayer;
            localStorage.setItem("isShowListlayer", isShowListlayer);
            showIcon(isShowListlayer);
        };

        function showIcon(boolean) {
            if (boolean) {
                $("#up-icon").classList.remove("hidden");
                $("#down-icon").classList.add("hidden");
            } else {
                $("#up-icon").classList.add("hidden");
                $("#down-icon").classList.remove("hidden");
            }
        }
    </script>
@endsection
