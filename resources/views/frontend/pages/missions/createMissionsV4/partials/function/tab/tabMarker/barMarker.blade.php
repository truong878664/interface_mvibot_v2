<div class="marker-item flex hidden h-full w-full justify-between" data-type-marker="bar_marker">
    <div class="w-1/2">
        <input name="marker_type" class="input-offset" type="text" value="bar_marker" hidden />
        <div class="flex items-stretch gap-4">
            @include('frontend/pages/missions/createMissionsV4/partials/function/tab/tabMarker/components/nameMarker')
            @include('frontend/pages/missions/createMissionsV4/partials/function/tab/tabMarker/components/typeMarker')
            @include('frontend/pages/missions/createMissionsV4/partials/function/tab/tabMarker/components/timeOut')
        </div>
        @include('frontend/pages/missions/createMissionsV4/partials/function/tab/tabMarker/components/formValue')
        @include('frontend/pages/missions/createMissionsV4/partials/function/tab/tabMarker/components/SSize')
    </div>

    <div class="h-full w-1/2">
        <div class="marker-img h-full w-full max-w-[400px] self-center bg-contain bg-center bg-no-repeat"
            markerDir="bar_marker_"
            style="
                background-image: url(&quot;/img/marker/bar_marker_front_ward.png&quot;);
            ">
        </div>
    </div>
</div>
