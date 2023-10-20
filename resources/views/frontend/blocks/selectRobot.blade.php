@php
    $title = 'No robot';
    $placeHolder = 'Select robot';
    if ($type === 'robot') {
        $robotArray = json_decode($robots, true);
    } elseif ($type === 'module_gpio') {
        $robotArray = json_decode($moduleGpios, true);
        $title = 'No module gpio';
        $placeHolder = 'Select module gpio';
    } elseif ($type === 'robot_slam') {
        $robotArray = json_decode($robotsSlam, true);
        $title = 'No robot slam';
    } elseif ($type === 'robot_navigation') {
        $robotArray = json_decode($robotsNavigation, true);
        $title = 'No robot navigation';
    } elseif ($type === 'all_robot') {
        $robotArray = json_decode($allRobots, true);
    } else {
        $robotArray = [];
    }
@endphp

<div class="text-xl mx-2 mt-2 user-select-none">
    <div class="group/dropdown dropdown">
        <div class="">
            <input class="text-box bg-[#fff] text-[#000] shadow-md placeholder:text-base" type="text"
                placeholder="{{ $placeHolder }}" id="{{ $id }}" readonly>
            <div
                class="absolute top-0 right-[10px] text-[#0f6cbd] h-full flex items-center group-[.active]/dropdown:rotate-180 transition-all duration-500">
                <i class="fa-solid fa-caret-down"></i>
            </div>
        </div>
        <div class="options">
            @foreach ($robotArray as $robot)
                <div class="border-b" onclick="show('{{ $robot['name_seri'] }}', this)">
                    <i class="fa-solid fa-caret-right mr-4 text-[#0f6cbd]"></i>
                    {{ $robot['name_seri'] }}
                </div>
            @endforeach
            <div class="px-2 py-2 font-bold" onclick="show('', this)">
                {{ $title }}
            </div>
        </div>
    </div>
</div>

<script>
    function show(value, element) {
        const inputSelect = element.closest('.dropdown').querySelector('.text-box')
        inputSelect.value = value;
        inputSelect.dispatchEvent(new Event('change'));
    }

    document.querySelectorAll(".dropdown").forEach(dropdown => {
        dropdown.onclick = (e) => {
            e.preventDefault()
            dropdown.classList.toggle("active")
        }
    });
</script>
