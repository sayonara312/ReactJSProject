import { useState, useEffect } from "react";

function Content() {
  const [avatar, setAvatar] = useState();
  useEffect(() => {
    return () => {
      avatar && URL.revokeObjectURL(avatar.preview);
    };
  }, [avatar]);
  const handlePreviewAvatar = (e) => {
    const file = e.target.files[0];
    file.preview = URL.createObjectURL(file);

    setAvatar(file);
  };
  return (
    <div className="mt-3">
      <input type="file" onChange={handlePreviewAvatar} />
      {avatar && <img className="img-fluid" src={avatar.preview} alt="Anh" />}
    </div>
  );
}
export default Content;
