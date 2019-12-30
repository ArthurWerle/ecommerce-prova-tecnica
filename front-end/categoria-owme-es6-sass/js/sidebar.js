const util = require('./util')

function Sidebar() {

    var self = this

    self.build = build
    
    function build() {

        function buildMenuItems ( sidebarElement ) {

            var defaultClasses = [ 'sidebar-item' ]

            var menuItems = [
                {
                    label: 'SAPATOS',
                    classes: defaultClasses.concat( [ 'bolder' ] )
                },
                {
                    label: 'NOVIDADES',
                    classes: defaultClasses.concat( [ 'bolder' ] )
                },
                {
                    label: 'QUEM SOMOS',
                    classes: defaultClasses.concat( [ 'bolder' ] )
                },
                {
                    label: 'BAZAR',
                    classes: defaultClasses.concat( [ 'text-active'] )
                },
                {
                    label: 'MINHA CONTA',
                    classes: defaultClasses
                }
            ]

            for( let item of menuItems ) {

                var menuItemElement = util.createElement({
                    type: 'a',
                    text: item.label,
                    classes: item.classes
                })

                sidebarElement.appendChild( menuItemElement )

            }

        }

        function createCloseButton() {

            return util.createElement({
                type: 'img',
                classes: [ 'closebtn', 'mini-img' ],
                props: {
                    src: '/img/close.png',
                    href: 'javascript:void(0)',
                    onclick: () => {
                        document.getElementById("sidebar").style.width = "0"
                    }
                }
            })

        }

        function createOpenButton() {

            return util.createElement({
                type: 'img',
                classes: [ 'openbtn', 'mini-img' ],
                props: {
                    src: '/img/sidebar.png',
                    onclick: () => {
    
                        document.getElementById("sidebar").style.width = '350px';
    
                    }
                }
            })

        }

        var headerContainer = document.getElementById( 'header' )

        var openSidebarButton = createOpenButton()

        var sidebarElement = util.createElement({
            type: 'div',
            classes: [ 'sidebar' ],
            props: {
                id: 'sidebar'
            }
        })

        var closeSidebarButton = createCloseButton()

        sidebarElement.appendChild( closeSidebarButton )

        buildMenuItems( sidebarElement )

        headerContainer.appendChild( openSidebarButton )
        document.body.appendChild( sidebarElement )

    }
}

module.exports = Sidebar