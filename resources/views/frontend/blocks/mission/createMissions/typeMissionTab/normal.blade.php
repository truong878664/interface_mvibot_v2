<div class="h-full w-full flex flex-col function-item form-else-if overflow-hidden">
    <div class="flex flex-col mr-[30px]">
        <label for="" class="text-xl">Name normal mission</label>
        <input class="w-[200px] text-xl px-4 py-1 input-reset name-normal-mission" type="text" name="" required>
    </div>
    <input type="hidden" class="value-normal-mission">
    <div class="h-[120px] w-full flex flex-wrap overflow-y-auto my-4 border normal-steps-wrapper content-start">
        {{-- @php
            $arr = ['gpio', 'footprint', 'marker', 'variable', 'sleep']
        @endphp
        @for ($i = 0; $i < 5; $i++)
            <div class="step-item step-{{$arr[$i]}}" index="0" draggable="true" ondragover="allowDrop(event)"
                ondrop="drop(event)" ondragstart="dragStart(event)" id="id-{{ $i }}">
                <div class="absolute top-0 left-0 h-full flex items-center px-2 bg-[#cccccc64] text-2xl cursor-pointer drag-btn">
                    <div class="">
                        <i class="fa-solid fa-ellipsis-vertical -mr-[3px]"></i>
                        <i class="fa-solid fa-ellipsis-vertical"></i>
                    </div>
                </div>
                <input hidden="" type="text" class="step-id" value="4">
                <input hidden="" type="text" class="step-mode" value="gpio">
                <span class="stem-name pl-4">{{$arr[$i]}}|{{ $i }}</span>
            
            </div>
        @endfor --}}
    </div>
    @include('frontend.blocks.mission.createMissions.typeMissionTab.functionItem', ['type' => 'normal'])
</div>

{{-- <script>
    function dragStart(e) {
        e.dataTransfer.setData("Text", e.target.id);
    }

    function allowDrop(event) {
        event.preventDefault();
    }

    Element.prototype.appendBefore = function(element) {
        element.parentNode.insertBefore(this, element);
    }, false;

    function drop(e) {
        e.preventDefault();
        const data = e.dataTransfer.getData("Text");
        // e.target.appendChild(document.getElementById(data));
        console.log(e.target)
        document.getElementById(data).appendBefore(e.target.closest('.step-item'))

    } 
    
</script>
--}}
