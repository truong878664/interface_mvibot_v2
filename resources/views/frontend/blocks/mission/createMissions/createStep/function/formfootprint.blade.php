<p class="heading-form-mission">Footprint</p>
<form method="POST" action="/dashboard/missions/create-footprint">
    <div class="name-footprint">
        <label for="">Name</label>
        <input class="name-footprint-input" type="text" name="name_footprint" required>
    </div>
    <div class="footprint-img" style="background-image:url('/img/footprint.png');" class="img-footprint">
        <div class="input-footprint-wrapper top-footprint">
            <input required type="number" class=" input-footprint" placeholder="front" name="x1">
            <span>cm</span>
        </div>

        <div class="input-footprint-wrapper right-footprint">
            <input required type="number" class=" input-footprint" placeholder="right" name="y2">
            <span>cm</span>
        </div>

        <div class="input-footprint-wrapper left-footprint">
            <input required type="number" class="left-footprint input-footprint" placeholder="left" name="y1">
            <span>cm</span>
        </div>

        <div class="input-footprint-wrapper bottom-footprint">
            <input required type="number" class="bottom-footprint input-footprint" placeholder="behind" name="x2">
            <span>cm</span>
        </div>
    </div>
    @include('frontend.blocks.mission.createMissions.createStep.function.idMission')
    <x-button tag="button" title="Add" class="add-btn" attribute=""></x-button>
    @csrf
</form>
