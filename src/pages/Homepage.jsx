import React from "react";
import Search from "../components/Search";
// 導入state配合Search
import { useState, useEffect } from "react";
import Photo from "../components/Photo";

const Homepage = () => {
  // 頁面刷新，主要處理api中page的部分
  const [page, setPage] = useState(1);
  // 處理state小bug =>不按下搜尋也出現相關資訊
  // 把所有的input改成這個 多一層檢驗
  // 之丟到search按鈕的click裡面去
  const [currentSearch, setcurrentSearch] = useState("");

  // 搜尋列專用
  const [input, setInput] = useState("");
  const searchURL = `https://api.pexels.com/v1/search?query=${currentSearch}&per_page=15&page=${page}`;

  // 設定存放資料的state
  let [data, setData] = useState(null);
  const auth = "563492ad6f91700001000001f5a17c93ac8d4005b0bc658071d73eac";
  const initialURL = "https://api.pexels.com/v1/curated?page=1&per_page=15";

  // 設定從api撈data
  const search = async (url) => {
    // 預設state是1 => 會先用他拿載入的data
    // 之後頁面載入的話會從2開始往後+
    // 這樣就不會重複
    setPage(2);

    // api連接
    // 裡面的headers是依照參考的部分
    const dataFetch = await fetch(url, {
      method: "Get",
      headers: {
        Accept: "application/json",
        Authorization: auth,
      },
    });
    // api拿到之後轉乘json格式
    let parseData = await dataFetch.json();
    console.log(parseData.photos);
    setData(parseData.photos);
  };

  // load more pic
  /**
   * 更多精選
   * 更多搜尋相關
   */
  const morepic = async () => {
    let newURL;
    if (input === "") {
      newURL = `https://api.pexels.com/v1/curated?page=${page}&per_page=15`;
    } else {
      newURL = `https://api.pexels.com/v1/search?query=${currentSearch}&per_page=15&page=${page}`;
    }
    setPage(page + 1);
    const dataFetch = await fetch(newURL, {
      method: "Get",
      headers: {
        Accept: "application/json",
        Authorization: auth,
      },
    });
    let parseData = await dataFetch.json();
    // 必須用concat串接上面的data
    // 另外就是data因為前面刷新頁面執行過了 所以裡面一定有東西
    setData(data.concat(parseData.photos));
  };

  // 頁面刷新自動上照片 useEffect
  // 注意useEffect裡面要放arrow
  // 同時也處理current Search的閉包問題
  useEffect(() => {
    if (input === "") {
      search(initialURL);
    } else {
      search(searchURL);
    }
  }, [currentSearch]);

  /**
   * 將data以變數的形式丟回到photo使用
   * 以維持state階級
   * search setInput也是
   */
  return (
    <div style={{ minHeight: "100vh" }}>
      {/* 搜尋的變數必須由這裏去接，但由下一層啟動 
          所以設定一個arrow去做    
      */}
      <Search
        search={() => {
          // 就算這裡做更改 searchURL依然會抓到最前面部分
          // 因為JS的closure特性 const無法拉到非他的closure做改變
          // 他會先跳去上一層找searchURL，而非先執行新的URL，所以建議用useEffect
          setcurrentSearch(input);
          // search(searchURL);
        }}
        setInput={setInput}
      />
      <div className="pictures">
        {
          /* react的特殊技巧，因為下面的串接會因為data預設為null，
        而不能用map抱錯。這裡可以用and運算的方式，把null出現的部分，
        連同後面的map一起false掉，這樣就不會執行 */
          data &&
            data.map((d) => {
              return <Photo data={d} key={Math.random() * 100} />;
            })
        }
      </div>
      <div className="morePicture">
        <button onClick={morepic}>more pictures</button>
      </div>
    </div>
  );
};

export default Homepage;
