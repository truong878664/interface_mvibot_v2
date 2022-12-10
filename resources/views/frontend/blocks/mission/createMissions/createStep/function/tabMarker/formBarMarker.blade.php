    <button class="close-form-marker-btn x-btn"><i class="fa-solid fa-xmark"></i></button>
    <div class="marker-title">Bar Marker</div>
    <div class="wrapper-marker">
        <form class="form-marker-item form-marker" action="/dashboard/missions/create-marker" method="POST">
            <div class="offset-wrapper-all">
                <div class="offset-wrapper-input">
                    <label for="">Name</label>
                    <input required name="name_marker" class="input-offset" type="text">
                </div>
                <input name="marker_type" class="input-offset" type="text" value="bar_marker" hidden>

                <div class="offset-wrapper-input">
                    <label for="">Marker dir</label>
                    <select name="marker_dir" class="input-offset marker_dir_input">
                        <option value="front_ward">Front ward</option>
                        <option value="back_ward">Back ward</option>
                    </select>
                </div>
                <div class="offset-wrapper-input">
                    <label for="">Offset X1</label>
                    <input name="off_set_x1" class="input-offset" type="number" required>
                </div>
                <div class="offset-wrapper-input">
                    <label for="">Offset X2</label>
                    <input name="off_set_x2" class="input-offset" type="number" required>
                </div>

                <div class="offset-wrapper-input">
                    <label for="">Offset Y1</label>
                    <input name="off_set_y1" class="input-offset" type="number" required>
                </div>
                <div class="offset-wrapper-input">
                    <label for="">Offset Y2</label>
                    <input name="off_set_y2" class="input-offset" type="number" required>
                </div>
                <div class="offset-wrapper-input">
                    <label for="">new input</label>
                    <input name="off_set" class="input-offset" type="text">
                </div>
                @include('frontend.blocks.mission.createMissions.createStep.function.idMission')
            </div>
            <x-button tag="button" title="Add" class="submit-marker" attribute=""></x-button>

            @csrf
        </form>
        <div class="form-marker-item illustration" markerDir="bar_marker_">
            <img src="/img/marker/bar_marker_front_ward.png" alt="" class="illustration-img">
        </div>
    </div>
