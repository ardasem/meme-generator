import React, { useState } from "react";


const Meme = () => {
  const [meme, setMeme] = useState({
    topText: "",
    bottomText: "",
    randomImage: "",
  });

  const [allMemeImages, setAllMemeImages] = useState([]);

  React.useEffect(async ()=>{
    const res = await fetch("https://api.imgflip.com/get_memes")
    const data = await res.json()
    setAllMemeImages(data.data.memes)
  },[])

  
  const getMemeImage = () => {
    const randomNum = Math.floor(Math.random() * allMemeImages.length);
    const url = allMemeImages[randomNum].url;
    setMeme((prevMeme) => ({ ...prevMeme, randomImage: url }));

    //or {url} = memesArray[randomNum] as object destructuring
  };

  function handleChange(event) {
    const { name, value } = event.target;
    setMeme((prevData) => {
      return {
        ...prevData,
        [name]: value,
      };
    });
  }

  return (
    <main>
      <div className="form">
        <input
          className="form--input"
          type="text"
          name="topText"
          placeholder="Top Text"
          onChange={handleChange}
          value={meme.topText}
        />
        <input
          className="form--input"
          type="text"
          name="bottomText"
          placeholder="Bottom Text"
          onChange={handleChange}
          value={meme.bottomText}
        />
        <button className="form--btn" onClick={getMemeImage}>
          {" "}
          Get a new meme image 🏞
        </button>
      </div>

      <div className="meme--container">
        <img className="meme--image" src={meme.randomImage} alt="" />
        <h2 className="meme--text top">{meme.topText}</h2>
        <h2 className="meme--text bottom">{meme.bottomText}</h2>
      </div>
    </main>
  );
};

export default Meme;
