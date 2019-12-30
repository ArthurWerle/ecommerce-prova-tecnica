import "./front-end/categoria-owme-es6-sass/scss/main.scss"
import ProductsFile from './front-end/categoria-owme-es6-sass/src/mock-products.json'
import getPagination from './front-end/categoria-owme-es6-sass/js/pagination'
import Filter from './front-end/categoria-owme-es6-sass/js/filters'
import Sidebar from './front-end/categoria-owme-es6-sass/js/sidebar'

const pagination = getPagination( ProductsFile.products, 20 )
pagination.go()

new Filter().build()
new Sidebar().build()