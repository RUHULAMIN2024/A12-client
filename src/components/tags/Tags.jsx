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
          <span
            className="inline-block cursor-text bg-gray-200 px-3 py-1 text-sm font-semibold text-gray-700 mr-2 my-2"
            key={ind}
          >
            {tag.tag}
          </span>
        ))}
      </div>
    </section>
  );
};

export default Tags;
