import useTags from "../../hooks/useTags";

const Tags = () => {
  const { tags } = useTags();
  return (
    <section className="container py-8">
      <h2 className="text-2xl uppercase md:text-3xl mb-3 text-center font-bold">
        Tags
      </h2>
      <div className=" font-bold text-center text-primary grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
        {tags.map((tag, ind) => (
          <button className="btn capitalize" key={ind}>
            {tag.tag}
          </button>
        ))}
      </div>
    </section>
  );
};

export default Tags;
