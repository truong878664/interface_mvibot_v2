<p class="heading-form-mission">Footprint</p>
<form method="POST" action="/dashboard/missions/update-footprint">
    <input type="text" hidden class="footprint-id" name="id">
    <div class="name-footprint">
        <label for="">Name</label>
        <input class="name-footprint-edit" type="text" name="name_footprint" required>
    </div>
    <input type="text" hidden input>
    <div class="footprint-img" style="background-image:url('/img/footprint.png');" class="img-footprint">
        <div class="input-footprint-wrapper top-footprint">
            <input required type="number" class="x1-edit  input-footprint" placeholder="front" name="x1">
            <span>cm</span>
        </div>

        <div class="input-footprint-wrapper right-footprint">
            <input required type="number" class="y2-edit  input-footprint" placeholder="right" name="y2">
            <span>cm</span>
        </div>

        <div class="input-footprint-wrapper left-footprint">
            <input required type="number" class="y1-edit left-footprint input-footprint" placeholder="left"
                name="y1">
            <span>cm</span>
        </div>

        <div class="input-footprint-wrapper bottom-footprint">
            <input required type="number" class="x2-edit bottom-footprint input-footprint" placeholder="behind"
                name="x2">
            <span>cm</span>
        </div>
    </div>

    @include('frontend.blocks.createMissions.createStep.function.idMission')
    <x-button tag="button" title="Update" class="add-btn" attribute=""></x-button>
    @csrf
</form>
