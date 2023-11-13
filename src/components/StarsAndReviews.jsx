import { BsStarFill, BsStarHalf, BsStar } from "react-icons/bs";

const StarsAndReviews = ({ stars, reviews }) => {
  // console.log(stars);
  // console.log(reviews);

  // array of stars
  const tempStars = Array.from({ length: 5 }, (_, index) => {
    return index + 0.5;
  });
  // console.log(tempStars);

  // total stars
  const allStars = tempStars.map((star, index) => {
    return (
      <span key={index}>
        {stars > star ? (
          <BsStarFill />
        ) : stars > index ? (
          <BsStarHalf />
        ) : (
          <BsStar />
        )}
      </span>
    );
  });

  return (
    <div className="mb-4 flex gap-x-4 items-center">
      <div className="flex gap-x-1 text-warning">{allStars}</div>
      <p>{`(${reviews} customer reviews)`}</p>
    </div>
  );
};

export default StarsAndReviews;
