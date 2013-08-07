window.Kamerleed = window.Kamerleed || {};
window.Kamerleed.interval = 5000;
window.Kamerleed.loopingEnabled = false;

window.Kamerleed.init = function() {
    // detemine what to load
    if (window.location.pathname == '/') {
        // get random member
        console.log('homepage, should get a random member now ...');
        $.get('/persons/random/json', function (data) {
            var slug = data['slug'];
            console.log('Should fetch data for ' + slug + ' now ...');
        }, 'json');
    } else if (person_match = window.location.pathname.match(/^\/persons\/([a-zA-z\-]+)\/?/)) {
        var slug = person_match[1];
        console.log('Politician page, should fetch data for ' + slug + ' now ...');
    } else {
        console.log('At a totally random path ...');
    }
};

window.Kamerleed.refresh = function() {
    $('#marker').fadeOut(500, function() {
        $('#marker').removeClass('block1 block2 block3 block4 block5 block6 block7 blockundefined').addClass('block' + window.Kamerleed.details.mp.blockId);
        $('#marker div.avatar').attr('style', 'background: url(http://www.tweedekamer.nl' + window.Kamerleed.details.mp.photo + ');');
        $('#marker div.avatar img').attr('src', 'http://www.tweedekamer.nl/images/' + window.Kamerleed.details.mp.party.__content__.toLowerCase() + '.jpg');
        $('#marker p.sentence').text(window.Kamerleed.details.sentence);
        $('#marker').fadeIn();        
    });
};

window.Kamerleed.update = function() {
    $.get('/json/details', function (data) {
        window.Kamerleed.details = data;
        window.Kamerleed.refresh();
    });
};

window.Kamerleed.looper = function() {
/*
    window.Kamerleed.update();
    if (window.Kamerleed.loopingEnabled) {
        setTimeout(function() {
            window.Kamerleed.looper();
        }, window.Kamerleed.interval);
    }
*/
};

$(document).ready(function() {
    console.log('kamerleed');
    window.Kamerleed.init();
/*
    setTimeout(function() {
        window.Kamerleed.looper();
    }, window.Kamerleed.interval);
*/
});