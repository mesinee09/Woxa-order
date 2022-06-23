import { db } from "./firebase";
import { set, ref } from "firebase/database";
import { useState, useEffect } from "react";
import liff from "@line/liff";
import axios from "axios";

export default function App() {
  const [order, setOrder] = useState("");
  const [name, setName] = useState("");
  const [userLineID, setUserLineID] = useState("");

  async function fetchUserData() {
    await liff
      .init({
        liffId: "1657241409-84wE6eoj",
        withLoginOnExternalBrowser: true,
      })
      .then(async () => {
        let getProfile = await liff.getProfile();
        setName(getProfile.displayName);
        setUserLineID(getProfile.userId);
      })
      .catch((err) => {
        console.log(err.code, err.message);
        liff.closeWindow();
      });
  }

  async function receiveOrder(userId, order) {
    try {
      await axios.post("https://woxa-food-order.herokuapp.com/receive-order", {
        id: userId,
        order: order,
      });
      liff.closeWindow();
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    fetchUserData();
  }, []);

  const handleOrderChange = (e) => {
    setOrder(e.target.value);
  };

  //write
  const writeToDatabase = (e) => {
    e.preventDefault();
    const timestamp = Date.now();
    set(ref(db, `/${timestamp}`), {
      order: order,
      id: userLineID,
      name: name,
    });
    receiveOrder(userLineID, order);
    setOrder("");
  };

  return (
    <section className="relative flex flex-wrap lg:h-screen lg:items-center">
      <div className="w-full px-4 py-12 lg:w-1/2 sm:px-6 lg:px-8 sm:py-16 lg:py-24">
        <div className="max-w-lg mx-auto text-center">
          <h1 className="text-2xl text-blue-700 font-bold sm:text-3xl">
            WOXA KITCHEN
          </h1>

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
                className="w-full p-4 pr-12 text-sm border-2  rounded-lg  bg-gray-100 shadow-sm"
                placeholder="กะเพราทะเล + ไข่ดาว"
              />
              <button
                className="inline-block mt-5 px-5 py-3 ml-3 text-sm font-medium text-white bg-blue-500 rounded-lg"
                onClick={writeToDatabase}
              >
                สั่งอาหาร
              </button>
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
