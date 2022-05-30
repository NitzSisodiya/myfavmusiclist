import StarBorderIcon from "@mui/icons-material/StarBorder";
import StarIcon from "@mui/icons-material/Star";
import { useDispatch } from "react-redux";
import { addBestOfTheBest, removeBestOfTheBest } from "../redux/albumSlice";
import { Tooltip } from "@mui/material";

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
        <Tooltip title="Remove from Best of Best">
          <StarIcon onClick={() => removeFromBestOfBest(id)} />
        </Tooltip>
      ) : (
        <Tooltip title="Add to Best of Best">
          <StarBorderIcon onClick={() => addToBestOfBest(id)} />
        </Tooltip>
      )}
    </>
  );
};

export default Fav;
