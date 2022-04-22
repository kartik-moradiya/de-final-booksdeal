import React, { useContext, useEffect } from 'react';
import {GlobalState} from '../../../globleState'
import { Link } from 'react-router-dom';
import axios from 'axios';
import './history.css'
// import Loder from '../util/Loder/Loder';

const OrderHistory = () => {
  const state = useContext(GlobalState)
    const [history, setHistory] = state.UserApi.history
    const [isAdmin] = state.UserApi.isAdmin
    const [token] = state.token
    
  useEffect(() => {
    if(token){
        const getHistory = async() =>{
            if(isAdmin){
                const res = await axios.get('http://localhost:5000/api/payment', {
                    headers: {Authorization: token}
                })
                setHistory(res.data)
            }else{
                const res = await axios.get('http://localhost:5000/user/history', {
                    headers: {Authorization: token}
                })
                setHistory(res.data)
            }
        }
        getHistory()
    }
},[token, isAdmin, setHistory])

  return (
    <>
      <h2>History</h2>
      <h4>you have <span className='order-len'>{history.length}</span>  ordered</h4>
    <div className='his-cont'>
      <table>
                <thead>
                    <tr>
                        <th>Payment ID</th>
                        <th>Date of Purchased</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        history.map(items => (
                            <tr key={items._id}>
                                <td className='paymentId'>{items.paymentID}</td>
                                <td>{new Date(items.createdAt).toLocaleDateString()}</td>
                                <td><Link to={`/history/${items._id}`}>View</Link></td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
    </div>
    </>
  );
}

export default OrderHistory;
