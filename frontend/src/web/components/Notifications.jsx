import React, { useEffect, useMemo, useRef, useState } from "react";
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

const fallbackNotifications = [
  {
    id: 1,
    type: "comment",
    title: "تعليق جديد على منشورك",
    body: "أضاف أحمد تعليقًا على نقاشك الأخير.",
    time: "منذ 5 دقائق",
    href: "/home",
    read: false,
  },
  {
    id: 2,
    type: "like",
    title: "تفاعل جديد",
    body: "أعجب سارة بمنشورك في المجتمع.",
    time: "منذ 22 دقيقة",
    href: "/home",
    read: false,
  },
  {
    id: 3,
    type: "community",
    title: "طلب انضمام",
    body: "هناك عضو جديد يريد الانضمام إلى مجتمعك.",
    time: "اليوم",
    href: "/home/communities",
    read: true,
  },
];

const notificationIcons = {
  comment: FiMessageSquare,
  like: FiHeart,
  community: FiUserPlus,
};

export default function Notifications({ notifications = fallbackNotifications }) {
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState(notifications);
  const menuRef = useRef(null);

  useEffect(() => {
    setItems(notifications);
  }, [notifications]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!menuRef.current || menuRef.current.contains(event.target)) return;
      setOpen(false);
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const unreadCount = useMemo(
    () => items.filter((notification) => !notification.read).length,
    [items],
  );

  const markAllAsRead = () => {
    setItems((currentItems) =>
      currentItems.map((notification) => ({ ...notification, read: true })),
    );
  };

  const markAsRead = (id) => {
    setItems((currentItems) =>
      currentItems.map((notification) =>
        notification.id === id ? { ...notification, read: true } : notification,
      ),
    );
    setOpen(false);
  };

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
              <p className="mt-1 text-xs text-slate-500">
                {unreadCount > 0
                  ? `${unreadCount} إشعارات غير مقروءة`
                  : "كل الإشعارات مقروءة"}
              </p>
            </div>

            <div className="flex items-center gap-2">
              {unreadCount > 0 && (
                <button
                  type="button"
                  onClick={markAllAsRead}
                  className="rounded-full p-2 text-slate-500 hover:bg-violet-50 hover:text-violet-700 transition"
                  aria-label="تحديد الكل كمقروء"
                >
                  <FiCheck size={17} />
                </button>
              )}

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

          {items.length > 0 ? (
            <div className="max-h-[420px] overflow-y-auto py-2">
              {items.map((notification) => {
                const Icon = notificationIcons[notification.type] || FiBell;

                return (
                  <Link
                    key={notification.id}
                    to={notification.href || "/home"}
                    onClick={() => markAsRead(notification.id)}
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
                        <span className="text-sm font-semibold text-slate-900">
                          {notification.title}
                        </span>
                        {!notification.read && (
                          <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-violet-600" />
                        )}
                      </span>
                      <span className="mt-1 block text-sm leading-6 text-slate-600">
                        {notification.body}
                      </span>
                      <span className="mt-2 block text-xs text-slate-400">
                        {notification.time}
                      </span>
                    </span>
                  </Link>
                );
              })}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center px-6 py-10 text-center">
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-slate-500">
                <FiInbox size={22} />
              </span>
              <h3 className="mt-3 text-sm font-semibold text-slate-900">
                لا توجد إشعارات
              </h3>
              <p className="mt-1 text-sm text-slate-500">
                ستظهر هنا التحديثات المهمة عند وصولها.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
