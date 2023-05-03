{{-- <label for=""
    class="bg-[#0f6cbd] items-center text-[#fff] px-4 rounded-lg py-2 inline-flex text-2xl font-bold mx-2 mt-2">
    <select class="outline-none bg-[#0f6cbd] rounded" id="{{ $id }}">
        <option value="">Chose robot</option>
        
        @foreach ($robotArray as $robot)
        <option value="{{ $robot['name_seri'] }}">{{ $robot['name_seri'] }}</option>
        @endforeach
    </select>
</label> --}}
<style>
    .dropdown {
        position: relative;
        width: 200px;
        height: 30px;
        color: #fff;
    }

    .dropdown.active::before {
        top: 22px;
        transform: rotate(-225deg);
    }

    .dropdown input {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        cursor: pointer;
        border: none;
        outline: none;
        box-shadow: 0 5px 20px rgba(0, 0, 0, 0.05);
        padding: 12px 20px;
        border-radius: 4px;
    }

    .dropdown input::placeholder {
        font-weight: bold;
        color: #000;
    }

    .dropdown .options {
        position: absolute;
        top: 40px;
        width: 100%;
        background: #fff;
        box-shadow: 0 5px 20px rgba(0, 0, 0, 0.05);
        border-radius: 10px;
        overflow: hidden;
        display: none;
        z-index: 1;
        max-height: 300px;
        overflow: auto;
    }

    .dropdown.active .options {
        display: block;
    }

    .dropdown .options div {
        padding: 20px 20px;
        cursor: pointer;
        color: #000;
        font-size: 17px;
    }

    .dropdown .options div:last-child {
        padding: 12px 12px;
        text-align: center;
    }

    .dropdown .options div:hover {
        background: #62baea;
        color: #fff;
    }

    .dropdown .options div ion-icon {
        position: relative;
        top: 4px;
        margin-right: 10px;
    }
</style>

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

<div class="text-2xl mx-2 mt-2 user-select-none">
    <div class="group/dropdown dropdown">
        <div class="">
            <input class="text-box bg-[#fff] text-[#000] shadow-md" type="text" placeholder="{{ $placeHolder }}"
                id="{{ $id }}" readonly>
            <div
                class="absolute top-0 right-[10px] text-3xl text-[#0f6cbd] h-full flex items-center group-[.active]/dropdown:rotate-180 transition-all duration-500">
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
            <div class="px-2 py-2 font-bold !text-2xl" onclick="show('', this)">
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
