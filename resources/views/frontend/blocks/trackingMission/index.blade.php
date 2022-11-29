<div class="tracking-mission-wrapper">
    <div class="step-mission-tracking-wrapper">
        <div class="step-mission-tracking">

        </div>
        <div class="tracking-misison-btn">
            <x-button tag="button" title='stop' class="stop-mission-btn" attribute=""></x-button>
            <x-button tag="button" title='Continue' class="continue-mission-btn" attribute=""></x-button>
        </div>
    </div>
    <div class="map-tracking" id="map">
    </div>
</div>
<style>
    .step-mission-tracking-wrapper {
        display: flex;
    }

    .step-mission-tracking {
        flex: 1;
    }

    .tracking-misison-btn {
        display: flex;
        align-items: flex-end
    }

    .tracking-misison-btn {}

    .stop-mission-btn {
        background: #FF1700;
    }


    .continue-mission-btn {
        background: #54B435;
    }
</style>
