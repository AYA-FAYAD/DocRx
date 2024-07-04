import {
  UserProfile,
  UserProfileItem,
  UserProfileList,
  UserProfileSection,
} from "@clerk/clerk-react";

const UserProfilePage = () => {
  return (
    <UserProfile path="/user-profile">
      <UserProfileSection title="Basic Information">
        <UserProfileList>
          <UserProfileItem label="Email" /> {/* Displays user's email */}
          <UserProfileItem label="Username" if={hasUsername} />{" "}
          {/* Displays username if enabled */}
        </UserProfileList>
      </UserProfileSection>
      <UserProfileSection title="Custom Information">
        <UserProfileList>
          <UserProfileItem label="Phone Number" path="metadata.phoneNumber" />{" "}
          {/* Displays value of 'phoneNumber' metadata key */}
          {/* Add more UserProfileItem components for additional custom fields */}
        </UserProfileList>
      </UserProfileSection>
    </UserProfile>
  );
};
export default UserProfilePage;
