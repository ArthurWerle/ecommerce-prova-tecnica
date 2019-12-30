module.exports = {

    createElement({ type, props, classes, text }) {

        function addProps( element, props ) {

            Object.keys( props ).forEach( prop => element[ prop ] = props[ prop ] )

        }

        function addClasses( element, classes ) {

            for( var cssClass of classes ) {

                element.classList.add( cssClass )

            }

        }

        function addText( element, text ) {

            const textNode = document.createTextNode( text )

            element.appendChild( textNode )
        }

        const elem = document.createElement( type )
    
        if ( props ) addProps( elem, props )
        if ( text ) addText( elem, text )
        if ( classes ) addClasses( elem, classes )
    
        return elem
    },

    removeChildrenElementsById( id ) {

        var element = document.getElementById( id )

        while ( element.childNodes.length > 0 ) {

            element.childNodes[0].parentNode.removeChild( element.childNodes[0] )

        }

    }

}