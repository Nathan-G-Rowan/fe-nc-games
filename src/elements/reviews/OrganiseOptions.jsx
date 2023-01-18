import { OrganiseButton } from "./OrganiseButton";
import { sort_byes, sort_titles, category_titles } from "../../utils/constants";

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
              ? `${category_titles[organise.category]} Games`
              : "All Games"}{" "}
            ▼
          </button>
          <div className="dropContent">
            <OrganiseButton
              key="all"
              slug="all"
              setOrganise={setOrganise}
              field={"category"}
              disabled={!organise.category || organise.category === "all"}
            />

            {categories.map((category) => {
              return (
                <OrganiseButton
                  key={category.slug}
                  slug={category.slug}
                  setOrganise={setOrganise}
                  field={"category"}
                  disabled={organise.category === category.slug}
                />
              );
            })}
          </div>
        </div>
      </div>{" "}
      <div className="sortOptions">
        <label htmlFor="sort-dropdown">{"Sorting by "}</label>
        <div className="dropdown" id="sort-dropdown">
          <button className="dropButton">
            {sort_titles[organise.sort_by]} ▼
          </button>
          <div className="dropContent">
            {sort_byes.map((sort_by) => {
              return (
                <OrganiseButton
                  key={sort_by}
                  slug={sort_by}
                  setOrganise={setOrganise}
                  field={"sort_by"}
                  disabled={organise.sort_by === sort_by}
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
