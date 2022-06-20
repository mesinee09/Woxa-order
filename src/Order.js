import { db } from "./firebase";
import { uid } from "uid";
import { set, ref, onValue, remove, update } from "firebase/database";
import { useState, useEffect } from "react";

export default function Order() {
  const [order, setOrder] = useState("");
  const [orderArray, setOrderArray] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [tempId, setTempId] = useState("");

  const handleOrderChange = (e) => {
    setOrder(e.target.value);
  };

  //read
  useEffect(() => {
    onValue(ref(db), (snapshot) => {
      setOrderArray([]);
      const data = snapshot.val();
      if (data !== null) {
        Object.values(data).map((order) => {
          setOrderArray((oldArray) => [...oldArray, order]);
        });
      }
    });
  }, []);

  //write
  const writeToDatabase = () => {
    const id = uid();
    set(ref(db, `/${id}`), {
      order: order,
      id,
    });

    setOrder("");
  };

  //update
  const handleUpdate = (order) => {
    setIsEdit(true);
    setTempId(order.id);
    setOrder(order.order);
  };

  const handleSubmitChange = () => {
    update(ref(db, `/${tempId}`), {
      order: order,
      id: tempId,
    });

    setOrder("");
    setIsEdit(false);
  };

  //delete
  const handleDelete = (order) => {
    remove(ref(db, `/${order.id}`));
  };

  return (

    <section className="overflow-x-auto">
      <h1 className="m-10 text-lg font-bold">WOXA KITCHEN</h1>
      {/* <div>
        {orderArray.map((order) => (
          <>
            <h1 className="m-5"> อาหารที่คุณสั่งคือ {order.order}</h1>
          </>
        ))}
      </div> */}


      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500 ">
          <thead className="text-sm text-gray-700 uppercase bg-gray-50 ">
            <tr>
              <th scope="col" className="px-6 py-3">
                คิวที่
              </th>
              <th scope="col" className="px-6 py-3">
                ชื่อผู้สั่ง
              </th>
              <th scope="col" className="px-6 py-3">
                เมนูที่สั่ง
              </th>
              <th scope="col" className="px-6 py-3">
                สถานะ
              </th>
              <th scope="col" className="px-6 py-3">
                <span className="sr-only">Edit</span>
              </th>
            </tr>
          </thead>
          {orderArray.map((order) => (
            <tr className="bg-white border-b  hover:bg-gray-50">
              <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"> # </td>
              <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"> # name</td>
              <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">{order.order}</td>
              <button className="font-medium py-2 px-5 bg-green-500 hover:bg-green-400 text-white rounded-lg mt-2 mr-10">เสร็จแล้ว</button>
              <button className="font-medium py-2 px-5 bg-red-600 hover:bg-red-400 text-white rounded-lg mr-10">ไม่มีเมนูนี้</button>
            </tr>
          ))}
        </table>
      </div>


    </section>

  );
}
