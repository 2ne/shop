const FinderDecoration = () => {
  return (
    <div
      className="absolute pointer-events-none max-lg:hidden -left-40 -top-40"
      style={{
        maskImage: "radial-gradient(black, transparent)",
        WebkitMaskImage: "radial-gradient(black, transparent)",
      }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="336"
        height="336"
        viewBox="0 0 336 336"
        fill="none"
      >
        <circle cx="168" cy="168" r="47.5" stroke="#EAECF0" />
        <circle cx="168" cy="168" r="47.5" stroke="#EAECF0" />
        <circle cx="168" cy="168" r="71.5" stroke="#EAECF0" />
        <circle cx="168" cy="168" r="95.5" stroke="#EAECF0" />
        <circle cx="168" cy="168" r="119.5" stroke="#EAECF0" />
        <circle cx="168" cy="168" r="143.5" stroke="#EAECF0" />
        <circle cx="168" cy="168" r="167.5" stroke="#EAECF0" />
      </svg>
    </div>
  );
};

export default FinderDecoration;
