export const CategoryButton = ({ slug, atLocation, navigate, address }) => {
  return (
    <button
      disabled={atLocation}
      key={slug}
      onClick={() => {
        navigate(address);
      }}
    >
      {slug}
    </button>
  );
};
