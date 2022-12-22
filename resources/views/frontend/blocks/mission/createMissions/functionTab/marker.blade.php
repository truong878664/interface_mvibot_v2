<div class="function-item h-full w-full flex flex-col hidden">
    <div class="flex flex-wrap lg:mb-[30px]">
        <button
            class="mb-2 text-sm md:text-2xl px-2 py-1 bg-[#0f6cbd] opacity-60 text-[#fff] mx-2 btn marker-btn active">L
            Marker</button>
        <button class="mb-2 text-sm md:text-2xl px-2 py-1 bg-[#0f6cbd] opacity-60 text-[#fff] mx-2 btn marker-btn">VL
            Marker</button>
        <button class="mb-2 text-sm md:text-2xl px-2 py-1 bg-[#0f6cbd] opacity-60 text-[#fff] mx-2 btn marker-btn">Bar
            Marker</button>
        <button class="mb-2 text-sm md:text-2xl px-2 py-1 bg-[#0f6cbd] opacity-60 text-[#fff] mx-2 btn marker-btn">None
            Marker
            dis</button>
        <button class="mb-2 text-sm md:text-2xl px-2 py-1 bg-[#0f6cbd] opacity-60 text-[#fff] mx-2 btn marker-btn">None
            Marker
            angle</button>
    </div>
    <div class="w-full flex-1">
        @include('frontend.blocks.mission.createMissions.functionTab.tabMarker.lMarker')
        @include('frontend.blocks.mission.createMissions.functionTab.tabMarker.vlMarker')
        @include('frontend.blocks.mission.createMissions.functionTab.tabMarker.barMarker')
        @include('frontend.blocks.mission.createMissions.functionTab.tabMarker.noneMarkerDis')
        @include('frontend.blocks.mission.createMissions.functionTab.tabMarker.noneMarkerAngle')
    </div>
</div>
<style>
    .marker-btn.active {
        opacity: 1;
    }
</style>
<script>
    const $$ = document.querySelectorAll.bind(document)
    const $ = document.querySelector.bind(document)
    $$('.marker-btn').forEach((item, index) => {
        item.onclick = () => {
            $('.marker-btn.active').classList.remove("active")
            $('.marker-item:not(.hidden)')?.classList.add('hidden')
            $$('.marker-item')[index].classList.remove('hidden')
            item.classList.add('active')
        }
    });
</script>
