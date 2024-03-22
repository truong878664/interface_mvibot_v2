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
<div class="function-form-item relative point-function-item function-mission-tab hidden h-full w-full"
    data-type="position">
    @include('frontend.pages.missions.createMissionsV4.partials.function.tab.buttonDismiss', [
        'type' => 'position',
    ])
    <div class="relative h-full w-full overflow-auto">
        <div class="map-position-wrapper h-full w-full overflow-hidden rounded-md bg-[#ccc]">
            <div id="map" class="h-full w-full"></div>
        </div>

        <div class="absolute top-0 left-0 ">
            <?php $fileMapList = glob('../maps/*'); ?>
            <span>Map active:</span>
            <span class="name-map-active">
                @foreach ($fileMapList as $item)
                    @if (strpos($item, "$mapActive.yaml"))
                        {{ $mapActive }}
                    @else
                    @endif
                @endforeach
            </span>
            <input type="text" id="map-active-input" value="{{ $mapActive }}" hidden />
        </div>
        <div class="switch-click-position absolute top-0 right-0 mt-2 mr-2 flex  data-[status-switch=hidden]:hidden"
            data-status-switch="">
            <div class="h-[34px] w-[60px]">
                <label class="switch">
                    <input class="check-click-point" type="checkbox" />
                    <span class="slider round"></span>
                </label>
            </div>
        </div>
        <ul class="absolute left-0 bottom-0 hidden max-h-[400px] max-w-[300px] flex-col items-end overflow-y-auto p-4  data-[list-position=show]:flex"
            data-list-position="">
            @for ($i = 0; $i < 20; $i++)
                <li class="my-3 flex items-center">
                    <span class="mr-2">Name position: </span>
                    <span class="font-bold">point1</span>
                    <div class="ml-2 h-[20px] w-[20px] rounded-full" style="background-color: #000"></div>
                </li>
            @endfor
        </ul>
        @include('frontend.pages.missions.createMissionsV4.partials.function.tab.tabPosition.control')
        {{-- form --}}
        @include('frontend.pages.missions.createMissionsV4.partials.function.tab.tabPosition.form')
    </div>
</div>
