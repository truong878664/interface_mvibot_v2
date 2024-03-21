<div class="marker-item flex hidden h-full w-full justify-between" data-type-marker="bar_marker">
    <div class="w-1/2">
        <input name="marker_type" class="input-offset" type="text" value="bar_marker" hidden />
        {{-- bar_distance --}}
        <div class="flex items-stretch gap-4">
            @include('frontend/pages/missions/createMissionsV4/partials/function/tab/tabMarker/components/nameMarker')
            @include('frontend/pages/missions/createMissionsV4/partials/function/tab/tabMarker/components/typeMarker')
            @include('frontend/pages/missions/createMissionsV4/partials/function/tab/tabMarker/components/timeOut')
        </div>
        <div class="mr-2 flex flex-col">
            <label for="" class="">Bar distance</label>
            <input class="input-reset input-type-number w-24 px-4 py-1 " type="text" data-type='number'
                name="bar_distance" required />
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
