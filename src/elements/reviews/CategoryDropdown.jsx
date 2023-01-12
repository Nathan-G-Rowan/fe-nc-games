import { CategoryButton } from "./CategoryButton";

export const CategoryDropdown = ({
  navigate,
  organise,
  setOrganise,
  category_slug,
  categories,
}) => {
  return (
    <div className="wrapLine">
      <div className="flexLine">
        <div className="dropdown">
          <button className="dropButton">Category ▼</button>
          <div className="dropContent">
            <CategoryButton
              key="all"
              slug="all"
              atLocation={!organise.category}
              navigate={navigate}
              address={"/"}
            />
            {categories.map((category) => (
              <CategoryButton
                key={category.slug}
                slug={category.slug}
                atLocation={category.slug === organise.category}
                navigate={navigate}
                address={`/category/${category.slug}`}
              />
            ))}
          </div>
        </div>{" "}
        <h3>
          {category_slug
            ? ` Displaying reviews for '${category_slug}':`
            : "Displaying all reviews:"}
        </h3>
      </div>
      <div className="sortOptions">
        <input type="checkbox" />
        Flip
        <div className="dropdown">Sort By</div>{" "}
      </div>
    </div>
  );
};
