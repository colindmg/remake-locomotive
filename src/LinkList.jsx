import PropTypes from "prop-types";

const LinkList = (props) => {
  return (
    <div className="flex px-10 flex-col items-start w-full">
      {props.links.map((link, index) => (
        <div
          key={link.name}
          className={`w-full flex items-center border-t-2 px-5 py-3 border-gray-900 ${
            index === 0 ? "" : "border-b-2"
          }`}
        >
          {/* <img src={link.images[0]} alt={link.name} className="w-32 h-32" /> */}
          <h2 className="text-[80px] font-display">{link.name}</h2>
        </div>
      ))}
    </div>
  );
};

LinkList.propTypes = {
  links: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      artist: PropTypes.string.isRequired,
      images: PropTypes.arrayOf(PropTypes.string),
    })
  ),
};

export default LinkList;
