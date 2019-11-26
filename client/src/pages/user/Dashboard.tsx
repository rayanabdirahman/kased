import React from 'react'
import Layout from '../../components/Layout'
import { isAuthenticated } from '../../api/auth';
import { Link } from 'react-router-dom';
import { getUserPurchaseHistory } from '../../api/user';
import moment from 'moment';

const UserDashboardPage: React.FunctionComponent = () => {
  // sets initial state for component
  const [purchaseHistory, setPurchaseHistory] = React.useState<any>([])
  const [error, setError] = React.useState<any>(false)

  // destructure user information from isAuthenticated response
  const { user, token } = isAuthenticated()
  const name = `${user.firstName} ${user.lastName}`

  // get a list of all categories and set formData
  const onInit = async(userId: string, token: string) => {
    try {
      const response = await getUserPurchaseHistory(userId, token)

      // check for errors
      if (response.error) {
        setError(response.error);
      }

      setPurchaseHistory(response)

    } catch (error) {
      console.log(`Failed to init function on user dashboard page: ${error}`)
    }
    
  }

  // lifecycle method to run everytime the component mounts
  React.useEffect(() => {
    // run onInit function to get user's purchase history
    onInit(user._id, token)
  },[])

  const userLinks = () => (
    <div className="card mb-5">
      <h3 className="card-header">User Links</h3>
      <ul className="list-group">
        <li className="list-group-item"> <Link to="/cart">My Cart</Link></li>
        <li className="list-group-item"><Link to={`/profile/${user._id}`}>Update profile</Link></li>
      </ul>
    </div>
  )

  const userInfo = () => (
    <div className="card mb-5">
      <h3 className="card-header">User Information</h3>
      <ul className="list-group">
        <li className="list-group-item">name: {user ? name : null}</li>
        <li className="list-group-item">email: {user ? user.email : null}</li>
        <li className="list-group-item">role: {user ? user.role === 1 ? 'Admin' : 'Registered USer' : null}</li>
      </ul>
    </div>
  )

  const userHistory = (purchaseHistory: any) => {
    return (
      <div className="card mb-5">
        <h3 className="card-header">Purchase history</h3>
        <ul className="list-group">
          <li className="list-group-item">
            {purchaseHistory.map((history: any, index: number) => {
              return (
                <div>
                  <hr />
                  {history.products.map((product: any, index: number) => {
                    return (
                      <div key={`user-purchased-product--${index}`}>
                        <h6>Product name: {product.name}</h6>
                        <h6>Product price: £{product.price}</h6>
                        <h6>
                            Purchased date:{" "}
                            {moment(product.createdAt).fromNow()}
                        </h6>
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </li>
        </ul>
      </div>
    );
  };


  return (
    <Layout title="User Dashboard" description={`Welcome back ${name}`} >
      <div className="row">
        <div className="col-3">
          {userLinks()}
        </div>
        <div className="col-9">
          {userInfo()}
          {userHistory(purchaseHistory)}
        </div>
      </div>
    </Layout>
  )
}

export default UserDashboardPage;