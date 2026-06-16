import React from "react";
import { Route, Routes } from "react-router-dom";

import Layout from "../web/components/Layout";
import Home from "../web/home/Home";

import Community from "../web/Community/Community";
import Members from "../web/components/Members";
// import PostCard from "../web/components/PostCard";
import Settings from "../web/settings/Settings";
import CreatePost from "../web/components/CreatePost";
import CreatePostes from "../web/CreatePost/CreatePostes";
import Profile from "../web/profile/Profile";
import Chat from "../web/chat/Chat";
import Replies from "../web/components/Replies";
import Saves from "../web/components/Saves";
import Login from "../web/login/Login";
import ProfilePosts from "../web/profile/ProfilePosts";
import ShowSinglePost from "../web/home/ShowSinglePost";
import CreateCommunities from "../web/Communites/CreateCommunities";
import Communities from "../web/Communites/Communities";
export default function WebRoutes() {
  return (
    <Routes>
      <Route path="login" element={<Login />} />
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="post/:id" element={<ShowSinglePost />} />{" "}
        <Route path="create" element={<CreatePostes />} />
        <Route path="communities" element={<Communities />} />
        <Route path="communities/create" element={<CreateCommunities />} />
        <Route path="chat" element={<Chat />} />
        <Route path="profile" element={<Profile />}>
          <Route index element={<ProfilePosts />} />
          <Route path="replies" element={<Replies />} />
          <Route path="saves" element={<Saves />} />
        </Route>
        <Route path="settings" element={<Settings />} />
        <Route path="community" element={<Community />}>
          {/* <Route index element={<PostCard />} /> */}
          <Route path="members" element={<Members />} />
        </Route>
      </Route>
    </Routes>
  );
}
