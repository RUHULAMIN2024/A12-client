import useAnnoucement from "./../../hooks/useAnnoucement";
import AnnoucementItem from "./AnnoucementItem";

function Annoucements() {
  const { annoucements } = useAnnoucement();
  return (
    <>
      {annoucements && (
        <section className="py-8 ">
          <div className="container ">
            <h2 className="text-2xl uppercase md:text-3xl mb-3 text-center font-bold">
              Annoucements
            </h2>
            <div className="text-center grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {annoucements?.map((annoucement, ind) => {
                return (
                  <AnnoucementItem
                    key={ind}
                    annoucement={annoucement}
                  ></AnnoucementItem>
                );
              })}
            </div>
          </div>
        </section>
      )}
    </>
  );
}

export default Annoucements;
