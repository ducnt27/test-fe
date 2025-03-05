import { useState } from "react";
import axios from "axios";
import ClipLoader from "react-spinners/ClipLoader";
function App() {
  //task 1:
  function findMissingNumber(arr) {
    let n = arr.length + 1;
    let expectedSum = (n * (arr[0] + arr[arr.length - 1])) / 2;
    let actualSum = arr.reduce((sum, num) => sum + num, 0);
    return expectedSum - actualSum;
  }
  console.log("task 1");
  console.log(findMissingNumber([1, 2, 3, 5])); // Output: 4
  console.log(findMissingNumber([10, 11, 12, 14])); // Output: 13

  //task 2:
  function isValidPassword(password) {
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/;
    return passwordRegex.test(password);
  }
  console.log("task 2");
  console.log(isValidPassword("Hello@123")); // Output: true
  console.log(isValidPassword("hello123")); // Output: false
  console.log(isValidPassword("HELLO@123")); // Output: false

  //task 3:
  const [amount, setAmount] = useState(1);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleLoadImages = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await axios.get(
        `https://dog.ceo/api/breeds/image/random/${amount}`
      );
      console.log("data", data);
      setImages((prevImages) => [...prevImages, ...data.message]);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  const handleClearImages = () => {
    setImages([]);
    setAmount(1);
    setLoading(false);
  };
  return (
    <>
      <div className="container">
        <header className="header">
          <form className="form" onSubmit={handleLoadImages}>
            <div className="input-group">
              <label htmlFor="amount" className="label-input">
                Amount *
              </label>
              <input
                type="number"
                value={amount}
                onChange={(e) => {
                  setAmount(e.target.value);
                }}
                required="Giá trị lớn hơn hoặc bằng 1"
                min={1}
              />
            </div>
            <button type="submit" className="btn btn-load">
              LOAD 🐶
            </button>
            <button
              onClick={handleClearImages}
              type="button"
              className="btn btn-clear"
            >
              CLEAR
            </button>
            {loading && (
              <div className="">
                <ClipLoader color="#1976C0" />
              </div>
            )}
          </form>
        </header>

        <main className="main">
          <div className="images">
            {images.map((image, index) => (
              <div className="image" key={index}>
                <img key={index} src={image} alt={`Image ${index + 1}`} />
              </div>
            ))}
          </div>
          <div className="loading-spinner" hidden={!loading}></div>
        </main>
      </div>
    </>
  );
}

export default App;
