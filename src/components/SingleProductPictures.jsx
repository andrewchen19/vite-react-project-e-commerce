import React, { useState } from "react";

const SingleProductPictures = ({ images }) => {
  //   console.log(images);

  // useState
  const [imageNow, setImageNow] = useState(images[0]);

  return (
    <figure className="grid gap-4">
      <img
        src={imageNow.url}
        alt={imageNow.filename}
        className="block w-full h-[300px] md:h-[500px] lg:h-[600px] object-cover object-center rounded-md"
      />
      <div className="grid grid-cols-5 gap-x-4">
        {images.map((image, index) => {
          const { id, url, filename } = image;
          return (
            <img
              key={id}
              src={url}
              alt={filename}
              className={`w-full h-[50px] md:h-[100px] lg:h-[75px] rounded-md hover:cursor-pointer ${
                imageNow.id === id && "border-[3px] border-primary-focus"
              }`}
              onClick={() => setImageNow(images[index])}
            />
          );
        })}
      </div>
    </figure>
  );
};

export default SingleProductPictures;
