import { getAuth, signOut } from "firebase/auth";

const AuthReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN": {
      return {
        currentUser: action.payload,
      };
    }
    case "LOGOUT": {
      const auth = getAuth();
      signOut(auth)
        .then(() => {
          return {
            currentUser: null,
          };
        })
        .catch((error) => {
          alert(error);
        });
      return {
        currentUser: null,
      };
    }
    default:
      return state;
  }
};

export default AuthReducer;
