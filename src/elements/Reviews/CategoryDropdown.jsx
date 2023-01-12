export const CategoryDropdown = ({
  navigate,
  organise,
  setOrganise,
  category_slug,
  categories,
}) => {
  return (
    <div className="felxLine">
      <div className="dropdown">
        <button className="dropButton">Category ▼</button>
        <div className="dropContent">
          <button
            disabled={!organise.category}
            key="all"
            onClick={() => {
              navigate("/");
            }}
          >
            all
          </button>
          {categories.map((category) => (
            <button
              disabled={category.slug === organise.category}
              key={category.slug}
              onClick={() => {
                navigate(`/category/${category.slug}`);
              }}
            >
              {category.slug}
            </button>
          ))}
        </div>
      </div>{" "}
      <h3>
        {category_slug
          ? ` Displaying reviews for '${category_slug}':`
          : "Displaying all reviews:"}
      </h3>
    </div>
  );
};
