<div class="hidden function-item w-full h-full point-function-item">
    <div class="w-full h-full overflow-auto relative bg-red-200">
        <div class="w-full h-full bg-[#ccc] overflow-hidden" id="map"></div>

        <div class="absolute top-0 left-0 text-lg">
            <?php
            $fileMapList = glob('../maps/*');
            ?>
            <span>Map active:</span>
            <span class="name-map-active">
                @foreach ($fileMapList as $item)
                    @if (strpos($item, "$mapActive.yaml"))
                        {{ $mapActive }}
                    @else
                    @endif
                @endforeach
            </span>

        </div>
        <div class="absolute top-0 right-0 text-lg flex mt-2 mr-2">
            <button class="btn text-3xl h-[34px] w-[34px] flex justify-center items-center mr-4 fullscreen-btn">
                <i class="fa-solid fa-expand full"></i>
                <i class="fa-solid fa-compress hide"></i>
            </button>
            <div class="w-[60px] h-[34px]">
                <label class="switch">
                    <input class="check-click-point" type="checkbox">
                    <span class="slider round"></span>
                </label>
            </div>

        </div>
        @include('frontend.blocks.mission.createMissions.functionTab.tabPoint.control')
        {{-- form --}}
        @include('frontend.blocks.mission.createMissions.functionTab.tabPoint.form')
    </div>
    <style>
        .fullscreen {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
        }

        .hide {
            display: none;
        }
        .fullscreen .full {
            display: none;
        } 
        .fullscreen .hide {
            display: block;
        }
    </style>
</div>
