import Typicode from "likeminds-apis-sdk";
import { json } from "react-router-dom";
import { myClient } from "..";
// import('likeminds-apis-sdk/dist/chatroom/types').ConversationData as conversationData
// import * as DB from "firebase/database";
// DB.Da;
export const jsonReturnHandler = (data, error) => {
  let returnObject = {
    error: false,
  };
  if (!Boolean(error)) {
    returnObject.data = data;
  } else {
    returnObject.error = true;
    returnObject.errorMessage = error;
  }
  return returnObject;
};

export const createNewClient = (key) => {
  const client = new Typicode({
    apiKey: key,
  });
  return client;
};

export const getChatRoomDetails = async (myClient: Typicode, chatRoomId) => {
  try {
    console.log(chatRoomId);

    const chatRoomResponse = await myClient.getChatroom(chatRoomId);
    // console.log(chatRoomResponse);
    return jsonReturnHandler(chatRoomResponse, null);
  } catch (error) {
    console.log(error);
    return jsonReturnHandler(null, error);
  }
};

export const getConversationsForGroup = async (optionObject) => {
  try {
    let conversationCall = await myClient.getConversations(optionObject);
    // console.log(conversationCall)
    return jsonReturnHandler(conversationCall.conversations, null);
  } catch (error) {
    return jsonReturnHandler(null, error);
  }
};

export function parseMessageString(message) {
  let newMessage = " " + message + " ";
}
export function getUsername(str) {
  let userMatchString = /(?<=<<)(@*).+(?=\|)/gs;
  let userName = str.match(userMatchString);
  return userName;
}
export function getUserLink(str) {
  let userMatchString = /(?<=\|).+(?=>>)/gs;
  let userName = str.match(userMatchString);
  return userName;
}
export function getString(str) {
  if (!Boolean(getUsername(str))) {
    let userMatchString = /.+/gs;
    let userName = str.match(userMatchString);
    return userName;
  } else {
    let userMatchString = /(?<=>>)(@*).+/gs;
    let userName = str.match(userMatchString);
    return userName;
  }
}

export async function createNewConversation(val, groupContext, options) {
  let { has_files, count } = options;
  let configObject = {
    text: val.toString(),
    created_at: Date.now(),
    has_files: has_files,

    chatroom_id: groupContext.activeGroup.chatroom.id,
  };
  if (has_files) {
    configObject["attachment_count"] = count;
  }
  try {
    if (val.length != 0) {
      let createCall = await myClient.onConversationsCreate(configObject);
      return jsonReturnHandler(createCall, null);
    }
  } catch (error) {
    return jsonReturnHandler(null, error);
  }
}

export async function getReportingOptions() {
  try {
    let rep = await myClient.getReportTags();
    return jsonReturnHandler(rep, null);
  } catch (e) {
    return jsonReturnHandler(null, e);
  }
}

// communityId = 50421

export async function addReaction(reaction, convoId, chatId) {
  try {
    const reactionCall = await myClient.addAction({
      chatroom_id: chatId,
      conversation_id: convoId,
      reaction: reaction,
    });
    return jsonReturnHandler(reactionCall, null);
  } catch (error) {
    return jsonReturnHandler(null, error);
  }
}

export async function pushReport(convoId, tagId, reason) {
  try {
    const pushReportCall = await myClient.pushReport({
      conversation_id: convoId,
      tag_id: tagId,
      reason: reason,
    });
    return jsonReturnHandler(pushReportCall, null);
  } catch (error) {
    return jsonReturnHandler(null, error);
  }
}

export async function initiateSDK(is_guest, user_unique_id, user_name) {
  try {
    let initiateCall = await myClient.initSDK({
      is_guest,
      user_unique_id,
      user_name,
    });
    return jsonReturnHandler(initiateCall, null);
  } catch (error) {
    return jsonReturnHandler(null, error);
  }
}

export async function getTaggingList(communityId, chatroomId) {
  try {
    let tagListCall = await myClient.getTaggingList({
      community_id: communityId,
      chatroom_id: chatroomId,
    });
    return jsonReturnHandler(tagListCall, null);
  } catch (error) {
    return jsonReturnHandler(null, error);
  }
}

// const userContext = useContext(UserContext)
// import above 2 things
// userContext.

export function mergeInputFiles(inputContext) {
  console.log(inputContext);
  let { mediaFiles, audioFiles, docFiles } = inputContext;
  console.log(mediaFiles);
  console.log(audioFiles);
  console.log(docFiles);
  let newArr = [...mediaFiles, ...audioFiles, ...docFiles];
  return newArr;
}

export function clearInputFiles(inputContext) {
  inputContext.setAudioFiles([]);
  inputContext.setMediaFiles([]);
  inputContext.setDocFiles([]);
}

export async function getUnjoinedRooms(community_id) {
  try {
    let unjoinedGroups = await myClient.fetchFeedData({
      community_id,
      order_type: 0,
      page: 1,
    });
    return jsonReturnHandler(unjoinedGroups, null);
  } catch (error) {
    console.log(error);
    return jsonReturnHandler(null, error);
  }
}

export async function joinNewGroup(collabId, userID, value) {
  try {
    let joinCall = await myClient.followCR({
      collabcard_id: collabId,
      member_id: userID,
      value: value,
    });
    return jsonReturnHandler(joinCall, null);
  } catch (error) {
    console.log(error);
    return jsonReturnHandler(null, error);
  }
}

export async function leaveChatRoom(collabId, userId, refreshContext) {
  try {
    const leaveCall = await myClient.leaveChatroom({
      collabcard_id: collabId,
      member_id: userId,
      value: false,
    });
    refreshContext();
    return jsonReturnHandler(leaveCall, null);
  } catch (error) {
    return jsonReturnHandler(null, error);
  }
}

export function tagExtracter(str) {
  let newContent = str
    .split("<<")
    .join('<a href="javascript:void(0)" style="color: green;">');
  newContent = newContent.split("|route").join("</a>|route");
  let a = newContent.split("|route");

  let na = [];
  for (let ar of a) {
    let ta = ar.split(">>");
    if (ta.length > 1) {
      na.push(ta[1]);
    } else {
      na.push(ta);
    }
  }
  na = na.join("");

  na = na.split("http").join("^#$__##$@^");
  return na;
}

export function linkConverter(sampleString) {
  let newStr = sampleString.split("^#$__");
  let newStringArr = [];
  for (let str of newStr) {
    if (str.substring(0, 5) === "##$@^") {
      let subStringArr = str.split(" ");
      subStringArr[0] =
        '<a href="http' +
        subStringArr[0].substring(5) +
        '">' +
        "http" +
        subStringArr[0].substring(5) +
        "</a>";
      let s = subStringArr.join(" ");
      newStringArr.push(s);
    } else {
      newStringArr.push(str);
    }
  }
  return newStringArr.join("").trim();
}

function seviceWorker() {
  try {
    // let w = myClient.
    // myClient.
  } catch (error) {}
}
