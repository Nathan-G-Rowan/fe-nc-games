import { OrganiseButton } from "./OrganiseButton";

const sort_byes = [
  "created_at",
  "category",
  "designer",
  "owner",
  "title",
  "votes",
];

export const CategoryDropdown = ({ organise, setOrganise, categories }) => {
  return (
    <div className="wrapLine">
      <div className="flexLine">
        <label htmlFor="category-dropdown">
          <h3>Reviews for</h3>
        </label>
        <div className="dropdown" id="category-dropdown">
          <button className="dropButton">
            {organise.category
              ? `${(
                  organise.category[0].toUpperCase() +
                  organise.category.slice(1)
                ).replaceAll("-", " ")} Games`
              : "All Games"}{" "}
            ▼
          </button>
          <div className="dropContent">
            {organise.category ? (
              <OrganiseButton
                key="all"
                slug="all"
                setOrganise={setOrganise}
                field={"category"}
              />
            ) : null}

            {categories.map((category) => {
              if (category.slug === organise.category) return null;
              return (
                <OrganiseButton
                  key={category.slug}
                  slug={category.slug}
                  setOrganise={setOrganise}
                  field={"category"}
                />
              );
            })}
          </div>
        </div>
      </div>{" "}
      <div className="sortOptions">
        <label htmlFor="sort-dropdown">Sorting by</label>
        <div className="dropdown" id="sort-dropdown">
          <button className="dropButton">
            {organise.sort_by === "created_at"
              ? "Time Published"
              : (
                  organise.sort_by[0].toUpperCase() + organise.sort_by.slice(1)
                ).replaceAll("_", " ")}{" "}
            ▼
          </button>
          <div className="dropContent">
            {sort_byes.map((sort_by) => {
              if (sort_by === organise.sort_by) return null;
              return (
                <OrganiseButton
                  key={sort_by}
                  slug={sort_by}
                  setOrganise={setOrganise}
                  field={"sort_by"}
                />
              );
            })}
          </div>
        </div>{" "}
      </div>
      <div className="flipCheck">
        <label htmlFor="flip-check">Ascending Order:</label>
        <input
          checked={organise.order}
          type="checkbox"
          id="flip-check"
          onChange={(e) => {
            setOrganise((organise) => {
              const newOrganise = { ...organise };
              newOrganise.order = e.target.checked;
              return newOrganise;
            });
          }}
        />
      </div>
    </div>
  );
};
