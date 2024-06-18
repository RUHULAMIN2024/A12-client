import PropTypes from "prop-types";
function AnnoucementItem({ annoucement }) {
  const { announcementTitle, announcementDescription } = annoucement;
  return (
    <div className="p-4 shadow-md flex flex-col space-y-2">
      <h3 className="font-bold text-xl text-secondary">{announcementTitle}</h3>
      <p className="text-wrap break-words text-slate-700">
        {announcementDescription}
      </p>
    </div>
  );
}

AnnoucementItem.propTypes = {
  annoucement: PropTypes.object.isRequired,
};
export default AnnoucementItem;
