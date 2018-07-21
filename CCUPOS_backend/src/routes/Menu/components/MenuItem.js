import React, {Component, PropTypes} from 'react'

export default class MenuItem extends Component {

    static propTypes = {
        product: PropTypes.object.isRequired,
        addToCart: PropTypes.func.isRequired
    }

    handleAddToCart = () => {
        const {product, addToCart} = this.props
        addToCart(product.id)
    }

    render () {
        const {product} = this.props
        return (
            <li>
                <h>{product.title}</h>
                <button
                onClick={this.handleAddToCart}
                disabled={product.inventory > 0 ? false : true}
                >
                    {product.inventory > 0 ? 'add to cart' : 'sold out'}
                </button>
            </li>
        )
    }
}
