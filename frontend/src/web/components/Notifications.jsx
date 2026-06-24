import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  FiBell,
  FiCheck,
  FiHeart,
  FiInbox,
  FiMessageSquare,
  FiUserPlus,
  FiX,
} from "react-icons/fi";
import { useSelector, useDispatch } from "react-redux";
import echo from "../../api/notifications";
import useNotification from "../../hooks/useNotification";
const notificationIcons = {
  comment: FiMessageSquare,
  like: FiHeart,
  community: FiUserPlus,
};

export default function Notifications() {
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);
  const { markAllAsRead, markAsRead } = useNotification();

  const user = useSelector((state) => state.userReducer.user);
  const notifications = useSelector((state) => state.notification.notification);
  const unreadCount = notifications.filter((n) => !n.read).length;
  const dispatch = useDispatch();

  useEffect(() => {
    if (!user?.id) return;

    const EchoInstance = echo();

    const handleNotification = (e) => {
      const newNotification = {
        id: e.id,
        post_id: e.post?.id,
        read_at: null,
        type: e.type,
        message: e.message,
        post_title: e.post?.title,
        user_name: e.username,
        created_at: new Date().toISOString(),
      };

      dispatch({
        type: "PUSH_NOTIFICATION",
        payload: newNotification,
      });
    };

    EchoInstance.private(`notifications.${user.id}`)
      .listen(".post.commented", handleNotification)
      .listen(".post.like", handleNotification);

    return () => {
      EchoInstance.leave(`notifications.${user.id}`);
    };
  }, [user?.id]);
  return (
    <div ref={menuRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        aria-label="الإشعارات"
        aria-expanded={open}
        className="relative p-2 rounded-full bg-gray-100 text-gray-600 hover:bg-violet-50 hover:text-violet-600 transition cursor-pointer"
      >
        <FiBell size={20} />

        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 min-w-4 h-4 px-1 bg-red-500 text-white text-[10px] leading-4 rounded-full">
            {unreadCount}
          </span>
        )}
      </button>

      {open && (
        <div className="absolute left-0 top-12 z-50 w-[min(90vw,360px)] overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl">
          <div className="flex items-center justify-between border-b border-slate-100 px-4 py-3">
            <div>
              <h2 className="text-sm font-bold text-slate-900">الإشعارات</h2>
              <p className="mt-1 text-xs text-slate-500"></p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  markAllAsRead();
                }}
                type="button"
                className="rounded-full p-2 text-slate-500 hover:bg-violet-50 hover:text-violet-700 transition"
                aria-label="تحديد الكل كمقروء"
              >
                <FiCheck size={17} />
              </button>

              <button
                type="button"
                onClick={() => setOpen(false)}
                className="rounded-full p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-900 transition"
                aria-label="إغلاق الإشعارات"
              >
                <FiX size={17} />
              </button>
            </div>
          </div>

          {notifications?.map((notification) => {
            const Icon = notificationIcons[notification.type] || FiBell;

            return (
              <Link
                onClick={() => {
                  markAsRead(notification?.id);
                }}
                key={notification.id}
                to={`/home/post/${notification.post_id}`}
                className="group flex gap-3 px-4 py-3 hover:bg-slate-50 transition"
              >
                <span
                  className={`mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${
                    notification.read
                      ? "bg-slate-100 text-slate-500"
                      : "bg-violet-100 text-violet-700"
                  }`}
                >
                  <Icon size={18} />
                </span>

                <span className="min-w-0 flex-1">
                  <span className="flex items-start justify-between gap-3">
                    {!notification.read && (
                      <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-violet-600" />
                    )}
                  </span>

                  <span className="mt-1 block text-md leading-6 text-slate-600">
                    <span className="text-violet-700">
                      {notification.user_name + " "}
                    </span>
                    {notification.message}
                  </span>

                  <span className="text-sm font-light text-slate-900">
                    {notification.post_title}
                  </span>

                  <span className="mt-2 block text-xs text-slate-400">
                    {new Date(notification.created_at).toLocaleString("ar-EG")}
                  </span>
                </span>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
