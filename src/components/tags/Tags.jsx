const Tags = () => {
  return (
    <section className="container py-8">
      <h2 className="text-2xl uppercase md:text-3xl mb-3 text-center font-bold">
        Tags
      </h2>
      <div className="grid font-bold text-center text-primary grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
        <h4>Environment</h4>
        <h4>Healthcare</h4>
        <h4>Technology</h4>
        <h4>Health</h4>
        <h4>Social Media</h4>
      </div>
    </section>
  );
};

export default Tags;
