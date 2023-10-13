<div class="absolute left-0 bottom-0 -mb-1 text-[16px] rounded-lg max-w-[70%] w-full max-h-[90%] flex flex-col">
    <input name="progress" class="sr-only peer/progress peer/progress-main" id="progress-main" type="radio">
    <input name="progress" class="sr-only peer/progress peer/local-variable" id="local-variable" type="radio">
    <input name="progress" class="sr-only peer/progress peer/mission-memory" id="mission-memory" type="radio">
    <input name="progress" class="sr-only peer/hidden-progress" id="hidden-progress" type="radio" checked>
    <div class="flex gap-8 text-2xl" id="info-progress">

    </div>
    <div class="flex group">
        <label
            class="bg-white/90 px-8 rounded-tl-lg rounded-tr-3xl cursor-pointer border-stone-500 text-black/40 border peer-checked/progress-main:group-[]:text-black peer-checked/progress-main:group-[]:border-transparent"
            for="progress-main">Progress</label>
        <label
            class="bg-white/90 px-8 rounded-tl-lg rounded-tr-3xl cursor-pointer border-stone-500 text-black/40 border peer-checked/local-variable:group-[]:text-black peer-checked/local-variable:group-[]:border-transparent active"
            for="local-variable">
            Local variable</label>
        <label
            class="bg-white/90 px-8 rounded-tl-lg rounded-tr-3xl cursor-pointer border-stone-500 text-black/40 border peer-checked/mission-memory:group-[]:text-black peer-checked/mission-memory:group-[]:border-transparent"
            for="mission-memory">
            Mission memory</label>
        <label
            class="bg-white/90 px-8 rounded-tl-lg rounded-tr-3xl cursor-pointer border-stone-500 text-black/40 border peer-checked/hidden-progress:group-[]:text-black peer-checked/hidden-progress:group-[]:border-transparent peer-checked/hidden-progress:group-[]:hidden"
            for="hidden-progress"><i class="fa-solid fa-sort-down"></i></label>
    </div>
    <div
        class="scrollbar-hide w-full bg-white/10 [&_[data-name='icon-block']]:bg-transparent [&_[data-name='step']]:bg-white/90 [&_[data-name='step']]:pl-2 [&_[data-name='step']]:py-2 [&_.wrap-block]:bg-white/20 [&_[data-block-wrapper]]:bg-white/20 overflow-auto max-h-0 group peer-checked/progress:max-h-[1000px] peer-checked/hidden-progress:max-h-0 transition-all duration-500">
        <div class="p-4 min-h-[300px] hidden peer-checked/progress-main:group-[]:flex flex-wrap gap-4">
            <div data-status=""
                class="absolute top-0 left-1/2 -translate-x-1/2 translate-y-full mt-10 text-green-500 px-5 py-2 rounded-md bg-white data-[status='show']:block hidden"
                id="completed-mission">
                <span>
                    <i class="fa-solid fa-check"></i>
                </span>
                Current mission completed
            </div>
            <div class="w-full h-full" id="progress-main-wrapper">
                Select robot to display mission active or This robot could not find the data
            </div>

        </div>
        <div class="p-4 min-h-[300px] hidden peer-checked/local-variable:group-[]:flex flex-wrap gap-4"
            id="local-variable-wrapper">
            Select robot to display local variables or This robot could not find the data
        </div>
        <div class="p-4 min-h-[300px] hidden peer-checked/mission-memory:group-[]:flex flex-wrap gap-4"
            id="mission-memory-wrapper">
            Select robot to display mission memory or This robot could not find the data
        </div>
    </div>
</div>
