import {createContext, useState, useEffect, useContext} from "react";
import {User} from "../API";
import {useAuthenticator} from "@aws-amplify/ui-react-native";
import {generateClient} from "aws-amplify/api";
import {listUsers} from "../graphql/queries";

interface IAuthContext {
  authUser: any;
  dbUser: User;
  userId: string;
  setDbUser: (user: User) => void;
  signOut: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<IAuthContext>({} as IAuthContext);
const client = generateClient();

export const AuthContextProvider = ({children}) => {
  const [dbUser, setDbUser] = useState<User | null>(null);
  const [isLoading, setLoading] = useState<boolean>(true);
  const {user, signOut} = useAuthenticator();

  useEffect(() => {
    client
      .graphql({
        query: listUsers,
        variables: {filter: {sub: {eq: user.userId}}, limit: 1},
      })
      .then(({data}) => setDbUser(data.listUsers.items[0] as User))
      .catch((_) => setDbUser(null)).finally(() => setLoading(false));
  }, [user.userId]);

  return (
    <AuthContext.Provider
      value={{
        authUser: user.signInDetails,
        dbUser,
        userId: user.userId,
        setDbUser,
        signOut,
        isLoading: isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);
