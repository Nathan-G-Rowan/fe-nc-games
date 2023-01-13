export const OrganiseButton = ({ slug, setOrganise, field }) => {
  return (
    <button
      key={slug}
      onClick={() => {
        setOrganise((organise) => {
          const newOrganise = { ...organise };
          newOrganise[field] = slug;
          return newOrganise;
        });
      }}
    >
      {(slug[0].toUpperCase() + slug.slice(1))
        .replaceAll("-", " ")
        .replaceAll("_", " ")}
    </button>
  );
};
