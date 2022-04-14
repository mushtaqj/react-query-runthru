import { useState } from "react";
import { useQuery } from "react-query";
import Planet from "./Planet";

const fetchPlanets = async (pageNo) => {
  const res = await fetch(`https://swapi.dev/api/planets?page=${pageNo}`);

  return res.json();
};

const Planets = () => {
  const [page, setPage] = useState(1);
  const { data, isLoading, isError, isSuccess } = useQuery(
    ["planets", page],
    () => fetchPlanets(page)
  );

  return (
    <div>
      <h2>Planets</h2>
      <button
        onClick={() => data.previous && setPage(page - 1)}
        disabled={!data || !data.previous}
      >
        Prev
      </button>
      <span>Page {page}</span>
      <button
        onClick={() => data.next && setPage(page + 1)}
        disabled={!data || !data.next}
      >
        Next
      </button>
      {isError && <div>Error fetching data</div>}
      {isLoading && <div>loading</div>}
      {isSuccess && (
        <div>
          {data.results.map((planet) => (
            <Planet key={planet.name} planet={planet} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Planets;
