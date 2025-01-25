import { useNavigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";
import { useState } from "react";

const Home = () => {
  const [error, setError] = useState("");
  const { session, signOut } = UserAuth();
  const navigate = useNavigate();

  const handleSignOut = async (
    e: React.MouseEvent<HTMLParagraphElement, MouseEvent>
  ) => {
    e.preventDefault();
    try {
      await signOut();
      navigate("/signin");
      setError("error");
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      setError("An error occurred, try again please.");
    }
  };
  return (
    <div>
      <h1>Buscador de Música con Last.fm API</h1>
      <h2>Logged with email: {session.user.email}</h2>
      <p
        onClick={(e) => handleSignOut(e)}
        className="hover:cursor-pointer border rounded-lg inline-block px-2 py-2 mt-1"
      >
        Sign out
      </p>
      {error && <p className="text-red-600 pt-2">{error}</p>}
    </div>
  );
};

export default Home;
