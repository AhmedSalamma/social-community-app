import React from "react";
import { Route, Routes } from "react-router-dom";

import Layout from "../web/components/Layout";
import Home from "../web/home/Home";
import LandingPage from "../web/landing/LandingPage";

import Community from "../web/Community/Community";
import Settings from "../web/settings/Settings";
import CreatePostes from "../web/CreatePost/CreatePostes";
import EditPost from "../web/CreatePost/EditPost";
import Profile from "../web/profile/Profile";
import Chat from "../web/chat/Chat";
import Saves from "../web/components/Saves";
import Login from "../web/login/Login";
import ProfilePosts from "../web/profile/ProfilePosts";
import ShowSinglePost from "../web/home/ShowSinglePost";
import CreateCommunities from "../web/Communites/CreateCommunities";
import Communities from "../web/Communites/Communities";
import CommunityPosts from "../web/Community/CommunityPosts";
import ProtectedRoute from "./ProtectedRoute";
import About from "../web/Community/About";
import Members from "../web/Community/Members";
import Replies from "../web/profile/Replies";
export default function WebRoutes() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />

      <Route path="/login" element={<Login />} />
      <Route element={<ProtectedRoute />}>
        <Route path="/home" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="post/:id" element={<ShowSinglePost />} />
          <Route path="post/:id/edit" element={<EditPost />} />
          <Route path="create" element={<CreatePostes />} />
          <Route path="communities" element={<Communities />} />
          <Route path="communities/create" element={<CreateCommunities />} />
          <Route path="chat" element={<Chat />} />
          <Route path="profile/:id" element={<Profile />}>
            <Route index element={<ProfilePosts />} />
            <Route path="replies" element={<Replies />} />
            <Route path="saves" element={<Saves />} />
          </Route>
          <Route path="settings" element={<Settings />} />
          <Route path="community/:id" element={<Community />}>
            <Route index element={<CommunityPosts />} />
            <Route path="members" element={<Members />} />
            <Route path="about" element={<About />} />
          </Route>
        </Route>
      </Route>
    </Routes>
  );
}
