const util = require('./util')

function Pagination ( products, quantityPerSet ) {
    
    var local = {
        originalProductsArray: products,
        products: products,
        quantityPerSet: quantityPerSet,
        pages: {}
    }

    var self = this
    self.createProductElements = createProductElements
    self.createPreviousPageButton = createPreviousPageButton
    self.createNextPageButton = createNextPageButton
    self.getLastPage = getLastPage
    self.setAllPagesToInactive = setAllPagesToInactive
    self.setPageInactive = setPageInactive
    self.setPageActive = setPageActive
    self.goBackwards = goBackwards
    self.goFoward = goFoward
    self.go = go
    self.createPaginationElement = createPaginationElement
    self.buildPages = buildPages
    self.filterProducts = filterProducts
    
    render()

    function render() {

        var pagination = buildPages()

        local.pages = pagination.pages 
        local.index = 0

    }

    function createProductElements() {

        const itemsContainter = document.getElementById( 'items-container' )

        for( var product of local.pages[ local.index ] ) {

            var productContainer = util.createElement({ type: `div`, classes: [ 'row', 'align', 'center'] })
            var productElement = util.createElement({ type: `div`, classes: [ 'product', 'align', 'center'] })
            var productImage = util.createElement({ type: `img`, props: { src: product.image }, classes: [ 'image' ] })
            var productDescriptionElement = util.createElement({ type: `div`, text: product.name, classes: [ 'bolder' ] })
            var productPriceElement = util.createElement({ type: `div`, text: `R$ ${product.price}`, classes: [ 'bolder' ] })
        
            productElement.appendChild( productImage )
            productElement.appendChild( productDescriptionElement )
            productElement.appendChild( productPriceElement )
        
            productContainer.appendChild( productElement )
        
            itemsContainter.appendChild( productContainer )
        
        }

    }

    function createPreviousPageButton() {

        var previousPageElement = util.createElement(
            { 
                type: 'button', 
                text: '<', 
                props: { id: 'previousPage' },
                classes: [ 'row', 'page', 'control', 'previous' ]
            }
        )

        previousPageElement.addEventListener( 'click', () => {

            goBackwards()

        })

        return previousPageElement
    }

    function createNextPageButton() {
        
        var nextPageElement = util.createElement(
            { 
                type: 'button', 
                text: '>', 
                props: { id: 'nextPage' },
                classes: [ 'row', 'page', 'control', 'next' ]
            }
        )

        nextPageElement.addEventListener( 'click', () => {

            goFoward()

        })

        return nextPageElement
    }

    function getLastPage() {

        var lastPage = 0

        Object.keys( local.pages ).forEach( pageNumber => {

            lastPage = pageNumber

        })

        return lastPage

    } 
    
    function isFirstPage( to ) {
        return to === 0
    }

    function isLastPage( to ) {

        return to === Number( getLastPage() )

    }

    function setAllPagesToInactive() {

        Object.keys( local.pages ).forEach( pageNumber => {

            setPageInactive( pageNumber )

        })

    }

    function setPageInactive( pageNumber ) {

        var element = document.getElementById( pageNumber )

        element.classList.remove( 'active' )

    }

    function validateControlButtons( pageNumber ) {

        if ( isFirstPage( pageNumber ) ) setPreviousPageButtonDisabled()
        else setPreviousPageButtonEnabled()

        if ( isLastPage( pageNumber ) ) setNextPageButtonDisabled()
        else setNextPageButtonEnabled()

    }

    function setPageActive( pageNumber ) {

        setAllPagesToInactive()
        validateControlButtons( pageNumber )

        var element = document.getElementById( pageNumber )

        element.classList.add( 'active' )

    }

    function setPreviousPageButtonEnabled() {

        var previousPageElement = document.getElementById( 'previousPage' )

        previousPageElement.removeAttribute( 'disabled' )

    }

    function setPreviousPageButtonDisabled() {

        var previousPageElement = document.getElementById( 'previousPage' )

        previousPageElement.setAttribute( 'disabled', true )

    }

    function goBackwards() {

        var to = null

        if ( ( local.index - 1 ) < 0 ) {
            
            to = 0

        } else {
            
            to = local.index - 1

        }

        go ( to )

    }

    function setNextPageButtonEnabled() {

        var nextPageElement = document.getElementById( 'nextPage' )

        nextPageElement.removeAttribute( 'disabled' )

    }

    function setNextPageButtonDisabled() {

        var nextPageElement = document.getElementById( 'nextPage' )

        nextPageElement.setAttribute( 'disabled', true )

    }

    function goFoward() {

        var to = null

        if ( !local.pages[ local.index + 1 ] ) {
            
            to = getLastPage()

        } else {
            
            to = local.index + 1

        }

        go ( to )

    }

    function go( index ) {

        util.removeChildrenElementsById( 'items-container' )

        paginationIndex = index ? index : 0 

        local.index = paginationIndex

        setPageActive( paginationIndex )
        createProductElements()

    }

    function createPaginationElement( pages ) {

        util.removeChildrenElementsById( 'pagination-container' )

        var paginationContainter = document.getElementById( 'pagination-container' )

        var previousPageElement = createPreviousPageButton()
        paginationContainter.appendChild( previousPageElement )

        Object.keys( pages ).forEach( pageNumber => {

            var pageElement = util.createElement(
                { 
                    type: 'div', 
                    text: Number(pageNumber) + 1, 
                    props: { id: pageNumber },
                    classes: [ 'row', 'pagination' ]
                }
            )

            pageElement.addEventListener('click', () => {

                go( pageNumber )

            })

            paginationContainter.appendChild( pageElement )

        })

        var nextPageElement = createNextPageButton()
        paginationContainter.appendChild( nextPageElement )

    }

    function buildPages() {

        const pages = {}
        var productsCount = 0
        var paginationIndex = 0

        for( let product of local.products ) {

            if ( productsCount === local.quantityPerSet ) {

                productsCount = 0
                paginationIndex++
                pages[ paginationIndex ] = []

            }

            if  ( !pages[ paginationIndex ] ) pages[ paginationIndex ] = []

            pages[ paginationIndex ].push( product )
            productsCount++

        }

        createPaginationElement( pages )

        return {
            paginationIndex: paginationIndex,
            pages: pages
        }

    }

    function filterProducts( type ) {

        function sortAsc( items, field ) {

            return items.sort( ( a, b ) => {

                if ( a[field] > b[field] ) return -1

                if ( a[field] < b[field] ) return 1

                return 0

            })

        }

        function sortDesc( items, field ) {

            return items.sort( ( a, b ) => {

                if ( a[field] < b[field] ) return -1

                if ( a[field] > b[field] ) return 1

                return 0

            })

        }

        var filteredProducts = []
        var products = local.originalProductsArray

        switch( type ) {

            case 'ascValue':
                filteredProducts = sortAsc( products, 'price' )

                break

            case 'descValue':
                filteredProducts = sortDesc( products, 'price' )

                break

            case 'ascName':
                filteredProducts = sortAsc( products, 'name' )

                break

            case 'descName':
                filteredProducts = sortDesc( products, 'name' )

                break

        }

        if ( filteredProducts.length ) {

            local.products = filteredProducts
            
            render()
            go()

        }

    }
}

var paginationInstace = null

module.exports = ( products, quantityPerSet ) => {

    if ( !paginationInstace ) paginationInstace = new Pagination( products, quantityPerSet )

    return paginationInstace
}