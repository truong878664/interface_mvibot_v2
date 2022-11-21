<button class="close-form-marker-btn x-btn"><i class="fa-solid fa-xmark"></i></button>
<div class="marker-title">VL Marker</div>
<div class="wrapper-marker">
    <form class="form-marker-item form-marker" action="/dashboard/missions/create-marker" method="POST">
        <div class="offset-wrapper-all">
            <div class="offset-wrapper-input">
                <label for="">Name</label>
                <input required name="name_marker" class="input-offset" type="text">
            </div>
            <input name="marker_type" class="input-offset" type="text" value="vl_marker" hidden>
            <div class="offset-wrapper-input">
                <label for="">Marker dir</label>
                <select name="marker_dir" class="input-offset marker_dir_input">
                    <option value="front_ward">Front ward</option>
                    <option value="back_ward">Back ward</option>
                </select>
            </div>

            <div class="offset-wrapper-input">
                <label for="">Offset X1</label>
                <input class="input-offset" type="number" name="off_set_x1" required>
            </div>
            <div class="offset-wrapper-input">
                <label for="">Offset X2</label>
                <input class="input-offset" type="number" name="off_set_x2" required>
            </div>

            <div class="offset-wrapper-input">
                <label for="">Offset Y1</label>
                <input class="input-offset" type="number" name="off_set_y1" required>
            </div>
            <div class="offset-wrapper-input">
                <label for="">Offset Y2</label>
                <input class="input-offset" type="number" name="off_set_y2" required>
            </div>
        </div>
        @include('frontend.blocks.createMissions.createStep.function.idMission')

        <button class="submit-btn submit-marker">Add</button>
        @csrf
    </form>
    <div class="form-marker-item illustration " markerDir="vl_marker_">
        <img src="/img/marker/vl_marker_front_ward.png" alt="" class="illustration-img">

    </div>
</div>
