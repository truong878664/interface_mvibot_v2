<div class="hidden function-item w-full h-full">
    <div class="w-full h-full overflow-auto relative">
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
        <label class="switch">
            <input class="check-click-point" type="checkbox">
            <span class="slider round"></span>
        </label>
        @include('frontend.blocks.mission.createMissions.functionTab.tabPoint.control')
        {{-- form --}}
        @include('frontend.blocks.mission.createMissions.functionTab.tabPoint.form')
    </div>
</div>
