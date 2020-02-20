let DATAIL_IMAGE_SELECTOR = '[data-image-role="target"]';
let DETAIL_TITLE_SELECTOR = '[data-image-role="title"]';
let DETAIL_FRAME_SELECTOR = '[data-image-role="frame"]';
let THUMBNAIL_LINK_SELECTOR = '[data-image-role="trigger"]';
let HIDDEN_DETAIL_CLASS = 'hidden-detail'
let TINY_EFFECT_CLASS = 'is-tiny';
let ESC_KEY = 27;


function setDetails(imgUrl, titleText)
{
    'use strict';
    let detailImage = document.querySelector( DATAIL_IMAGE_SELECTOR );
    detailImage.setAttribute( 'src', imgUrl);
    
    let  detailTitle = document.querySelector( DETAIL_TITLE_SELECTOR );
    detailTitle.textContent = titleText;
    console.log( imgUrl, titleText );
}

function imageFromThumb( thumbnail ){
    'use strict';
    return thumbnail.getAttribute( 'data-image-url' );
}

function titleFromThumb( thumbnail ){
    'use strict';
    return thumbnail.getAttribute( 'data-image-title' );
}

function setDetailsFromThumb( thumbnail ){
    'use strict';
    setDetails( imageFromThumb( thumbnail ), titleFromThumb( thumbnail ) );
}

function addThumbClickHandler( thumb )
{
    'use strict';
    thumb.addEventListener('click', (e) => {
        e.preventDefault();
        setDetailsFromThumb( thumb );
        showDetails();
    });
}

function getThumbnailsArray() 
{
    'use strict';
    let thumbnails = document.querySelectorAll( THUMBNAIL_LINK_SELECTOR );
    let thumbnailArray = [].slice.call( thumbnails );
    return thumbnailArray;
}

function hideDetails()
{
    'use strict';
    document.body.classList.add( HIDDEN_DETAIL_CLASS );
}

function showDetails()
{
    'use strict';
    let frame = document.querySelector( DETAIL_FRAME_SELECTOR );
    document.body.classList.remove( HIDDEN_DETAIL_CLASS );
    frame.classList.add( TINY_EFFECT_CLASS );
    setTimeout( () => {
        frame.classList.remove( TINY_EFFECT_CLASS );
    }, 50);
}

function addKeyPressHandler()
{
    'use strict';
    document.body.onkeyup = (e) =>
    {
        e.preventDefault();
        console.log(e.keyCode);
        if(e.keyCode === ESC_KEY)
        {
            hideDetails();
        }
    };
}

function initializeEvents(){
    'use strict';
    let thumbnals = getThumbnailsArray();
    thumbnals.forEach( addThumbClickHandler );
    addKeyPressHandler();
}

initializeEvents();