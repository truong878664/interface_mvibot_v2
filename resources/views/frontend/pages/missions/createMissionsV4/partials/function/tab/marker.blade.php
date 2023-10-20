<div
    class="function-form-item function-mission-tab flex hidden h-full w-full flex-col bg-[#fff] p-4"
    data-type="marker"
>
    <div class="flex flex-wrap lg:mb-[30px]">
        <button
            class="btn marker-btn l_marker-btn active mx-2 mb-2 bg-[#0f6cbd] px-2 py-1 text-sm text-[#fff] opacity-60 md:text-2xl"
        >
            L Marker
        </button>
        <button
            class="btn marker-btn vl_marker-btn mx-2 mb-2 bg-[#0f6cbd] px-2 py-1 text-sm text-[#fff] opacity-60 md:text-2xl"
        >
            VL Marker
        </button>
        <button
            class="btn marker-btn bar_marker-btn mx-2 mb-2 bg-[#0f6cbd] px-2 py-1 text-sm text-[#fff] opacity-60 md:text-2xl"
        >
            Bar Marker
        </button>
        <button
            class="btn marker-btn none_marker_dis-btn mx-2 mb-2 bg-[#0f6cbd] px-2 py-1 text-sm text-[#fff] opacity-60 md:text-2xl"
        >
            None Marker dis
        </button>
        <button
            class="btn marker-btn none_marker_angle-btn mx-2 mb-2 bg-[#0f6cbd] px-2 py-1 text-sm text-[#fff] opacity-60 md:text-2xl"
        >
            None Marker angle
        </button>
    </div>
    <div class="w-full flex-1">
        @include('frontend.pages.missions.createMissionsV4.partials.function.tab.tabMarker.lMarker')
        @include('frontend.pages.missions.createMissionsV4.partials.function.tab.tabMarker.vlMarker')
        @include('frontend.pages.missions.createMissionsV4.partials.function.tab.tabMarker.barMarker')
        @include('frontend.pages.missions.createMissionsV4.partials.function.tab.tabMarker.noneMarkerDis')
        @include('frontend.pages.missions.createMissionsV4.partials.function.tab.tabMarker.noneMarkerAngle')
        @include('frontend.pages.missions.createMissionsV4.partials.function.tab.buttonSave',
        [ 'type' => 'marker', ])
    </div>
</div>
<style>
    .marker-btn.active {
        opacity: 1;
    }
</style>
<script>
    const $$ = document.querySelectorAll.bind(document);
    const $ = document.querySelector.bind(document);
    $$(".marker-btn").forEach((item, index) => {
        item.onclick = () => {
            $(".marker-btn.active").classList.remove("active");
            $(".marker-item:not(.hidden)")?.classList.add("hidden");
            $$(".marker-item")[index].classList.remove("hidden");
            item.classList.add("active");
        };
    });
</script>
