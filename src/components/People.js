import { useQuery } from "react-query";
import Person from "./Person";

const fetchPeople = async () => {
  const res = await fetch("https://swapi.dev/api/people");

  return res.json();
};

const People = () => {
  const { data, status } = useQuery("people", fetchPeople);

  return (
    <div>
      <h2>people</h2>
      {status === "error" && <div>Error fetching data</div>}
      {status === "loading" && <div>loading</div>}
      {status === "success" && (
        <div>
          {data.results.map((person) => (
            <Person key={person.name} person={person} />
          ))}
        </div>
      )}
    </div>
  );
};

export default People;
