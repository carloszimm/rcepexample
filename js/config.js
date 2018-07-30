const patternMap = new Map();
patternMap.set('minDistancePattern','#builderMin');
patternMap.set('maxDistancePattern','#builderMax');
patternMap.set('avgDistancePattern','#builderAvg');

let filters={
    id: "distance",
    type: "double",
    input: "text",
    validation: { allow_empty_value: false },
    operators: ["equal", "not_equal", "less", "less_or_equal", "greater", "greater_or_equal"]
}

function filterPattern(idElm){
    
    if(idElm === 0){
        filters.label = "Min Distance"
        return filters;
    }else if(idElm == 1){
        filters.label = "Max Distance"
        return filters;
    }else{
        filters.label = "Avg Distance"
        return filters;
    }
}

function parseQuery(){
    const queryBElem = $(patternMap.get($('#pattype option:selected').val()));
    const expParsed = parseQueryBuilder(queryBElem.queryBuilder('getRules'));
    
    return new Function('distance', 'return ' + expParsed);
}

function validate(){
    if($('form')[0].checkValidity() && $(patternMap.get($('#pattype option:selected').val())).queryBuilder('validate'))
        setPattern();
}

function logInfo( info ){
    $('#log').DataTable().row.add([
        info._eventTypeId, info._detectionTime,
        JSON.stringify(info)
    ]).draw( false );
}

function sendAlert(source, newEventType){
    $.notify({
        // options
        title: source,
        message: `New ${newEventType} event generated!`
    },{
        // settings
        element: 'body',
        position: null,
        type: "warning",
        allow_dismiss: true,
        newest_on_top: false,
        showProgressbar: false,
        placement: {
            from: "top",
            align: "right"
        },
        offset: 20,
        spacing: 10,
        z_index: 1031,
        delay: 5000,
        timer: 1000,
        url_target: '_blank',
        mouse_over: null,
        animate: {
            enter: 'animated fadeInDown',
            exit: 'animated fadeOutUp'
        },
        onShow: null,
        onShown: null,
        onClose: null,
        onClosed: null,
        template: '<div data-notify="container" class="col-xs-11 col-sm-3 alert alert-{0}" role="alert">' +
            '<button type="button" aria-hidden="true" class="close" data-notify="dismiss">×</button>' +
            '<i class="material-icons">warning</i> ' +
            '<span data-notify="title">{1}</span><br> ' +
            '<span data-notify="message">{2}</span>' +
            '<div class="progress" data-notify="progressbar">' +
                '<div class="progress-bar progress-bar-{0}" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;"></div>' +
            '</div>' +
            '<a href="{3}" target="{4}" data-notify="url"></a>' +
        '</div>' 
    });
}

function openModal(data){
    let modal = $('.modal-body');
    modal.empty();
    modal.JSONView(data, {collapsed: true});
    $('#myModal').modal({show:true});
}

$(document).ready(function () {
    $('[data-toggle="tooltip"]').tooltip();

    $('#builderMin').queryBuilder({
        filters: [
            filterPattern(0)
        ]
    });
    $('#builderMax').queryBuilder({
        filters: [
            filterPattern(1)
        ]
    });
    $('#builderAvg').queryBuilder({
        filters: [
            filterPattern(2)
        ]
    });

    $('#pattype').on('change', function(){
        const idBuilder = patternMap.get(this.value);

        for (var val of patternMap.values()) {
            if(val == idBuilder){
                $(val).css('display', 'block');
            }else{
                $(val).css('display', 'none');
            }
        }
    });

    const windowMap = new Map();
    windowMap.set('','#builderMin');
    windowMap.set('minDistancePattern','#builderMin');
    windowMap.set('minDistancePattern','#builderMin');
    windowMap.set('minDistancePattern','#builderMin');
    windowMap.set('minDistancePattern','#builderMin');

    $('#wintype').on('change', function(){
        switch(this.value){
            case "tumblingCountWindow":
                $('#size').attr('placeholder', "");
                $('#size').attr('disabled', true);
                $('#size').attr('required', false);
            break;
            case "slidingCountWindow":
                $('#size').attr('placeholder', "");
                $('#size').attr('disabled', true);
                $('#size').attr('required', false);
            break;
            case "hoppingCountWindow":
                $('#size').attr('placeholder', "starts at");
                $('#size').attr('disabled', false);
                $('#size').attr('required', true);
            break;
            case "tumblingTemporalWindow":
                $('#size').attr('placeholder', "");
                $('#size').attr('disabled', true);
                $('#size').attr('required', false);
            break;
            case "hoppingTemporalWindow":
                $('#size').attr('placeholder', "hop size");
                $('#size').attr('disabled', false);
                $('#size').attr('required', true);
            break;
        }
    });

    $('#log').DataTable({
        "info": false,
        "searching": false,
        "columnDefs": [
            
            {
                "targets": [ 2 ],
                "visible": false,
                "searchable": false
            }
          ]
    });

    $('#log tbody').on('click', 'tr', function () {
        openModal($('#log').DataTable().row(this).data()[2]);   
    });
    
});