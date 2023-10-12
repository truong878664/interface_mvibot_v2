<div class="absolute left-0 bottom-0 ml-1 -mb-1 text-[16px] rounded-lg max-w-[70%] w-full max-h-[90%] flex flex-col">
    <input name="progress" class="sr-only peer/progress peer/progress-main" id="progress-main" type="radio">
    <input name="progress" class="sr-only peer/progress peer/local-variable" id="local-variable" type="radio">
    <input name="progress" class="sr-only peer/progress peer/mission-memory" id="mission-memory" type="radio">
    <input name="progress" class="sr-only peer/hidden-progress" id="hidden-progress" type="radio">
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
            class="bg-white/90 px-8 rounded-tl-lg rounded-tr-3xl cursor-pointer border-stone-500 text-black/40 border peer-checked/hidden-progress:group-[]:text-black peer-checked/hidden-progress:group-[]:border-transparent"
            for="hidden-progress"><i class="fa-solid fa-xmark"></i></label>
    </div>
    <div
        class="w-full bg-white/90 overflow-auto max-h-0 group peer-checked/progress:max-h-[1000px] peer-checked/hidden-progress:max-h-0 transition-all duration-500">
        <div class="p-4 min-h-[300px] hidden peer-checked/progress-main:group-[]:flex flex-wrap gap-4"
            id="progress-main-wrapper">
            progress-main
        </div>
        <div class="p-4 min-h-[300px] hidden peer-checked/local-variable:group-[]:flex flex-wrap gap-4"
            id="local-variable-wrapper">
            local-variable
        </div>
        <div class="p-4 min-h-[300px] hidden peer-checked/mission-memory:group-[]:flex flex-wrap gap-4"
            id="mission-memory-wrapper">
            mission-memory
        </div>
    </div>
</div>
