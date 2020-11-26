import React, {useState,useEffect} from 'react';
import { db } from '../firebase';
import { useStateValue } from '../StateProvider';
import Order from './Order';

function Orders(){
	const [{user}] = useStateValue();
	const [orders, setOrders] = useState([]);

	useEffect(()=>{
		if(user){
			db.collection("users")
			.doc(user?.uid)
			.collection("order")
			.orderBy("created","desc")
			.onSnapshot(snapshot =>{
			setOrders(snapshot.docs.map(doc =>({
					id:doc.id,
					data:doc.data()
				})))
			})
		}else{
			setOrders([])
		}
	},[user])

	console.log(orders)

	return(
		<div className="orders">
		{orders?.map(order =>
		<Order order={order}/>	
		)}

		</div>
	)
}

export default Orders;