import ChangeProfile from "../../components/change-profile/change-profile";
import ProfileNavigation from "../../components/profile-navigation/profile-navigation";
import cl from "./profile.module.css";

const Profile = () => {
  return (
    <div className={cl.container}>
      <ProfileNavigation />
      <ChangeProfile />
    </div>
  );
};

export default Profile;
