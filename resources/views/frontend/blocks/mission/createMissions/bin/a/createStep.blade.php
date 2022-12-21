<div class="create-mission-header">
    <a href="{{ route('dashboard.missions.create-missions.') }}" class="back-btn"><i
            class="fa-solid fa-angle-left"></i></a>
    <div class="create-mission-heading">{{ $itemRender->name_mission }}</div>
</div>
<div class="create-mission-wrapper">
    <div class="missison-point mission-step-item">
        @include('frontend.blocks.mission.createMissions.createStep.showPoint')
    </div>
    <div class="f-a-f-wrapper">
        <div class="f-a-wrapper">
            <div class="misison-function mission-step-item">
                @include('frontend.blocks.mission.createMissions.createStep.function.function')
            </div>
            <div class="mission-action mission-step-item">
                @include('frontend.blocks.mission.createMissions.createStep.action.action')
            </div>
        </div>

        <div class="form-missions-f-a-wrapper">
            <div class="form-missions-f-a show">
                @include('frontend.blocks.mission.createMissions.createStep.function.formfootprint')
            </div>

            <div class="form-missions-f-a">
                @include('frontend.blocks.mission.createMissions.createStep.function.formgpio')
            </div>

            <div class="form-missions-f-a">
                @include('frontend.blocks.mission.createMissions.createStep.function.formmarker')
            </div>

            <div class="form-missions-f-a">
                @include('frontend.blocks.mission.createMissions.createStep.action.formsleep')
            </div>

            <div class="form-missions-f-a">
                @include('frontend.blocks.mission.createMissions.createStep.action.formsound')
            </div>

        </div>
    </div>
</div>

<div class="steps-mission">
    @include('frontend.blocks.mission.createMissions.createStep.steps')
</div>
