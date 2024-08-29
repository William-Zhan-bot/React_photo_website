# React_photo_website

製作以React為基底的相片網站 from Udemy Courses 2022網頁全端開發
以下為之前學習的筆記

技術總結:

1. React模式製作
2. Routing in React
3. css + google fonts
4. Fetch API
5. 更多圖片

5.2.3版 Route examples

```jsx
import About from "./pages/About";
import { Switch, Route } from "react-router-dom";
 
function App() {
  return (
    <div className="App">
      <Nav />
      <Switch>
        // exact 代表要完全符合 path 的值, 才會顯示
        <Route path="/" exact>
          <Homepage />
        </Route>
        <Route path="/about" exact>
          <About />
        </Route>
      </Switch>
      <Footer />
    </div>
  );
}
```

6.0.2 版Route examples

```jsx

import About from "./pages/About";
import { Routes, Route } from "react-router-dom";
function App() {
   return (
     <div className="App">
       <Nav />
       <Routes>
         <Route path="/" element={<Homepage />} />
         <Route path="/about" element={<About />} />
       </Routes>
       <Footer />
     </div>
   );
 }
```

## Router in React

套件

```jsx
npm install react-router-dom
```

index設定Routes

```jsx
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
// routes設定在這裡
import { BrowserRouter } from "react-router-dom";

// BrowserRouter => 包住tag 指定Router
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
```

in Apps.jsx

```jsx
// 導入各個頁面
import React from "react";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import Homepage from "./pages/Homepage";
import About from "./pages/About";

// Route Set
/**導入routes節點切換器以及route設定節點
 * 把節點放進去裡面
 * 新版本不會有route需要輸入exact的問題產生
 *
 * 另外就是要跟Nav後面的 href配合
 * 導入React當中的link to去實作
 */
import { Routes, Route } from "react-router-dom";
function App() {
  return (
    <div className="App">
      <Nav />

      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/about" element={<About />} />
      </Routes>

      <Footer />
    </div>
  );
}

export default App;
```

Nav.jsx

```jsx
import React from "react";
// React router dom裡面希望用link
import { Link } from "react-router-dom";

const Nav = () => {
  return (
    <div>
      <ul>
        <li>
          <Link to="/">Homepage</Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
      </ul>
    </div>
  );
};

export default Nav;
```

## CSS + Google fonts

**css技巧**

在App.jsx導入唯一的css檔

```jsx
*import* styles *from* "./styles/style.css";
```

之後後面從sass把各支sass串起來即可

前面加斜線是方便導入可以接上

```jsx
// 直接這行串接css 導入一次即可
// 必須用這樣的引入才可以連接libs
@import "./nav";
@import "./search";
@import "./footer";
```

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/432b441e-ecff-48c6-9b4e-027cb0d41894/Untitled.png)

**設定footer壓底**

在Pages當中，利用inline的css設定頁面長度，把footer壓到底下

```jsx
<div style={{ minHeight: "100vh" }}>
      <Search />
</div>
```

**Google font複習**

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/cdc6459c-f4a0-410b-a54e-28aa5c64b48e/Untitled.png)

字體會有link跟css

css丟掉sass裡面的font-family進行設定

link要丟到預設的Header

也就是public中的index.html

!!注意!!是.html裡面

即可導入該字體使用

## Fetch API + 更多圖片

精選相片

先參考pexels的api，裡面影一個自動的推薦15張

搜尋相片

連接pexel的api去查找

**api fetch問題**

每次進入頁面讓他載入照片，採用useEffect去製作即可。

**搜尋問題**

關於方格的抓取，有用一個inputHandler以onChange去及時記錄搜尋欄state的變化，之後已``的方式連接url即可。

**更多照片問題**

必須新增一個state為page並放入url，讓每次按下的more會回傳出不同的東西，之後以concact的方式根原本處理過的photo array相連，即可做到array連貫的部分。

不須擔心data為空報錯，因為會是一開始載入過後，useEffect頁面更新後的data = [data.photos](http://data.photos)陣列，不會是空的arr。

關於搜尋部分的state改變，因為採用即時抓取，可能因此會產生按下more，但自己執行了輸入框條件的問題(因為採即時更新state，不為空即被視為有搜尋條件)。所以必須多創造一個currentSearch，並放在search按鈕當中做state的改變，但卻不會因此改到真正的URL，因為再函式內改過的state會根據js的scope原則，只能在函式當中進行調用，若是運算的話會發生錯誤。

**scope examples:**

```jsx
const i = 5;

function test(){
i += 3; // 無法使用
console.log(i);  // 無法使用
}
test();
```

所以必須以全域的方式去讓他改變，也就是回到global的scope去做操作。

方法為用useEffect，跟上面一開始的search融合，利用對input條件的判斷(剛載入時input必為空)，去調整search對應的網址，即可解決此問題，同時也結合前面currentSearch的state，解決了無輸入更新的問題。

```jsx
  useEffect(() => {
    if (input === "") {
      search(initialURL);
    } else {
      search(searchURL);
    }
  }, [currentSearch]);
```

Homepage.jsx

```jsx
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
          // 因為JS的closure特性 他會先跳去上一層找searchURL，而非先執行新的URL，所以建議用useEffect
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
```

Search.jsx

```jsx
import React, { useState } from "react";

const Search = ({ search, setInput }) => {
  // 把輸入格的東西抓近來
  // 透過js的節點去抓
  // 必須以arrow function去做 以確保執行面
  const inputHandler = (e) => {
    setInput(e.target.value);
  };

  return (
    <div className="search">
      <input onChange={inputHandler} type="text" />
      <button onClick={search}>Search</button>
    </div>
  );
};

export default Search;
```

Photo.jsx

```jsx
import React from "react";

const Photo = ({ data }) => {
  return (
    <div className="picture">
      <p>{data.photographer}</p>
      <div className="ImageContainer">
        <img src={data.src.large} alt="" />
      </div>
      <p>
        Download This:
        {/* target blank是讓他開啟新分頁 */}
        <a target="_blank" href={data.src.large}>
          Click Here
        </a>
      </p>
    </div>
  );
};

export default Photo;
```

