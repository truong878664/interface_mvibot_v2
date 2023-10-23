<div class="marker-item flex hidden h-full w-full justify-between" data-type-marker="none_marker_angle">
    <div class="w-1/2">
        <div class="flex items-stretch gap-4">
            @include('frontend/pages/missions/createMissionsV4/partials/function/tab/tabMarker/components/nameMarker')
            @include('frontend/pages/missions/createMissionsV4/partials/function/tab/tabMarker/components/timeOut')
        </div>
        <input name="marker_type" class="input-offset" type="text" value="none_marker_angle" hidden />

        <div class="flex">
            <div class="mr-2 flex flex-col items-center">
                <label for="" class="">Offset angle</label>
                <input class="input-reset input-type-number w-24 px-4 py-1 " type="text" step="0.01"
                    name="off_set_angle" required />
            </div>
        </div>
        @include('frontend/pages/missions/createMissionsV4/partials/function/tab/tabMarker/components/SSize')
    </div>

    <div class="h-full w-1/2">
        <div class="marker-img h-full w-full max-w-[400px] self-center bg-contain bg-center bg-no-repeat"
            markerDir="l_marker_"
            style="
                background-image: url(&quot;/img/marker/none_marker_angle.png&quot;);
            ">
        </div>
    </div>
</div>
