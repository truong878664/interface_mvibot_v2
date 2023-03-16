<div class="hidden function-item w-full h-full point-function-item function-mission-tab" data-type="position">
    <div class="w-full h-full overflow-auto relative">
        <div class="w-full h-full bg-[#ccc] overflow-hidden rounded-md" id="map"></div>

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
