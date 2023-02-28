    <style>
        .form-checkbox {
            display: none;
        }

        .form-wrapper {
            position: fixed;
            background-color: white;
            top: 50%;
            left: 50%;
            transform: translateX(-50%) translateY(-60%);
            z-index: 1000;
            border-radius: 4px;
            padding: 20px 32px;
        }

        .input-checkbox:checked+.form-checkbox {
            display: block;
        }

        #select-robot-option {
            height: 46px;
            padding: 4px 8px;
            font-family: var(--main-font);
            font-size: 2rem;
        }

        .add-wake-up-btn {
            align-items: flex-end;
        }

        .full-screen {
            position: absolute;
            left: 0;
            right: 0;
            bottom: 0;
            top: 0;
            z-index: 20;
        }

        .full-screen .edit-step-btn {
            display: none;
        }
        
        .is-full .full, .not-full {
            display: block;
        }
        
        .is-full .not-full, .full {
            display: none;
        }



    </style>
    <div class="h-full flex step-render relative bg-[#fff] step-block-wrapper mb-step-full-screen">
        <div class="flex-1 flex relative h-full">
            <div class="steps-wrapper h-full overflow-y-scroll flex flex-1 flex-wrap content-start bg-[#fff]"></div>
        </div>

        <div class="submit-btn-wrapper flex flex-col justify-end min-w-[240px] items-end">
            {{-- switch --}}
            <div class="absolute top-2 right-2 flex">
                <span class="mr-8 text-2xl">{{ $itemRender->name_mission }} | <span class="font-bold">{{ $itemRender->type }}</span></span>
                <div class="flex flex-col justify-center">
                    <div class="h-[34px] w-[60px]">
                        <label class="switch">
                            <input class="check-show-step" type="checkbox">
                            <span class="slider round"></span>
                        </label>
                    </div>
                    <button class="mt-8 text-center px-2 btn full-screen-step-btn">
                        <i class="fa-solid fa-expand not-full"></i>
                        <i class="fa-solid fa-compress full"></i>
                    </button>
                </div>
                {{-- end switch --}}
            </div>
            <div class="flex flex-col lg:flex-row mt-8">
                <input id="input-steps-name-submit" type="text" value="" name="" hidden>
                <label for="wake-up"
                    class="mb-2 text-xl md:text-3xl rounded-md px-4 py-2 bg-green-500 text-[#fff] mx-2 btn type-mission-{{ $itemRender->type }}">Wake
                    up</label>
                <label for="stop"
                    class="mb-2 text-xl md:text-3xl rounded-md px-4 py-2 bg-red-500 text-[#fff] mx-2 btn type-mission-{{ $itemRender->type }}">Stop</label>
                <label for="select-robot"
                    class="mb-2 text-xl md:text-3xl rounded-md px-4 py-2 bg-[#0f6cbd] text-[#fff] mx-2 btn">Send</label>
            </div>
            <input type="checkbox" name="" id="select-robot" class="input-checkbox" hidden>
            <div class="select-robot-wrapper form-checkbox">
                <label for="select-robot" class="overlay"></label>
                <div class="select-robot form-wrapper">
                    <select id="select-robot-option">
                        <option value="">Choose Robot</option>
                        @foreach ($allRobot as $robot)
                            <option value="{{ $robot['name_seri'] }}">{{ $robot['name_seri'] }}</option>
                        @endforeach
                    </select>
                    <label for="select-robot" type="{{ $itemRender->type }}"
                        class="mb-2 text-xl md:text-3xl rounded-md px-4 py-2 bg-[#0f6cbd] text-[#fff] mx-2 btn send-mission-btn">Send</label>
                </div>
            </div>
        </div>
        @include('frontend.blocks.mission.createMissions.functionTab.tabWakeUpStop.index')
    </div>


    @php
        $datas = explode('|', $itemRender->steps_mission_name);
        array_shift($datas);
        $datasJson = json_encode($datas);
        echo "<input hidden class='data-steps' type='text' value='$datasJson'>";
        
        if (session('data')) {
            $dataNew = session('data')[0]['steps_mission'];
            $stringStep_mission = trim(str_replace(')(', '||', $dataNew), '()');
        } else {
            $stringStep_mission = trim(str_replace(')(', '||', $itemRender->steps_mission), '()');
        }
        $dataStepJson = json_encode(explode('||', $stringStep_mission));
        echo "<input hidden class='data-steps-value' type='text' value='$dataStepJson'>";
    @endphp

    <style>
        .form-edit-step {
            min-width: 500px;
            min-height: 500px;
            background-color: #fff;
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translateX(-50%) translateY(-50%);
            box-shadow: 0 0 10px rgba(51, 51, 51, 0.555);
            display: none;
            z-index: 1000;
        }

        .overlay-form-edit-step {
            position: fixed;
            top: 0%;
            left: 0%;
            right: 0%;
            bottom: 0%;
            background: transparent;
            z-index: 100;
            display: none;
        }

        .edit-item {
            display: none;
        }

        .form-edit-step.sleep-edit .sleep-form-edit,
        .form-edit-step.footprint-edit .footprint-form-edit,
        .form-edit-step.marker-edit .marker-form-edit,
        .form-edit-step.position-edit .position-form-edit,
        .form-edit-step.gpio-edit .gpio-form-edit {
            display: block;
        }

        .sleep-edit {}

        .disabled {
            pointer-events: none;
            opacity: 0.8;
        }
    </style>
