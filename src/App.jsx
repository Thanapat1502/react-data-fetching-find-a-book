import "./App.css";
import axios from "axios";
import { useState, useEffect } from "react";

/**
 * 
 * @returns ให้สร้างเว็บไซต์สำหรับค้นหาข้อมูลหนังสือโดยมี Requirement ดังนี้

ผู้ใช้งานสามารถพิมพ์ข้อความเพื่อค้นหาได้ที่กล่องข้อความ Input

ผู้ใช้งานสามารถเห็นผลลัพธ์การค้นหาเป็น List ด้านล่างกล่องข้อความ Input

ระบบจะไปค้นหาหนังสือที่ Server ของ Google ซึ่งมี Endpoint ตามด้านล่างนี้


Copy
https://www.googleapis.com/books/v1/volumes?q=<query-param-value>
/ คือ URL Parameter ซึ่งเป็นข้อความจาก Input ที่ผู้ใช้งานพิมพ์เข้ามา

URL Parameter นี้จะถูกส่งไปที่ Server เพื่อใช้ค้นหาข้อมูลหนังสือ

กรอก input >>> เก็บค่าที่กรอกไว้ที่ tempInput
กด search >>>> ยัด tempInput ใส่ searchInput
useEffect จับตามอง searchInput เมื่อถูกอัพเดท เรียกใช้ searchByQuree
    serchByQuree รอข้อมูล >>>> ดึงข้อมูลจาก google โดย api ขอดู
                        >>>> สิ่งที่ต้องใส่ใน url คือ volumes?q=<query-param-value>
                        >>>> <query-param-value> คือ textInput
                        >>>> เรียกใช้ set

ได้ข้อมูลมาแล้ว ยัดใส่ searchArray
 */
function App() {
  const [tempInput, setTempInput] = useState(""); //เก็บค่า input ไว้ก่อน
  const [searchInput, setSearchInput] = useState("");
  const [resultArray, setResultArray] = useState([]);

  useEffect(() => {
    //ทำงานเมื่อ searchInput ถูกอัพเดต
    getData();
  }, [searchInput]);

  const handleInput = (event) => {
    setTempInput(event.target.value); //ได้ tempInput
  };

  const handleFindButton = () => {
    setSearchInput(tempInput); //ได้ searchInput
  };

  const getData = async () => {
    //ยัด searchInput ลงใน volumes?q=<query-param-value>
    try {
      const data = await axios.get(
        `https://openlibrary.org/search.json?q=${searchInput}&limit=10`
      );
      setResultArray(data.data.docs);
    } catch (error) {
      console.log("error");
    }
    console.log(resultArray);
  };

  return (
    <div className="App">
      <h1>Find a Book</h1>
      <input type="text" name="search" onChange={handleInput} />
      <button onClick={handleFindButton}>Find</button>
      <ul>
        {resultArray.map((item) => {
          return <li>{item.title}</li>;
        })}
      </ul>
    </div>
  );
}

export default App;
