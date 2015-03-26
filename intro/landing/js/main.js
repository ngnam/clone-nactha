'use strict';

jQuery(document).ready(function(e) {
    $('img.lazy-image').lazyload({
        effect : "fadeIn"
    });

    initPopup('.fancybox');

    $('#images-list  li a').click(function(event){
        event.preventDefault(); 
        var __filename = $(this).attr('href');
        var x = new XMLHttpRequest();
        x.open("GET", __filename, true);
        x.responseType = 'blob';
        x.onload = function(e) {
            download(x.response, __filename, "image/gif");
        }
        x.send();        
        
    });

     $('ul.tabs').each(function(){
        // For each set of tabs, we want to keep track of
        // which tab is active and it's associated content
        var $active, $content, $links = $(this).find('a');

        // If no match is found, use the first link as the initial active tab.
        $active = $($links.filter('[href="'+location.hash+'"]')[0] || $links[0]);
        $active.addClass('active');

        $content = $($active[0].hash);       

        // Hide the remaining content
        $links.not($active).each(function () {
            $(this.hash).hide();
        });

        // Bind the click event handler
        $(this).on('click', 'a', function(e){
            
            if($(this).attr('target')!="_blank") {
                // Make the old tab inactive.
                $active.removeClass('active');
                $content.hide();

                // Update the variables with the new link and content
                $active = $(this);
                $content = $(this.hash);

                // Make the tab active.
                $active.addClass('active');
                $content.show();

                // Prevent the anchor's default click action
                e.preventDefault();
            }    
        });
    });    

});

function SaveToDisk(fileURL, fileName) {
    // for non-IE
    console.log(fileURL)
    if (!window.ActiveXObject) {
        var save = document.createElement('a');
        save.href = fileURL;
        save.target = '_blank';
        save.download = fileName || 'unknown';

        var event = document.createEvent('Event');
        event.initEvent('click', true, true);
        save.dispatchEvent(event);
        (window.URL || window.webkitURL).revokeObjectURL(save.href);
    }

    // for IE
    else if ( !! window.ActiveXObject && document.execCommand)     {
        var _window = window.open(fileURL, '_blank');
        _window.document.close();
        _window.document.execCommand('SaveAs', true, fileName || fileURL)
        _window.close();
    }
}


var initPopup = function(selector) {
    if ($(selector).length > 0) {
        $(selector).fancybox({
            openEffect: 'elastic',
            autoCenter: true,
            padding: [7, 7, 7, 7],
            helpers: {
                title: {
                    type: 'inside'
                },
                media: {}
            },
            nextEffect: 'elastic',
            prevEffect: 'elastic'
        });
    }
}
