import { db } from "./firebase";
import { set, ref, onValue } from "firebase/database";
import { useState, useEffect } from "react";
import liff from "@line/liff";

export default function Form() {
  const [order, setOrder] = useState("");
  const [orderArray, setOrderArray] = useState([]);
  const [name, setName] = useState("");
  const [userLineID, setUserLineID] = useState("");

  async function fetchUserData() {
    //TODO: store line user name
    await liff
      .init({
        liffId: "1657227261-LoEv9bAp",
        withLoginOnExternalBrowser: true,
      })
      .then(() => {
        let getProfile = liff.getProfile();
        setName(getProfile.displayName);
        setUserLineID(getProfile.userId);
      })
      .catch((err) => {
        console.log(err.code, err.message);
        liff.closeWindow();
      });
  }

  useEffect(() => {
    fetchUserData();
  }, []);

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
    const id = userLineID;
    set(ref(db, `/${id}`), {
      order: order,
      id,
      name
    });

    setOrder("");
  };

  return (
    <section className="relative flex flex-wrap lg:h-screen lg:items-center">
      <div className="w-full px-4 py-12 lg:w-1/2 sm:px-6 lg:px-8 sm:py-16 lg:py-24">
        <div className="max-w-lg mx-auto text-center">
          <h1 className="text-2xl font-bold sm:text-3xl">WOXA KITCHEN</h1>

          <p className="mt-4 text-gray-500">สั่งอาหารได้เลย</p>
        </div>

        <form className="max-w-md mx-auto mt-8 mb-0 space-y-4">
          <div>
            <div className="relative">
              <input
                type="text"
                name="order"
                value={order}
                onChange={handleOrderChange}
                className="w-full p-4 pr-12 text-sm border-gray-500 rounded-lg bg-gray-100 shadow-sm"
                placeholder="กะเพราทะเล + ไข่ดาว"
              />

              {
                /* {isEdit ? (
                <>
                  <button onClick={handleSubmitChange}>Submit Change</button>
                  <button
                    onClick={() => {
                      setIsEdit(false);
                      setOrder("");
                    }}
                  >
                  </button>
                </>
              ) : (*/
                <button
                  className="inline-block mt-5 px-5 py-3 ml-3 text-sm font-medium text-white bg-blue-500 rounded-lg"
                  onClick={writeToDatabase}
                >
                  สั่งอาหาร
                </button>
                /* )}
              {orderArray.map((order) => (
                <>
                  <h1 className="m-5"> อาหารที่คุณสั่งคือ {order.order}</h1>
                  <button
                    className="inline-block m-5 px-5 py-3 ml-3 text-sm font-medium text-white bg-green-500 rounded-lg"
                    onClick={() => handleUpdate(order)}>update
                  </button>
                  <button
                    className="inline-block m-5 px-5 py-3 ml-3 text-sm font-medium text-white bg-red-500 rounded-lg"
                    onClick={() => handleDelete(order)}>delete
                  </button>
                </>
              ))} */
              }
            </div>
          </div>
        </form>
      </div>
      <div className="relative w-full h-64 sm:h-96 lg:w-1/2 lg:h-full">
        <img
          className="absolute inset-0 object-cover w-full h-full"
          src="https://baansongthaimhs.com/wp-content/uploads/2021/09/%E0%B9%80%E0%B8%A1%E0%B8%99%E0%B8%B9%E0%B8%81%E0%B8%A5%E0%B8%B2%E0%B8%87%E0%B8%A7%E0%B8%B1%E0%B8%99_Page_03.jpg"
          alt=""
        />
      </div>
    </section>
  );
}
