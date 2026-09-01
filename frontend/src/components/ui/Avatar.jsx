const Avatar = ({
  src,
  name,
}) => {
  if (src)
    return (
      <img
        src={src}
        alt={name}
        className="h-10 w-10 rounded-full object-cover"
      />
    );

  return (
    <div className="h-10 w-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-semibold">
      {name?.charAt(0).toUpperCase()}
    </div>
  );
};

export default Avatar;