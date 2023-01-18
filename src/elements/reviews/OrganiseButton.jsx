import { sort_titles, category_titles } from "../../utils/constants";

export const OrganiseButton = ({ slug, setOrganise, field, disabled }) => {
  let title = field === "sort_by" ? sort_titles[slug] : category_titles[slug];
  if (!title) title = slug;

  return (
    <button
      disabled={disabled}
      key={slug}
      onClick={() => {
        setOrganise((organise) => {
          const newOrganise = { ...organise };
          newOrganise[field] = slug;
          return newOrganise;
        });
      }}
    >
      {title}
    </button>
  );
};
