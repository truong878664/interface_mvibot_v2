    <button class="close-form-marker-btn x-btn"><i class="fa-solid fa-xmark"></i></button>
    <div class="marker-title">None Marker Dis</div>
    <div class="wrapper-marker">
        <form class="form-marker-item form-marker" action="/dashboard/missions/create-marker" method="POST">
            <div class="offset-wrapper-input">
                <label for="">Name</label>
                <input required name="name_marker" class="input-offset" type="text">
            </div>
            <input name="marker_type" class="input-offset" type="text" value="none_marker_dis" hidden>

            <div class="offset-wrapper-all">
                <div class="offset-wrapper-input">
                    <label for="">Offset Dis </label>
                    <input class="input-offset" type="number" required name="off_set_dis">
                </div>
            </div>
            @csrf
            @include('frontend.blocks.createMissions.createStep.function.idMission')
            <x-button tag="button" title="Add" class="submit-marker" attribute=""></x-button>

        </form>
        <div class="form-marker-item illustration">
            <img src="/img/marker/none_marker_dis.png" alt="">
        </div>
    </div>
