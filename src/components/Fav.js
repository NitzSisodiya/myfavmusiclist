import StarBorderIcon from "@mui/icons-material/StarBorder";
import StarIcon from "@mui/icons-material/Star";
import { useDispatch } from "react-redux";
import { addBestOfTheBest, removeBestOfTheBest } from "../redux/albumSlice";

const Fav = ({ id, fav }) => {
  const dispatch = useDispatch();
  const addToBestOfBest = (id) => {
    dispatch(addBestOfTheBest(id));
  };
  const removeFromBestOfBest = (id) => {
    dispatch(removeBestOfTheBest(id));
  };
  return (
    <>
      {fav.fav ? (
        <StarIcon onClick={() => removeFromBestOfBest(id)} />
      ) : (
        <StarBorderIcon onClick={() => addToBestOfBest(id)} />
      )}
    </>
  );
};

export default Fav;
