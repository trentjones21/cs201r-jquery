$(function () {
    "use strict";

    var chat = $('#chat');
    var chatDiv = $('#chatDiv');
    var input = $('#input');
    var status = $('#status');
    var youtube = $('#youtube');

    var myColor = false;
    var myName = false;

    window.WebSocket = window.WebSocket || window.MozWebSocket;

    if (!window.WebSocket) {
        chat.html($('<p>', { text: 'Sorry, but your browser doesn\'t '
        + 'support WebSockets.'} ));
        input.hide();
        $('span').hide();
        return;
    }

    var connection = new WebSocket('ws://tkj-websocket-chat.herokuapp.com');

    connection.onopen = function () {
        input.removeAttr('disabled');
        status.text('Choose name:');
    };

    connection.onerror = function (error) {
        chat.html($('<p>', { text: 'Sorry, but there\'s some problem with your '
        + 'connection or the server is down.' } ));
    };

    connection.onmessage = function (message) {
        try {
            var json = JSON.parse(message.data);
        } catch (e) {
            console.log('This doesn\'t look like a valid JSON: ', message.data);
            return;
        }

        if (json.type === 'color') {
            myColor = json.data;
            status.text(`Posting as ${myName}:`).css('color', myColor);
            input.removeAttr('disabled').focus();
        } else if (json.type === 'history') {
            // for (var i=0; i < json.data.length; i++) {
            //     addMessage(json.data[i].author, json.data[i].text, json.data[i].color, new Date(json.data[i].time));
            // }
        } else if (json.type === 'message') {
            input.removeAttr('disabled');
            addMessage(json.data.author, json.data.text, json.data.color, new Date(json.data.time));
        } else if (json.type === 'youtube') {
            input.removeAttr('disabled');
            youtube.html(`
                <div class='container'>
                    <iframe class='video' id="youtubeFrame" src="https://www.youtube.com/embed/${json.youtubeId}?autoplay=1&rel=0&amp;controls=0" frameborder="0">
                    </iframe>
                </div>
            `);
            addMessage(json.data.author, json.data.text, json.data.color, new Date(json.data.time));
        } else {
            console.log('Hmm..., I\'ve never seen JSON like this: ', json);
        }
    };

    input.keydown(function(e) {
        if (e.keyCode === 13) {
            var msg = $(this).val();
            if (!msg) {
                return;
            }

            connection.send(msg);
            $(this).val('');

            if (myName === false) {
                myName = msg;
            }
        }
    });

    setInterval(function() {
        if (connection.readyState !== 1) {
            status.text('Error');
            input.attr('disabled', 'disabled').val('Unable to comminucate '
            + 'with the WebSocket server.');
        }
    }, 10000);

    function addMessage(author, message, color, dt) {
        var strippedString = message.replace(/(<([^>]+)>)/ig,"");
        var strippedAuthor = author.replace(/(<([^>]+)>)/ig,"");
        chat.append(`
            <p class="message">
            <span style="color:${color}">${strippedAuthor}</span>
            ${strippedString}
            </p>
        `);
        chat.scrollTop(40000);
        chatDiv.scrollTop(40000);
    }

    $(window).resize(function() {
        var newWidth = youtube.width;

        var $el = $('#youtubeFrame');
        console.log('$el', $el);
        console.log('$el.data("aspectRatio")', $el.data("aspectRatio"));
        $el.width(newWidth).height(newWidth * $el.data('aspectRatio'));
    });

});
