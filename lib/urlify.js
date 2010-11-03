var LATIN_MAP = {
    'à':'a', 'á':'a', 
		'è':'e', 'é':'e', 
		'ì':'i', 'í':'i', 
		'ò':'o', 'ó':'o', 
		'ù':'u', 'ú':'u',
    'ü':'u', 'ñ':'n'
};


var Downcoder = {};
Downcoder.Initialize = function()
{
    Downcoder.map = {};
    Downcoder.chars = '' ;

    for (var c in LATIN_MAP)
    {
        Downcoder.map[c] = LATIN_MAP[c] ;
        Downcoder.chars += c ;
    }
    Downcoder.regex = new RegExp('[' + Downcoder.chars + ']|[^' + Downcoder.chars + ']+','g') ;
};

var downcode= function( slug )
{
    Downcoder.Initialize() ;
    var downcoded ="";
    var pieces = slug.match(Downcoder.regex);
    if(pieces)
    {
        for (var i = 0 ; i < pieces.length ; i++)
        {
            if (pieces[i].length == 1)
            {
                var mapped = Downcoder.map[pieces[i]] ;
                if (mapped !== null)
                {
                    downcoded+=mapped;
                    continue ;
                }
            }
            downcoded+=pieces[i];
        }
    }
    else
    {
        downcoded = slug;
    }
    return downcoded;
};

