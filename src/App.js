import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Main from "./Main";
import Groups from "./components/Groups/Groups";
import GroupInfo from "./components/groupChatArea/GroupInfo";
import GroupChatArea from "./components/groupChatArea/GroupChatArea";
import AcceptInvite from "./components/groupChatArea/AcceptInvite";
import PersonInfo from "./components/groupChatArea/PersonInfo";
import {
  addedByMePath,
  directMessagePath,
  eventsPath,
  forumPath,
  groupAcceptInvitePath,
  groupInfoPath,
  groupMainPath,
  groupPath,
  groupPersonalInfoPath,
  mainPath,
} from "./routes";
import DirectMessagesMain from "./components/direct-messages/DirectMessagesMain";
import "./App.css";
import { useEffect, useState } from "react";
import { UserContext } from ".";
import { initiateSDK } from "./sdkFunctions";

const router = createBrowserRouter([
  {
    path: mainPath,
    element: <Main />,
    children: [
      {
        path: forumPath,
        element: null,
      },
      {
        path: groupPath,
        element: <Groups />,
        children: [
          {
            path: groupMainPath,
            element: <GroupChatArea />,
          },
          {
            path: groupInfoPath,
            element: <GroupInfo />,
          },
          {
            path: groupAcceptInvitePath,
            element: <AcceptInvite />,
          },
          {
            path: groupPersonalInfoPath,
            element: <PersonInfo />,
          },
        ],
      },
      {
        path: eventsPath,
        element: null,
      },
      {
        path: directMessagePath,
        // element: <DirectMessagesMain/>,
        element: <DirectMessagesMain />,
      },
      {
        path: addedByMePath,
        element: null,
      },
    ],
  },
]);

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  useEffect(() => {
    initiateSDK(false, "707a866a-2d28-4b8d-b34b-382ac76c8b85", "gaurav")
      .then((res) => {
        setCurrentUser(res.data);
      })
      .catch((error) => {
        console.log(error);
        alert("error at " + __dirname + "inside useEffect");
      });
  },[]);
  return (
    <div className="App h-full">
      <UserContext.Provider
        value={{
          currentUser: currentUser,
          setCurrentUser: setCurrentUser,
        }}
      >
        <RouterProvider router={router} />
      </UserContext.Provider>
      {/* <Block/> */}
    </div>
  );
}

export default App;
