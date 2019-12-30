const util = require('./util')
const Pagination = require('./pagination')

function Filter() {

    var self = this

    self.build = build
    
    function build() {

        function filterProducts() {

            function getActiveOption() {

                var options = document.getElementsByClassName( 'option' )
        
                for( let option of options ) {
        
                    if ( option.selected ) return option.value
        
                }
        
            }
        
            var activeOption = getActiveOption()
            Pagination().filterProducts( activeOption )

        }

        var filtersContainer = document.getElementById( 'filters' )

        var selectOptions = util.createElement({
            type: 'select',
            props: {
                onchange: () => {

                    filterProducts()

                }
            }
        })

        var filters = [
            { value: '', label: '' },
            { value: 'ascValue', label: 'Maior valor' },
            { value: 'descValue', label: 'Menor valor' },
            { value: 'descName', label: 'Nome A-Z' },
            { value: 'ascName', label: 'Nome Z-A' },
        ]

        for( let filter of filters ) {

            let filterElement = util.createElement({
                type: 'option',
                classes: ['option'],
                text: filter.label,
                props: {
                    value: filter.value
                }
            })

            selectOptions.appendChild( filterElement )

        }

        filtersContainer.appendChild( selectOptions ) 

    }
}

module.exports = Filter