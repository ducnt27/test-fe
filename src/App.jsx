import { useState } from "react";
import axios from "axios";
import ClipLoader from "react-spinners/ClipLoader";
function App() {
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
