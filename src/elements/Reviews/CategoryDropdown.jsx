export const CategoryDropdown = ({
  navigate,
  organise,
  setOrganise,
  category_slug,
  categories,
}) => {
  return (
    <div className="CategoryDropdown">
      <div className="dropdown">
        <button className="dropButton">Category ▼</button>
        <div className="dropContent">
          <button
            disabled={!organise.category}
            key="all"
            onClick={() => {
              const newOrganise = { ...organise };
              newOrganise.category = undefined;
              setOrganise(newOrganise);
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
                const newOrganise = { ...organise };
                newOrganise.category = category.slug;
                setOrganise(newOrganise);
                navigate(`/category/${category.slug}`);
              }}
            >
              {category.slug}
            </button>
          ))}
        </div>
      </div>{" "}
      {category_slug ? ` Displaying reviews for '${category_slug}':` : null}
    </div>
  );
};
