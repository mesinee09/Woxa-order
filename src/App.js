import { db } from "./firebase";
import { set, ref } from "firebase/database";
import { useState, useEffect } from "react";
import liff from "@line/liff";
import axios from "axios";

export default function App() {
  const [order, setOrder] = useState("");
  const [name, setName] = useState("");
  const [userLineID, setUserLineID] = useState("");
  const [loading, setLoading] = useState(false);

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
  // TODO: LIFF Must Be Closed Faster to Sent receive order to user
  async function receiveOrder(userId, order) {
    try {
      await axios.post("https://woxa-food-order.herokuapp.com/receive-order", {
        id: userId,
        order: order,
      })
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
    setLoading(true);
    const timestamp = Date.now();
    set(ref(db, `/${timestamp}`), {
      order: order,
      id: userLineID,
      name: name,
      time: timestamp
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
                className="inline-block w-full mt-5 px-5 py-3 text-sm font-medium text-white bg-blue-500 rounded-lg"
                onClick={writeToDatabase}
                disabled={loading}
              >
                {loading && (<svg role="status" className="w-6 h-6 mr-2 text-gray-200 inline animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                  <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                </svg>)}
                {loading && <span>กำลังสั่งอาหาร</span>}
                {!loading && <span>สั่งอาหาร</span>}
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
