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
<div class="hidden function-item w-full h-full point-function-item function-mission-tab" data-type="position">
    <div class="w-full h-full overflow-auto relative">
        <div class="w-full h-full bg-[#ccc] overflow-hidden rounded-md map-position-wrapper">
            <div id="map" class="w-full h-full"></div>
        </div>

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
        <div class="absolute top-0 right-0 text-lg flex mt-2 mr-2 switch-click-position data-[status-switch=hidden]:hidden" data-status-switch="">
            <div class="w-[60px] h-[34px]">
                <label class="switch">
                    <input class="check-click-point" type="checkbox">
                    <span class="slider round"></span>
                </label>
            </div>
        </div>
        <ul class="absolute left-0 bottom-0 max-w-[300px] max-h-[400px] text-2xl p-4 flex-col items-end overflow-y-auto hidden data-[list-position=show]:flex" data-list-position="">
            @for ($i = 0; $i < 20; $i++)
            <li class="flex items-center my-3">
                <span class="mr-2">Name position: </span>
                <span class="font-bold">point1</span>
                <div class="ml-2 w-[20px] h-[20px] rounded-full" style="background-color: #000;"></div>
            </li>
            @endfor
        </ul>
        @include('frontend.blocks.mission.createMissions.functionTab.tabPoint.control')
        {{-- form --}}
        @include('frontend.blocks.mission.createMissions.functionTab.tabPoint.form')
    </div>
    
</div>
