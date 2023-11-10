<div class="absolute left-0 bottom-0 -mb-1 text-[16px] rounded-lg max-w-[70%] w-full max-h-[90%] flex flex-col">
    <input name="progress" class="sr-only peer/progress peer/progress-main" id="progress-main" type="radio">
    <input name="progress" class="sr-only peer/progress peer/local-variable" id="local-variable" type="radio">
    <input name="progress" class="sr-only peer/progress peer/mission-memory" id="mission-memory" type="radio">
    <input name="progress" class="sr-only peer/hidden-progress" id="hidden-progress" type="radio" checked>
    <div class="flex group">
        <label
            class="bg-white/10 backdrop-blur-sm px-8 rounded-tl-lg rounded-tr-3xl cursor-pointer border-stone-500 text-black border peer-checked/progress-main:group-[]:bg-main/80 peer-checked/progress-main:group-[]:text-white peer-checked/progress-main:group-[]:border-transparent"
            for="progress-main">Progress</label>
        <label
            class="bg-white/10 backdrop-blur-sm px-8 rounded-tl-lg rounded-tr-3xl cursor-pointer border-stone-500 text-black border peer-checked/local-variable:group-[]:bg-main/80 peer-checked/local-variable:group-[]:text-white peer-checked/local-variable:group-[]:border-transparent active"
            for="local-variable">
            Local variable</label>
        <label
            class="bg-white/10 backdrop-blur-sm px-8 rounded-tl-lg rounded-tr-3xl cursor-pointer border-stone-500 text-black border peer-checked/mission-memory:group-[]:bg-main/80 peer-checked/mission-memory:group-[]:text-white peer-checked/mission-memory:group-[]:border-transparent"
            for="mission-memory">
            Mission memory</label>
        <label
            class="bg-white/10 backdrop-blur-sm px-8 hover:text-main rounded-tl-lg rounded-tr-3xl cursor-pointer border-stone-500 text-black border peer-checked/hidden-progress:group-[]:bg-main/80 peer-checked/hidden-progress:group-[]:text-white peer-checked/hidden-progress:group-[]:border-transparent peer-checked/hidden-progress:group-[]:hidden"
            for="hidden-progress"><i class="fa-solid fa-sort-down"></i></label>
    </div>
    <div class="flex flex-col" id="info-progress"></div>
    <div
        class="scrollbar-hide w-full bg-white/10 [&_[data-name='icon-block']]:bg-transparent [&_[data-name='header-block-step']]:ring-transparent [&_[data-block-wrapper]]:ring-transparent [&_[data-name='header-block-step']]:shadow-none [&_[data-name='header-block-step']]:bg-transparent [&_[data-name='step']]:bg-white/90 [&_[data-name='step']]:p-1 [&_.wrap-block]:bg-white/20 [&_[data-block-wrapper]]:bg-white/20 [&_[data-data-block]]:gap-1 overflow-auto max-h-0 group peer-checked/progress:max-h-[1000px] peer-checked/hidden-progress:max-h-0 transition-all duration-500">
        <div class="p-4 hidden peer-checked/progress-main:group-[]:block">
            <div data-status=""
                class="absolute top-0 left-1/2 -translate-x-1/2 z-10 translate-y-full mt-10 text-green-500 px-5 py-2 rounded-md shadow-md bg-white data-[status='show']:block hidden"
                id="completed-mission">
                <span>
                    <i class="fa-solid fa-check"></i>
                </span>
                Current mission completed
            </div>
            <div class="w-full h-full flex flex-wrap gap-2" id="progress-main-wrapper">
                Select robot to display mission active or This robot could not find the data
            </div>

        </div>
        <div class="p-4 hidden peer-checked/local-variable:group-[]:flex flex-wrap gap-4 bg-main/80 text-white"
            id="local-variable-wrapper">
            Select robot to display local variables or This robot could not find the data
        </div>
        <div class="p-4 hidden peer-checked/mission-memory:group-[]:flex flex-wrap gap-4 bg-main/80 text-white"
            id="mission-memory-wrapper">
            Select robot to display mission memory or This robot could not find the data
        </div>
    </div>
</div>
