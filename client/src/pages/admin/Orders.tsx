import React from 'react'
import { isAuthenticated } from '../../api/auth'
import Layout from '../../components/Layout'
import { createProduct } from '../../api/product'
import Alert from "../../components/Alert"
import { AlertEnum } from '../../domain/enums'
import { Link } from 'react-router-dom'
import { getOrders } from '../../api/order'

const OrdersPage: React.FunctionComponent = () => {
  // sets initial state for component
  const [orders, setOrders] = React.useState<any>([])
  const [error, setError] = React.useState<any>('')

  // destructure user and token information from isAuthenticated response
  const { user, token } = isAuthenticated()

  const loadOrders = async () => {
    try {
      const response = await getOrders(user._id, token)

      // check for errors
      if (response.error) {
        setError(response.error);
      }

      setOrders(response)

    } catch (error) {
      console.log(`OrdersPage:loadOrders>>>>Failed to load list of orders: ${error}`)
    }
  }

  // lifecycle method to run everytime the component mounts
  React.useEffect(() => {
    // run loadOrders function to get list of orders
    loadOrders()
  },[])

  return (
    <Layout title="Orders" description={`${user.firstName}, you can manage your orders here`} >
      <div className="row">
      <div className="col-md-8 offset-md-2">
        {/* check if orders have been made */}
        { orders.length < 1 ? <h4>No orders yet</h4> : null }

        {JSON.stringify(orders)}
      </div>

      </div>
    </Layout>
  )
}

export default OrdersPage