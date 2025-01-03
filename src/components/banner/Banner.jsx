import PropTypes from "prop-types";

const Banner = ({ setBannerSearchTag }) => {
  const handleBannerSearch = (e) => {
    e.preventDefault();
    const form = e.target;
    const searchTag = form.searchTag.value;
    setBannerSearchTag(searchTag);
    form.reset();
  };

  return (
    <section
      className="container hero min-h-72 md:min-h-96"
      style={{ backgroundImage: "url(https://i.ibb.co/CsG7Gwv/20945188.jpg)" }}
    >
      <div className="hero-overlay bg-opacity-60"></div>
      <div className="hero-content text-center text-neutral-content">
        <div className="max-w-xl">
          <h1 className="mb-5 text-3xl md:text-4xl font-bold">
            Welcome to Connect Sphere
          </h1>
          <div>
            <form
              onSubmit={handleBannerSearch}
              className="flex justify-center p-1 overflow-hidden space-x-5  md:w-96 mx-auto"
            >
              <input
                name="searchTag"
                className="md:px-6 px-3 py-1 border rounded-lg md:py-2 text-black bg-white outline-none"
                type="text"
                placeholder="Search By Tag"
              />
              <button
                type="submit"
                className="px-1 md:px-4 md:py-3 text-sm font-medium bg-secondary text-white  uppercase  rounded-md "
              >
                Search
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
Banner.propTypes = {
  setBannerSearchTag: PropTypes.func.isRequired,
};
export default Banner;
