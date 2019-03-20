function toggleClass(el, className, el2, className2) {
    var el = document.querySelectorAll(el);
    var el2 = document.querySelectorAll(el2);

    for (i = 0; i < el.length; i++) {

        if (el[i].classList) {
            el[i].classList.toggle(className);
        } else {
            var classes = el[i].className.split(' ');
            var existingIndex = -1;
            for (var j = classes.length; j--;) {
                if (classes[j] === className)
                    existingIndex = j;
            }

            if (existingIndex >= 0)
                classes.splice(existingIndex, 1);
            else
                classes.push(className);

            el[i].className = classes.join(' ');
        }
    }

    if(el2 && className2){
        for (l = 0; l < el2.length; l++) {

            if (el2[l].classList) {
                el2[l].classList.toggle(className2);
            } else {
                var classes2 = el2[l].className.split(' ');
                var existingIndex2 = -1;
                for (var k = classes2.length; k--;) {
                    if (classes2[k] === className)
                        existingIndex2 = k;
                }

                if (existingIndex2 >= 0)
                    classes2.splice(existingIndex2, 1);
                else
                    classes2.push(className2);

                el2[i].className = classes2.join(' ');
            }
        }
    }
}

(function() // Code in a function to create an isolate scope
{
    var speed = 500;
    var moving_frequency = 15; // Affects performance !
    var links = document.getElementsByTagName('a');
    var href;
    for(var i=0; i<links.length; i++)
    {
        href = (links[i].attributes.href === undefined) ? null : links[i].attributes.href.nodeValue.toString();
        if(href !== null && href.length > 1 && href.substr(0, 1) == '#')
        {
            links[i].onclick = function()
            {
                var element;
                var href = this.attributes.href.nodeValue.toString();
                if(element = document.getElementById(href.substr(1)))
                {
                    var hop_count = speed/moving_frequency
                    var getScrollTopDocumentAtBegin = getScrollTopDocument();
                    var gap = (getScrollTopElement(element) - getScrollTopDocumentAtBegin) / hop_count;

                    for(var i = 1; i <= hop_count; i++)
                    {
                        (function()
                        {
                            var hop_top_position = gap*i;
                            setTimeout(function(){  window.scrollTo(0, hop_top_position + getScrollTopDocumentAtBegin); }, moving_frequency*i);
                        })();
                    }
                }

                return false;
            };
        }
    }

    var getScrollTopElement =  function (e)
    {
        var top = 0;

        while (e.offsetParent != undefined && e.offsetParent != null)
        {
            top += e.offsetTop + (e.clientTop != null ? e.clientTop : 0);
            e = e.offsetParent;
        }

        return top;
    };

    var getScrollTopDocument = function()
    {
        return document.documentElement.scrollTop + document.body.scrollTop;
    };
})();