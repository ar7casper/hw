/**
 * Created by Alex on 16/03/2016.
 */

// rotate

var rotationManager = {
    delay: 2000,
    rotating: false,
    currentPosition: 0,
    aggregatedPosition: 0,
    timeoutId: null,
    queue: [],

    loadCurrentPosition: function (cb) {
        var position;

        $.get('/getPosition', function (data) {
            console.log(data);
            position = data.position;

            this.currentPosition = position;
            cb(position);
        });

    },
    storeCurrentPosition: function () {
        var that = this;

        console.log('position that is sent to the server', that.currentPosition);

        $.get('/setPosition?pos=' + that.currentPosition);
        return null;
    },
    startTimer: function () {
        var that       = this;
        this.timeoutId = window.setTimeout(function () {
            that.storeCurrentPosition();
        }, this.delay);
    },
    timerReset: function () {
        window.clearTimeout(this.timeoutId);
    },
    addToQueue: function () {
        this.queue.push(true);
    },
    rotate: function (direction) {

        this.addToQueue();

        if (this.queue.length <= 1) {

            this.queue.shift();
            this.timerReset();

            this.aggregatedPosition = (direction === 'cw' ? this.aggregatedPosition + 90 : this.aggregatedPosition - 90);

            $('.imgWrap img').css({
                "transform": "rotateZ(" + this.aggregatedPosition + "deg)"
            });

            this.currentPosition = ((this.aggregatedPosition >= 360 || this.aggregatedPosition <= -360) ? this.aggregatedPosition % 360 : this.aggregatedPosition);
            this.startTimer();

            if (this.queue.length > 0) {
                this.rotate();
            }
        }

    },
    init: function () {
        var direction = this.loadCurrentPosition(function (position) {
            console.log('direction', position);

            $('.imgWrap img').css({
                "transform": "rotateZ(" + position + "deg)"
            });

        });
    }
};

//rotationManager.loadCurrentPosition();
$(document).ready(function () {

    rotationManager.init();

    $('button').on('click', function (e) {
        var direction = e.target.id;
        rotationManager.rotate(direction);
    });

});


