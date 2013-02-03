$( document ).ready(function() {

    multi_graph.load();

    refresh_view = function() {

        // Refresh branch
        $branch = $('#branch-selector .selected');
        if ($branch.length) {
            multi_graph.type = $branch.data('value');
        } else {
            multi_graph.type = 'all';
        }

        // Refresh party
        $party = $('#party-selector .selected');
        if ($party.length) {
            multi_graph.party = $party.data('value');
        } else {
            multi_graph.party = 'all';
        }

        // Refresh gender
        $gender = $('#gender-selector .selected');
        if ($gender.length) {
            multi_graph.gender = $gender.data('value');
        } else {
            multi_graph.gender = 'all';
        }

        // DEBUG
        //console.log(_.pick(multi_graph, 'type', 'party', 'gender'));

        multi_graph.load();
    };


    // Branch selector

    var $senate = $('#branch-selector .senate')
    var $house = $('#branch-selector .house')

    $senate.on('click', function() {
        if ($house.hasClass('selected')) {
            $house.removeClass('selected');
            $house.button('toggle');
        }
        $senate.toggleClass('selected');
        refresh_view();
    });

    $house.on('click', function() {
        var $senate = $('#branch-selector .senate')
        var $house = $('#branch-selector .house')
        if ($senate.hasClass('selected')) {
            $senate.removeClass('selected');
            $senate.button('toggle');
        }
        $house.toggleClass('selected');
        refresh_view();
    });


    // Party selector

    var $democrat = $('#party-selector .democrat')
    var $republican = $('#party-selector .republican')

    $democrat.on('click', function() {
        if ($republican.hasClass('selected')) {
            $republican.removeClass('selected');
            $republican.button('toggle');
        }
        $democrat.toggleClass('selected');
        refresh_view();
    });

    $republican.on('click', function() {
        if ($democrat.hasClass('selected')) {
            $democrat.removeClass('selected');
            $democrat.button('toggle');
        }
        $republican.toggleClass('selected');
        refresh_view();
    });


    // Branch selector

    var $male = $('#gender-selector .male')
    var $female = $('#gender-selector .female')

    $male.on('click', function() {
        if ($female.hasClass('selected')) {
            $female.removeClass('selected');
            $female.button('toggle');
        }
        $male.toggleClass('selected');
        refresh_view();
    });

    $female.on('click', function() {
        if ($male.hasClass('selected')) {
            $male.removeClass('selected');
            $male.button('toggle');
        }
        $female.toggleClass('selected');
        refresh_view();
    });

});
