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
            z-index: 100;
            border-radius: 4px;
            padding: 20px 32px;
        }

        .input-checkbox:checked+.form-checkbox {
            display: block;
        }

        #select-robot-option {
            padding: 4px;
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

        .is-full .true-full,
        .not-full {
            display: block;
        }

        .is-full .not-full,
        .true-full {
            display: none;
        }

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
            z-index: 21;
        }

        .overlay-form-edit-step {
            position: fixed;
            top: 0%;
            left: 0%;
            right: 0%;
            bottom: 0%;
            background: transparent;
            z-index: 22;
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

        .disabled {
            pointer-events: none;
            opacity: 0.8;
        }
    </style>

    <div class="h-full flex step-render relative bg-[#fff] step-block-wrapper mb-step-full-screen">
        <div class="flex-1 flex relative h-full">
            <div class="steps-wrapper h-full overflow-y-auto flex flex-1 flex-wrap content-start bg-[#fff] group/steps-wrapper"
                data-action-step="hidden"></div>
        </div>

        <div class="submit-btn-wrapper flex flex-col justify-end min-w-[240px] items-end">

            <div class="absolute top-2 right-2">
                <span class="mr-8 text-2xl">{{ $itemRender->name }} |
                    <span class="font-bold">{{ $itemRender->type }}</span>
                </span>
                <div class="flex mt-4 items-center justify-end">
                    <button class="text-center mr-4 px-2 btn full-screen-step-btn">
                        <i class="fa-solid fa-expand not-full"></i>
                        <i class="fa-solid fa-compress true-full"></i>
                    </button>
                    <button
                        class="text-center mr-4 px-2 btn full-screen-step-btn active:text-blue-600 show-mission-code-btn">
                        <i class="fa-regular fa-file-code"></i>
                    </button>
                </div>

                <div class="flex mt-4 items-center justify-end">
                    <label for="check-show-step" class="text-2xl mr-2">Show step</label>
                    @include('components.switch', ['id' => 'check-show-step'])
                </div>

                <div class="flex mt-4 items-center justify-end">
                    <label for="check-show-action" class="text-2xl mr-2">Show action</label>
                    @include('components.switch', ['id' => 'check-show-action'])
                </div>

            </div>
            <div class="flex flex-col lg:flex-row mt-8 text-2xl font-bold">
                <input id="input-steps-name-submit" type="text" value="" name="" hidden>
                <label for="wake-up" data-ws="wake_up" data-type-mission="{{ $itemRender->type }}" id="wake_up-btn"
                    class="mb-2 rounded-md px-4 py-2 bg-green-500 text-[#fff] mx-2 btn data-[type-mission=error-robot]:hidden data-[type-mission=error-gpio]:hidden">Wake
                    up</label>
                <label for="stop" data-ws="stop" data-type-mission="{{ $itemRender->type }}" id="stop-btn"
                    class="mb-2 rounded-md px-4 py-2 bg-red-500 text-[#fff] mx-2 btn data-[type-mission=error-robot]:hidden data-[type-mission=error-gpio]:hidden">Stop</label>
                <label for="select-robot"
                    class="send-mission-btn-front mb-2 rounded-md px-4 py-2 bg-[#0f6cbd] text-[#fff] mx-2 btn data-[status-send=disabled]:opacity-50 data-[status-send=disabled]:pointer-events-none">Send</label>
            </div>
            <input type="checkbox" name="" id="select-robot" class="input-checkbox" hidden>
            <div class="select-robot-wrapper form-checkbox">
                <label for="select-robot" class="overlay overlay-choose-robot"></label>
                <div class="select-robot form-wrapper flex items-center">

                    @if ($itemRender->type === 'normal' || $itemRender->type === 'error-robot' || $itemRender->type === 'battery')
                        @include('frontend.blocks.selectRobot', [
                            'type' => 'robot',
                            'id' => 'select-robot-option',
                        ])
                    @elseif($itemRender->type === 'gpio' || $itemRender->type === 'error-gpio')
                        @include('frontend.blocks.selectRobot', [
                            'type' => 'module_gpio',
                            'id' => 'select-robot-option',
                        ])
                    @endif

                    <label for="select-robot" type="{{ $itemRender->type }}"
                        class="rounded-md text-2xl font-bold px-4 py-2 bg-[#0f6cbd] text-[#fff] mx-2 btn send-mission-btn">Send</label>
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
