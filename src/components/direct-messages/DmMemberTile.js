import { Margin } from "@mui/icons-material";
import { Button } from "@mui/material";
import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { communityId } from "../..";
import { directMessageInfoPath } from "../../routes";
import { requestDM } from "../../sdkFunctions";
import { DmContext } from "./DirectMessagesMain";

function DmMemberTile({ profile, profileIndex }) {
  const navigate = useNavigate();
  console.log(profile);
  function reqDM() {
    requestDM(profile.id);
  }
  function routeToProfile() {
    navigate(
      directMessageInfoPath +
        `?memberId=${profile.id}&communityId=${communityId}`,
      {
        state: {
          communityId: communityId,
          memberId: profile.id,
        },
      }
    );
  }
  return (
    <div className="flex justify-between items-center py-[16px] px-[20px] border-t border-solid border-[#EEEEEE] cursor-pointer">
      <div className="flex flex-col">
        <div className="text-[#323232] text-[16px] capitalize">
          {profile.name}
        </div>
        {profile.custom_title ? (
          <div className="text-[12px] text-[#ADADAD]">
            {profile.custom_title}
          </div>
        ) : (
          <div className="text-[12px] text-[#ADADAD]">Other</div>
        )}
      </div>

      <div style={{ flexGrow: 1 }} />
      <Button
        sx={{
          background: "#3884F7",
          width: "87px",
          height: "34px",
          marginRight: "12px",
          color: "white",
          ":hover": {
            background: "grey",
          },
        }}
        onClick={reqDM}
        variant="filled"
      >
        Message
      </Button>
      <Link
        to={directMessageInfoPath + `/${profile.id}`}
        state={{
          communityId: communityId,
          memberId: profile.id,
        }}
      >
        <Button
          sx={{
            width: "107px",
            height: "34px",
          }}
          variant="outlined"
          // onClick={routeToProfile}
        >
          View Profile
        </Button>
      </Link>
    </div>
  );
}

export default DmMemberTile;