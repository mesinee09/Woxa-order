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
    <section className="relative flex flex-wrap lg:h-screen lg:items-center">
      <div>
        {orderArray.map((order) => (
          <>
            <h1 className="m-5"> อาหารที่คุณสั่งคือ {order.order}</h1>
          </>
        ))}
      </div>


      <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table class="w-full text-sm text-left text-gray-500 ">
          <thead class="text-xs text-gray-700 uppercase bg-gray-50 ">
            <tr>
              <th scope="col" class="px-6 py-3">
                คิวที่
              </th>
              <th scope="col" class="px-6 py-3">
                ชื่อผู้สั่ง
              </th>
              <th scope="col" class="px-6 py-3">
                เมนูที่สั่ง
              </th>
              <th scope="col" class="px-6 py-3">
                Category
              </th>
              <th scope="col" class="px-6 py-3">
                Price
              </th>
              <th scope="col" class="px-6 py-3">
                <span class="sr-only">Edit</span>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr class="bg-white border-b  hover:bg-gray-50 ">
              <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                Apple MacBook Pro 17"
              </th>
              <td class="px-6 py-4">
                Sliver
              </td>
              <td class="px-6 py-4">
                Laptop
              </td>
              <td class="px-6 py-4">
                $2999
              </td>
              <td class="px-6 py-4 text-right">
                <a href="#" class="font-medium text-blue-600 hover:underline">Edit</a>
              </td>
            </tr>
            <tr class="bg-white border-b  hover:bg-gray-50 ">
              <th scope="row" class="px-6 py-4 font-medium text-gray-900  whitespace-nowrap">
                Microsoft Surface Pro
              </th>
              <td class="px-6 py-4">
                White
              </td>
              <td class="px-6 py-4">
                Laptop PC
              </td>
              <td class="px-6 py-4">
                $1999
              </td>
              <td class="px-6 py-4 text-right">
                <a href="#" class="font-medium text-blue-600 hover:underline">Edit</a>
              </td>
            </tr>
            <tr class="bg-white hover:bg-gray-50 ">
              <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                Magic Mouse 2
              </th>
              <td class="px-6 py-4">
                Black
              </td>
              <td class="px-6 py-4">
                Accessories
              </td>
              <td class="px-6 py-4">
                $99
              </td>
              <td class="px-6 py-4 text-right">
                <a href="#" class="font-medium text-blue-600 hover:underline">Edit</a>
              </td>
            </tr>
          </tbody>
        </table>
      </div>


    </section>

  );
}
